const ingredientService = require('../services/ingredientService');

class IngredientController {
  async create(req, res, next) {
    try {
      const ingredient = await ingredientService.create(req.body);
      res.status(201).json({
        message: 'Ingrediente criado com sucesso',
        ingredient
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req, res, next) {
    try {
      const result = await ingredientService.findAll(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const ingredient = await ingredientService.findById(req.params.id);
      res.json(ingredient);
    } catch (error) {
      if (error.message === 'Ingrediente não encontrado') {
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
      const ingredient = await ingredientService.update(req.params.id, req.body);
      res.json({
        message: 'Ingrediente atualizado com sucesso',
        ingredient
      });
    } catch (error) {
      if (error.message === 'Ingrediente não encontrado') {
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
      const result = await ingredientService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      if (error.message === 'Ingrediente não encontrado') {
        return res.status(404).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }
}

module.exports = new IngredientController();

