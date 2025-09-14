const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Event = require('./Event');

class Schedule extends Model {}

Schedule.init({
  scheduleId: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Schedule',
  tableName: 'schedules',
  timestamps: false,
});

Schedule.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
Schedule.belongsToMany(User, { through: 'user_schedule', foreignKey: 'scheduleId', as: 'participants' });
Schedule.hasMany(Event, { foreignKey: 'scheduleId', as: 'events' });

module.exports = Schedule;