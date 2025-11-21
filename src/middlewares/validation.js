const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      errors: errors.array(),
      requestId: req.id
    });
  }
  
  next();
};

module.exports = { validate };

