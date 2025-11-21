module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unidade',
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'ingredients',
    timestamps: true
  });

  Ingredient.associate = (models) => {
    Ingredient.belongsToMany(models.Recipe, {
      through: 'RecipeIngredients',
      foreignKey: 'ingredientId',
      otherKey: 'recipeId',
      as: 'recipes'
    });
  };

  return Ingredient;
};

