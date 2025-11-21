const request = require('supertest');
const app = require('../../server');
const { sequelize } = require('../../models');

describe('Category Integration Tests', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('POST /api/categories', () => {
    it('deve criar uma categoria com sucesso', async () => {
      const response = await request(app)
        .post('/api/categories')
        .send({
          name: 'Sobremesas',
          description: 'Receitas doces'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('category');
      expect(response.body.category).toHaveProperty('name', 'Sobremesas');
    });

    it('deve retornar erro 400 com dados inválidos', async () => {
      const response = await request(app)
        .post('/api/categories')
        .send({
          name: 'A' // Muito curto
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/categories', () => {
    it('deve listar todas as categorias', async () => {
      const response = await request(app)
        .get('/api/categories');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/categories/:id', () => {
    it('deve retornar categoria por ID', async () => {
      // Criar categoria primeiro
      const createResponse = await request(app)
        .post('/api/categories')
        .send({
          name: 'Test Category',
          description: 'Test'
        });

      const categoryId = createResponse.body.category.id;

      const response = await request(app)
        .get(`/api/categories/${categoryId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', categoryId);
    });

    it('deve retornar erro 404 para categoria inexistente', async () => {
      const fakeId = '550e8400-e29b-41d4-a716-446655440999';
      const response = await request(app)
        .get(`/api/categories/${fakeId}`);

      expect(response.status).toBe(404);
    });
  });
});

