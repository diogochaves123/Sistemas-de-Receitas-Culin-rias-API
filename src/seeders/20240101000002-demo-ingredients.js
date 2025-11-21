'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ingredients', [
      {
        id: '660e8400-e29b-41d4-a716-446655440001',
        name: 'Farinha de Trigo',
        unit: 'xícara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440002',
        name: 'Açúcar',
        unit: 'xícara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440003',
        name: 'Ovos',
        unit: 'unidade',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440004',
        name: 'Leite',
        unit: 'ml',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440005',
        name: 'Manteiga',
        unit: 'colher de sopa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440006',
        name: 'Chocolate em Pó',
        unit: 'xícara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440007',
        name: 'Fermento em Pó',
        unit: 'colher de chá',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440008',
        name: 'Sal',
        unit: 'colher de chá',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440009',
        name: 'Azeite',
        unit: 'colher de sopa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '660e8400-e29b-41d4-a716-446655440010',
        name: 'Alho',
        unit: 'dente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ingredients', null, {});
  }
};

