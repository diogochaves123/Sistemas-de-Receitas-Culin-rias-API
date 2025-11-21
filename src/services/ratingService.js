const { Rating, Recipe, User } = require('../models');

class RatingService {
  async create(ratingData, userId) {
    const { recipeId, score, comment } = ratingData;

    // Verificar se a receita existe
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      throw new Error('Receita não encontrada');
    }

    // Verificar se o usuário já avaliou esta receita
    const existingRating = await Rating.findOne({
      where: { userId, recipeId }
    });

    if (existingRating) {
      // Atualizar avaliação existente
      await existingRating.update({ score, comment });
      return await this.findById(existingRating.id);
    }

    // Criar nova avaliação
    const rating = await Rating.create({
      userId,
      recipeId,
      score,
      comment
    });

    return await this.findById(rating.id);
  }

  async findAll(filters = {}) {
    const { recipeId, userId, limit = 10, offset = 0 } = filters;
    
    const where = {};
    if (recipeId) where.recipeId = recipeId;
    if (userId) where.userId = userId;

    return await Rating.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Recipe,
          as: 'recipe',
          attributes: ['id', 'title']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    const rating = await Rating.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Recipe,
          as: 'recipe',
          attributes: ['id', 'title']
        }
      ]
    });

    if (!rating) {
      throw new Error('Avaliação não encontrada');
    }

    return rating;
  }

  async update(id, ratingData, userId) {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      throw new Error('Avaliação não encontrada');
    }

    // Verificar se o usuário é o dono da avaliação
    if (rating.userId !== userId) {
      throw new Error('Você não tem permissão para editar esta avaliação');
    }

    await rating.update(ratingData);
    return await this.findById(id);
  }

  async delete(id, userId) {
    const rating = await Rating.findByPk(id);
    if (!rating) {
      throw new Error('Avaliação não encontrada');
    }

    // Verificar se o usuário é o dono da avaliação
    if (rating.userId !== userId) {
      throw new Error('Você não tem permissão para deletar esta avaliação');
    }

    await rating.destroy();
    return { message: 'Avaliação deletada com sucesso' };
  }
}

module.exports = new RatingService();

