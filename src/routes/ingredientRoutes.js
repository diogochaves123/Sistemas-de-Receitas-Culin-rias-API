const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
const { ingredientValidators } = require('../utils/validators');
const { validate } = require('../middlewares/validation');

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Listar ingredientes
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Lista de ingredientes
 */
router.get('/', ingredientController.findAll);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     summary: Buscar ingrediente por ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Ingrediente encontrado
 *       404:
 *         description: Ingrediente não encontrado
 */
router.get('/:id', ingredientController.findById);

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Criar novo ingrediente
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Açúcar
 *               unit:
 *                 type: string
 *                 example: xícara
 *     responses:
 *       201:
 *         description: Ingrediente criado com sucesso
 */
router.post('/', ingredientValidators.create, validate, ingredientController.create);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     summary: Atualizar ingrediente
 *     tags: [Ingredients]
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
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingrediente atualizado com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 */
router.put('/:id', ingredientValidators.update, validate, ingredientController.update);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Deletar ingrediente
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Ingrediente deletado com sucesso
 *       404:
 *         description: Ingrediente não encontrado
 */
router.delete('/:id', ingredientController.delete);

module.exports = router;

