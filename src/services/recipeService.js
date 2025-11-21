const { Recipe, User, Category, Ingredient, Rating, sequelize } = require('../models');
const { Op } = require('sequelize');
const { createCaseInsensitiveSearch } = require('../utils/dbHelpers');

class RecipeService {
  async create(recipeData, userId) {
    const { ingredients, ...recipeFields } = recipeData;
    
    const transaction = await sequelize.transaction();
    
    try {
      // Criar receita
      const recipe = await Recipe.create(
        { ...recipeFields, userId },
        { transaction }
      );

      // Adicionar ingredientes se fornecidos
      if (ingredients && ingredients.length > 0) {
        const ingredientIds = [];
        for (const ing of ingredients) {
          let ingredient;
          if (ing.id) {
            ingredient = await Ingredient.findByPk(ing.id, { transaction });
          } else if (ing.name) {
            [ingredient] = await Ingredient.findOrCreate({
              where: { name: ing.name },
              defaults: { name: ing.name, unit: ing.unit || 'unidade' },
              transaction
            });
          }
          
          if (ingredient) {
            ingredientIds.push({
              id: ingredient.id,
              quantity: ing.quantity || 1
            });
          }
        }

        // Associar ingredientes à receita
        for (const ing of ingredientIds) {
          await recipe.addIngredient(ing.id, {
            through: { quantity: ing.quantity },
            transaction
          });
        }
      }

      await transaction.commit();

      // Buscar receita completa
      return await this.findById(recipe.id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll(filters = {}) {
    const { categoryId, userId, search, limit = 10, offset = 0 } = filters;
    
    const where = {};
    if (categoryId) where.categoryId = categoryId;
    if (userId) where.userId = userId;
    if (search) {
      // Busca case-insensitive compatível com todos os bancos
      const dialect = sequelize.getDialect();
      if (dialect === 'postgres') {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      } else {
        // Para outros bancos, usa like (SQLite é case-insensitive por padrão)
        where[Op.or] = [
          { title: { [Op.like]: `%${search}%` } },
          { description: { [Op.like]: `%${search}%` } }
        ];
      }
    }

    const recipes = await Recipe.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        },
        {
          model: Ingredient,
          as: 'ingredients',
          attributes: ['id', 'name', 'unit'],
          through: { attributes: ['quantity'] }
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'score', 'comment', 'createdAt'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name']
          }]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    // Calcular média de avaliações
    const recipesWithAvgRating = recipes.rows.map(recipe => {
      const recipeJson = recipe.toJSON();
      const ratings = recipeJson.ratings || [];
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
        : 0;
      recipeJson.averageRating = parseFloat(avgRating.toFixed(2));
      return recipeJson;
    });

    return {
      recipes: recipesWithAvgRating,
      total: recipes.count,
      limit: parseInt(limit),
      offset: parseInt(offset)
    };
  }

  async findById(id) {
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name', 'description']
        },
        {
          model: Ingredient,
          as: 'ingredients',
          attributes: ['id', 'name', 'unit'],
          through: { attributes: ['quantity'] }
        },
        {
          model: Rating,
          as: 'ratings',
          attributes: ['id', 'score', 'comment', 'createdAt'],
          include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name']
          }]
        }
      ]
    });

    if (!recipe) {
      throw new Error('Receita não encontrada');
    }

    const recipeJson = recipe.toJSON();
    const ratings = recipeJson.ratings || [];
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length
      : 0;
    recipeJson.averageRating = parseFloat(avgRating.toFixed(2));

    return recipeJson;
  }

  async update(id, recipeData, userId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      throw new Error('Receita não encontrada');
    }

    // Verificar se o usuário é o dono da receita
    if (recipe.userId !== userId) {
      throw new Error('Você não tem permissão para editar esta receita');
    }

    const { ingredients, ...recipeFields } = recipeData;
    const transaction = await sequelize.transaction();

    try {
      // Atualizar receita
      await recipe.update(recipeFields, { transaction });

      // Atualizar ingredientes se fornecidos
      if (ingredients) {
        await recipe.setIngredients([], { transaction });
        
        if (ingredients.length > 0) {
          const ingredientIds = [];
          for (const ing of ingredients) {
            let ingredient;
            if (ing.id) {
              ingredient = await Ingredient.findByPk(ing.id, { transaction });
            } else if (ing.name) {
              [ingredient] = await Ingredient.findOrCreate({
                where: { name: ing.name },
                defaults: { name: ing.name, unit: ing.unit || 'unidade' },
                transaction
              });
            }
            
            if (ingredient) {
              ingredientIds.push({
                id: ingredient.id,
                quantity: ing.quantity || 1
              });
            }
          }

          for (const ing of ingredientIds) {
            await recipe.addIngredient(ing.id, {
              through: { quantity: ing.quantity },
              transaction
            });
          }
        }
      }

      await transaction.commit();
      return await this.findById(id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id, userId) {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      throw new Error('Receita não encontrada');
    }

    // Verificar se o usuário é o dono da receita
    if (recipe.userId !== userId) {
      throw new Error('Você não tem permissão para deletar esta receita');
    }

    await recipe.destroy();
    return { message: 'Receita deletada com sucesso' };
  }
}

module.exports = new RecipeService();

