const { Category, Recipe } = require('../models');

class CategoryService {
  async create(categoryData) {
    return await Category.create(categoryData);
  }

  async findAll() {
    return await Category.findAll({
      include: [{
        model: Recipe,
        as: 'recipes',
        attributes: ['id', 'title']
      }],
      order: [['name', 'ASC']]
    });
  }

  async findById(id) {
    const category = await Category.findByPk(id, {
      include: [{
        model: Recipe,
        as: 'recipes',
        attributes: ['id', 'title', 'createdAt']
      }]
    });

    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    return category;
  }

  async update(id, categoryData) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    await category.update(categoryData);
    return category;
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new Error('Categoria não encontrada');
    }

    // Verificar se há receitas associadas
    const recipeCount = await Recipe.count({ where: { categoryId: id } });
    if (recipeCount > 0) {
      throw new Error('Não é possível deletar categoria com receitas associadas');
    }

    await category.destroy();
    return { message: 'Categoria deletada com sucesso' };
  }
}

module.exports = new CategoryService();

