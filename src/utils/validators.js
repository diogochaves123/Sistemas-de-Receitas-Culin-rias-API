const { body } = require('express-validator');

const userValidators = {
  register: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Senha deve ter no mínimo 6 caracteres')
  ],
  login: [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Email inválido'),
    body('password')
      .notEmpty()
      .withMessage('Senha é obrigatória')
  ]
};

const recipeValidators = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Título deve ter entre 3 e 200 caracteres'),
    body('description')
      .optional()
      .trim(),
    body('instructions')
      .trim()
      .notEmpty()
      .withMessage('Instruções são obrigatórias'),
    body('prepTime')
      .isInt({ min: 0 })
      .withMessage('Tempo de preparo deve ser um número positivo'),
    body('cookTime')
      .isInt({ min: 0 })
      .withMessage('Tempo de cozimento deve ser um número positivo'),
    body('servings')
      .isInt({ min: 1 })
      .withMessage('Porções deve ser um número maior que zero'),
    body('difficulty')
      .optional()
      .isIn(['Fácil', 'Médio', 'Difícil'])
      .withMessage('Dificuldade deve ser: Fácil, Médio ou Difícil'),
    body('categoryId')
      .isUUID()
      .withMessage('ID da categoria inválido'),
    body('ingredients')
      .optional()
      .isArray()
      .withMessage('Ingredientes deve ser um array')
  ],
  update: [
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Título deve ter entre 3 e 200 caracteres'),
    body('instructions')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Instruções não podem estar vazias'),
    body('prepTime')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Tempo de preparo deve ser um número positivo'),
    body('cookTime')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Tempo de cozimento deve ser um número positivo'),
    body('servings')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Porções deve ser um número maior que zero'),
    body('difficulty')
      .optional()
      .isIn(['Fácil', 'Médio', 'Difícil'])
      .withMessage('Dificuldade deve ser: Fácil, Médio ou Difícil'),
    body('categoryId')
      .optional()
      .isUUID()
      .withMessage('ID da categoria inválido')
  ]
};

const categoryValidators = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Nome deve ter entre 2 e 50 caracteres'),
    body('description')
      .optional()
      .trim()
  ],
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Nome deve ter entre 2 e 50 caracteres'),
    body('description')
      .optional()
      .trim()
  ]
};

const ingredientValidators = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('unit')
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Unidade deve ter entre 1 e 20 caracteres')
  ],
  update: [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('unit')
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Unidade deve ter entre 1 e 20 caracteres')
  ]
};

const ratingValidators = {
  create: [
    body('recipeId')
      .isUUID()
      .withMessage('ID da receita inválido'),
    body('score')
      .isInt({ min: 1, max: 5 })
      .withMessage('Nota deve ser um número entre 1 e 5'),
    body('comment')
      .optional()
      .trim()
  ],
  update: [
    body('score')
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage('Nota deve ser um número entre 1 e 5'),
    body('comment')
      .optional()
      .trim()
  ]
};

module.exports = {
  userValidators,
  recipeValidators,
  categoryValidators,
  ingredientValidators,
  ratingValidators
};

