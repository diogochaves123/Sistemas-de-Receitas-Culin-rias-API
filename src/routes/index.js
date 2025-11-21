const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const recipeRoutes = require('./recipeRoutes');
const categoryRoutes = require('./categoryRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const ratingRoutes = require('./ratingRoutes');

router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);
router.use('/categories', categoryRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;

