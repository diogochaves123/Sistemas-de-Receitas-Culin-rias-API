const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;
    
    // Verificar se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Criar usuário
    const user = await User.create({ name, email, password });
    
    // Remover senha do retorno
    const userJson = user.toJSON();
    delete userJson.password;

    return userJson;
  }

  async login(email, password) {
    // Buscar usuário
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar senha
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Remover senha do retorno
    const userJson = user.toJSON();
    delete userJson.password;

    return {
      user: userJson,
      token
    };
  }
}

module.exports = new AuthService();

