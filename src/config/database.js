require('dotenv').config();

module.exports = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // necessário para Neon
    },
  },
};
