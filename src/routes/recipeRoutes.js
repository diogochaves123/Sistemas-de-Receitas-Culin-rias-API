const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { recipeValidators } = require('../utils/validators');
const { validate } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Listar receitas
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Lista de receitas
 */
router.get('/', recipeController.findAll);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Buscar receita por ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Receita encontrada
 *       404:
 *         description: Receita não encontrada
 */
router.get('/:id', recipeController.findById);

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Criar nova receita
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructions
 *               - prepTime
 *               - cookTime
 *               - servings
 *               - categoryId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Bolo de Chocolate
 *               description:
 *                 type: string
 *                 example: Delicioso bolo de chocolate
 *               instructions:
 *                 type: string
 *                 example: Misture todos os ingredientes...
 *               prepTime:
 *                 type: integer
 *                 example: 30
 *               cookTime:
 *                 type: integer
 *                 example: 45
 *               servings:
 *                 type: integer
 *                 example: 8
 *               difficulty:
 *                 type: string
 *                 enum: [Fácil, Médio, Difícil]
 *                 example: Médio
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 *       401:
 *         description: Não autenticado
 */
router.post('/', authenticate, recipeValidators.create, validate, recipeController.create);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Atualizar receita
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               instructions:
 *                 type: string
 *               prepTime:
 *                 type: integer
 *               cookTime:
 *                 type: integer
 *               servings:
 *                 type: integer
 *               difficulty:
 *                 type: string
 *                 enum: [Fácil, Médio, Difícil]
 *               categoryId:
 *                 type: string
 *                 format: uuid
 *               ingredients:
 *                 type: array
 *     responses:
 *       200:
 *         description: Receita atualizada com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Receita não encontrada
 */
router.put('/:id', authenticate, recipeValidators.update, validate, recipeController.update);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Deletar receita
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Receita deletada com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Receita não encontrada
 */
router.delete('/:id', authenticate, recipeController.delete);

module.exports = router;

