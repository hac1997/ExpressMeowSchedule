const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Group extends Model {}

Group.init({
  groupId: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  groupName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Group',
  tableName: 'groups',
  timestamps: false,
});

Group.belongsToMany(User, { through: 'group_members', foreignKey: 'groupId', as: 'members' });

module.exports = Group;