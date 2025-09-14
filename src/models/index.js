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

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = { ...models, sequelize, syncDatabase };