const { sequelize } = require('../models');

/**
 * Retorna o operador de busca case-insensitive apropriado para o banco de dados
 */
function getCaseInsensitiveOp() {
  const dialect = sequelize.getDialect();
  
  // PostgreSQL suporta iLike nativamente
  if (dialect === 'postgres') {
    return require('sequelize').Op.iLike;
  }
  
  // Para outros bancos, usamos like com função LOWER
  // Mas Sequelize não suporta isso diretamente, então usamos like
  // e fazemos a busca case-insensitive no código ou usamos uma função
  return require('sequelize').Op.like;
}

/**
 * Cria condição de busca case-insensitive compatível com todos os bancos
 */
function createCaseInsensitiveSearch(field, value) {
  const dialect = sequelize.getDialect();
  const { Op } = require('sequelize');
  
  if (dialect === 'postgres') {
    // PostgreSQL: usa iLike
    return { [Op.iLike]: `%${value}%` };
  } else if (dialect === 'mysql' || dialect === 'mariadb') {
    // MySQL: usa like com LOWER (Sequelize faz isso automaticamente em alguns casos)
    // Mas para garantir, vamos usar uma função
    return sequelize.where(
      sequelize.fn('LOWER', sequelize.col(field)),
      'LIKE',
      `%${value.toLowerCase()}%`
    );
  } else {
    // SQLite e outros: usa like (case-insensitive por padrão no SQLite)
    return { [Op.like]: `%${value}%` };
  }
}

module.exports = {
  getCaseInsensitiveOp,
  createCaseInsensitiveSearch
};

