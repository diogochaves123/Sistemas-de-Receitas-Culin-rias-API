const recipeService = require('../services/recipeService');

class RecipeController {
  async create(req, res, next) {
    try {
      const recipe = await recipeService.create(req.body, req.userId);
      res.status(201).json({
        message: 'Receita criada com sucesso',
        recipe
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const result = await recipeService.findAll(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const recipe = await recipeService.findById(req.params.id);
      res.json(recipe);
    } catch (error) {
      if (error.message === 'Receita não encontrada') {
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
      const recipe = await recipeService.update(req.params.id, req.body, req.userId);
      res.json({
        message: 'Receita atualizada com sucesso',
        recipe
      });
    } catch (error) {
      if (error.message === 'Receita não encontrada') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      if (error.message.includes('permissão')) {
        return res.status(403).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await recipeService.delete(req.params.id, req.userId);
      res.json(result);
    } catch (error) {
      if (error.message === 'Receita não encontrada') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      if (error.message.includes('permissão')) {
        return res.status(403).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }
}

module.exports = new RecipeController();

