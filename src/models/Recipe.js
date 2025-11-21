module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 200]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    prepTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    cookTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    difficulty: {
      type: DataTypes.ENUM('Fácil', 'Médio', 'Difícil'),
      allowNull: false,
      defaultValue: 'Médio'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'recipes',
    timestamps: true
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    });
    Recipe.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    Recipe.belongsToMany(models.Ingredient, {
      through: 'RecipeIngredients',
      foreignKey: 'recipeId',
      otherKey: 'ingredientId',
      as: 'ingredients'
    });
    Recipe.hasMany(models.Rating, {
      foreignKey: 'recipeId',
      as: 'ratings'
    });
  };

  return Recipe;
};

