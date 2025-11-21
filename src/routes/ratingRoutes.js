const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { ratingValidators } = require('../utils/validators');
const { validate } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');

/**
 * @swagger
 * /api/ratings:
 *   get:
 *     summary: Listar avaliações
 *     tags: [Ratings]
 *     parameters:
 *       - in: query
 *         name: recipeId
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
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
 *         description: Lista de avaliações
 */
router.get('/', ratingController.findAll);

/**
 * @swagger
 * /api/ratings/{id}:
 *   get:
 *     summary: Buscar avaliação por ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *       404:
 *         description: Avaliação não encontrada
 */
router.get('/:id', ratingController.findById);

/**
 * @swagger
 * /api/ratings:
 *   post:
 *     summary: Criar nova avaliação
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipeId
 *               - score
 *             properties:
 *               recipeId:
 *                 type: string
 *                 format: uuid
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Receita deliciosa!
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Receita não encontrada
 */
router.post('/', authenticate, ratingValidators.create, validate, ratingController.create);

/**
 * @swagger
 * /api/ratings/{id}:
 *   put:
 *     summary: Atualizar avaliação
 *     tags: [Ratings]
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
 *               score:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Avaliação não encontrada
 */
router.put('/:id', authenticate, ratingValidators.update, validate, ratingController.update);

/**
 * @swagger
 * /api/ratings/{id}:
 *   delete:
 *     summary: Deletar avaliação
 *     tags: [Ratings]
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
 *         description: Avaliação deletada com sucesso
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete('/:id', authenticate, ratingController.delete);

module.exports = router;

