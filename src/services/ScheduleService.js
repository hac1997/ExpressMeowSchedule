const { Schedule, User } = require('../models');
const UserService = require('./UserService');

const ScheduleService = {
  async verifyOwnerId(ownerId, email, passwd) {
    try {
      const user = await UserService.findUserById(ownerId);
      // Em um ambiente real, use bcrypt para comparar senhas seguras
      return user.email === email && user.passwordHash === passwd;
    } catch (error) {
      return false;
    }
  },

  async addSchedule(ownerId, name) {
    const owner = await UserService.findUserById(ownerId);
    if (!owner) {
      throw new Error("User not found");
    }
    const newSchedule = await Schedule.create({ name, ownerId: owner.userId });
    await newSchedule.addParticipant(owner);
    return newSchedule;
  },

  async editSchedule(scheduleId, name, authRequest) {
    const schedule = await Schedule.findByPk(scheduleId, { include: [{ model: User, as: 'owner' }] });
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    const hasAccess = await this.verifyOwnerId(authRequest.userId, authRequest.email, authRequest.passwd);
    if (!hasAccess || schedule.owner.userId !== authRequest.userId) {
      throw new Error("U DONT HAVE ACCESS TO THIS");
    }
    schedule.name = name;
    return schedule.save();
  },

  async deleteSchedule(scheduleId, authRequest) {
    const schedule = await Schedule.findByPk(scheduleId, { include: [{ model: User, as: 'owner' }] });
    if (!schedule) {
      throw new Error("Schedule not found");
    }
    const hasAccess = await this.verifyOwnerId(authRequest.userId, authRequest.email, authRequest.passwd);
    if (hasAccess && schedule.owner.userId === authRequest.userId) {
      await schedule.destroy();
    } else {
      throw new Error("U DONT HAVE ACCESS TO THIS");
    }
  },
};

module.exports = ScheduleService;