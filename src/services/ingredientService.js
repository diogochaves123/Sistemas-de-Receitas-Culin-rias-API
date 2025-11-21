const { Ingredient, sequelize } = require('../models');
const { Op } = require('sequelize');

class IngredientService {
  async create(ingredientData) {
    return await Ingredient.create(ingredientData);
  }

  async findAll(filters = {}) {
    const { search, limit = 50, offset = 0 } = filters;
    
    const where = {};
    if (search) {
      // Busca case-insensitive compatível com todos os bancos
      const dialect = sequelize.getDialect();
      if (dialect === 'postgres') {
        where.name = { [Op.iLike]: `%${search}%` };
      } else {
        // Para outros bancos, usa like (SQLite é case-insensitive por padrão)
        where.name = { [Op.like]: `%${search}%` };
      }
    }

    return await Ingredient.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });
  }

  async findById(id) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingrediente não encontrado');
    }
    return ingredient;
  }

  async update(id, ingredientData) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingrediente não encontrado');
    }

    await ingredient.update(ingredientData);
    return ingredient;
  }

  async delete(id) {
    const ingredient = await Ingredient.findByPk(id);
    if (!ingredient) {
      throw new Error('Ingrediente não encontrado');
    }

    await ingredient.destroy();
    return { message: 'Ingrediente deletado com sucesso' };
  }
}

module.exports = new IngredientService();

