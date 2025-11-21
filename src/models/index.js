const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
if (dbConfig.url) {
  sequelize = new Sequelize(dbConfig.url, {
    ...dbConfig,
    dialect: 'postgres'
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

const db = {};

// Importar models
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Recipe = require('./Recipe')(sequelize, Sequelize.DataTypes);
db.Ingredient = require('./Ingredient')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);
db.Rating = require('./Rating')(sequelize, Sequelize.DataTypes);

// Definir relacionamentos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

