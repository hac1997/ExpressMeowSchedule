const sequelize = require('../config/database');
const User = require('./User');
const Schedule = require('./Schedule');
const Event = require('./Event');
const Group = require('./Group');
const Tag = require('./Tag');

const models = {
  User,
  Schedule,
  Event,
  Group,
  Tag
};

// Configura as associações aqui ou em cada arquivo de modelo
// (Já fizemos em cada arquivo, então este arquivo é principalmente para exportação e sincronização)

// Sincroniza os modelos com o banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // 'alter: true' atualiza o schema sem perder dados
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = { ...models, sequelize, syncDatabase };