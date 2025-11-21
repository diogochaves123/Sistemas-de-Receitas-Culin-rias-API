const recipeService = require('../../services/recipeService');
const { Recipe, User, Category, Ingredient, Rating, sequelize } = require('../../models');

jest.mock('../../models', () => ({
  Recipe: {
    create: jest.fn(),
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn()
  },
  User: {
    findByPk: jest.fn()
  },
  Category: {
    findByPk: jest.fn()
  },
  Ingredient: {
    findByPk: jest.fn(),
    findOrCreate: jest.fn()
  },
  Rating: {
    findOne: jest.fn()
  },
  sequelize: {
    transaction: jest.fn()
  }
}));

describe('RecipeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('findById', () => {
    it('deve retornar receita com média de avaliações', async () => {
      const mockRecipe = {
        id: '123',
        title: 'Bolo de Chocolate',
        toJSON: () => ({
          id: '123',
          title: 'Bolo de Chocolate',
          ratings: [
            { score: 5 },
            { score: 4 },
            { score: 5 }
          ]
        })
      };

      Recipe.findByPk.mockResolvedValue(mockRecipe);

      const result = await recipeService.findById('123');

      expect(result).toHaveProperty('id', '123');
      expect(result).toHaveProperty('averageRating', 4.67);
    });

    it('deve lançar erro se receita não encontrada', async () => {
      Recipe.findByPk.mockResolvedValue(null);

      await expect(recipeService.findById('123')).rejects.toThrow('Receita não encontrada');
    });
  });

  describe('delete', () => {
    it('deve deletar receita se usuário for o dono', async () => {
      const mockRecipe = {
        id: '123',
        userId: 'user123',
        destroy: jest.fn().mockResolvedValue(true)
      };

      Recipe.findByPk.mockResolvedValue(mockRecipe);

      const result = await recipeService.delete('123', 'user123');

      expect(result).toHaveProperty('message', 'Receita deletada com sucesso');
      expect(mockRecipe.destroy).toHaveBeenCalled();
    });

    it('deve lançar erro se usuário não for o dono', async () => {
      const mockRecipe = {
        id: '123',
        userId: 'user123'
      };

      Recipe.findByPk.mockResolvedValue(mockRecipe);

      await expect(recipeService.delete('123', 'otherUser'))
        .rejects.toThrow('Você não tem permissão para deletar esta receita');
    });
  });
});

