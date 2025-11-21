const categoryService = require('../services/categoryService');

class CategoryController {
  async create(req, res, next) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({
        message: 'Categoria criada com sucesso',
        category
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const categories = await categoryService.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const category = await categoryService.findById(req.params.id);
      res.json(category);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json({
        message: 'Categoria atualizada com sucesso',
        category
      });
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await categoryService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      if (error.message.includes('receitas associadas')) {
        return res.status(400).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }
}

module.exports = new CategoryController();

