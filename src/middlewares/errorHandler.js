const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] [${req.id || 'no-id'}] Error:`, err);

  // Erro de validação do Sequelize
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erro de validação',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      })),
      requestId: req.id
    });
  }

  // Erro de chave duplicada
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Registro já existe',
      message: err.errors[0]?.message || 'Conflito de unicidade',
      requestId: req.id
    });
  }

  // Erro de foreign key
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: 'Erro de relacionamento',
      message: 'Referência inválida',
      requestId: req.id
    });
  }

  // Erro não encontrado
  if (err.status === 404 || err.name === 'NotFoundError') {
    return res.status(404).json({
      error: 'Recurso não encontrado',
      message: err.message || 'O recurso solicitado não existe',
      requestId: req.id
    });
  }

  // Erro de autorização
  if (err.status === 403) {
    return res.status(403).json({
      error: 'Acesso negado',
      message: err.message || 'Você não tem permissão para realizar esta ação',
      requestId: req.id
    });
  }

  // Erro padrão
  res.status(err.status || 500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado',
    requestId: req.id
  });
};

module.exports = { errorHandler };

