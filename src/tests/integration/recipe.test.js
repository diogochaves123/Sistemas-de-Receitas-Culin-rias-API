const request = require('supertest');
const app = require('../../server');
const { sequelize } = require('../../models');

describe('Recipe Integration Tests', () => {
  let authToken;
  let userId;
  let categoryId;

  beforeAll(async () => {
    // Sincronizar banco de dados de teste
    await sequelize.sync({ force: true });

    // Criar usuário de teste e obter token
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      });

    userId = registerResponse.body.user.id;

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'test123'
      });

    authToken = loginResponse.body.token;

    // Criar categoria de teste
    const categoryResponse = await request(app)
      .post('/api/categories')
      .send({
        name: 'Test Category',
        description: 'Test Description'
      });

    categoryId = categoryResponse.body.category.id;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/recipes', () => {
    it('deve criar uma receita com sucesso', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Recipe',
          description: 'Test Description',
          instructions: 'Test Instructions',
          prepTime: 30,
          cookTime: 45,
          servings: 4,
          difficulty: 'Médio',
          categoryId: categoryId
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('recipe');
      expect(response.body.recipe).toHaveProperty('title', 'Test Recipe');
    });

    it('deve retornar erro 401 sem token', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .send({
          title: 'Test Recipe',
          instructions: 'Test Instructions',
          prepTime: 30,
          cookTime: 45,
          servings: 4,
          categoryId: categoryId
        });

      expect(response.status).toBe(401);
    });

    it('deve retornar erro 400 com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/recipes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'AB', // Muito curto
          instructions: 'Test',
          prepTime: -10, // Inválido
          cookTime: 45,
          servings: 4,
          categoryId: categoryId
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/recipes', () => {
    it('deve listar receitas', async () => {
      const response = await request(app)
        .get('/api/recipes');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('recipes');
      expect(response.body).toHaveProperty('total');
    });
  });
});

