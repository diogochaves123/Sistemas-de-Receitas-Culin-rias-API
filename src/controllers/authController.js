const authService = require('../services/authService');

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user
      });
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(409).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body.email, req.body.password);
      res.json({
        message: 'Login realizado com sucesso',
        ...result
      });
    } catch (error) {
      if (error.message === 'Credenciais inválidas') {
        return res.status(401).json({
          error: error.message,
          requestId: req.id
        });
      }
      next(error);
    }
  }
}

module.exports = new AuthController();

