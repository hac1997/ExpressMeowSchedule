const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Schedule = require('./Schedule');
const Tag = require('./Tag');

class Event extends Model {
  // O validateDates do @PrePersist/@PreUpdate
  static associate(models) {
    this.belongsTo(models.Schedule, { foreignKey: 'scheduleId', as: 'schedule' });
    this.belongsToMany(models.Tag, { through: 'event_tag', foreignKey: 'eventId', as: 'tags' });
  }

  static addValidation() {
    this.addHook('beforeSave', (event, options) => {
      if (event.startTime && event.endTime && new Date(event.endTime) < new Date(event.startTime)) {
        throw new Error('endTime must be after startTime');
      }
    });
  }
}

Event.init({
  eventId: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  startTime: {
    type: DataTypes.DATE,
  },
  endTime: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: false,
});

Event.addValidation();

module.exports = Event;