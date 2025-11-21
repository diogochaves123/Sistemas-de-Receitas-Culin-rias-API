const ratingService = require('../services/ratingService');

class RatingController {
  async create(req, res, next) {
    try {
      const rating = await ratingService.create(req.body, req.userId);
      res.status(201).json({
        message: 'Avaliação criada com sucesso',
        rating
      });
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

  async findAll(req, res, next) {
    try {
      const result = await ratingService.findAll(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const rating = await ratingService.findById(req.params.id);
      res.json(rating);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
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
      const rating = await ratingService.update(req.params.id, req.body, req.userId);
      res.json({
        message: 'Avaliação atualizada com sucesso',
        rating
      });
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
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
      const result = await ratingService.delete(req.params.id, req.userId);
      res.json(result);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
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

module.exports = new RatingController();

