const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Tag extends Model {}

Tag.init({
  tagId: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Tag',
  tableName: 'tags',
  timestamps: false,
});

module.exports = Tag;