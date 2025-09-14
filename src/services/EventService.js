const { Event, Schedule, Tag, User } = require('../models');
const UserService = require('./UserService');

const EventService = {
  async addEvent(scheduleId, title, description, startTime, endTime, tagIds) {
    const schedule = await Schedule.findByPk(scheduleId);
    if (!schedule) {
      throw new Error("Schedule not found");
    }

    const tags = await Tag.findAll({ where: { id: tagIds } });

    const newEvent = await Event.create({ 
      title, 
      description, 
      startTime, 
      endTime, 
      scheduleId 
    });

    if (tags && tags.length > 0) {
      await newEvent.setTags(tags);
    }
    
    return newEvent.reload({ include: [Tag] });
  },

  async editEvent(eventId, participantId, newTitle, newDescription, newStartTime, newEndTime, newTagIds) {
    const event = await Event.findByPk(eventId, { include: [{ model: Schedule, include: [{ model: User, as: 'participants' }] }] });
    if (!event) {
      throw new Error("Event not found");
    }
  
    const hasAccess = event.schedule.participants.some(user => user.id === participantId);
    if (!hasAccess) {
      throw new Error("U DONT HAVE ACCESS TO THIS");
    }
  
    const newTags = await Tag.findAll({ where: { id: newTagIds } });
    if (newTags.length !== newTagIds.length) {
      throw new Error("One or more tags not found");
    }
  
    event.title = newTitle;
    event.description = newDescription;
    event.startTime = newStartTime;
    event.endTime = newEndTime;
  
    await event.setTags(newTags);
    await event.save();
    return event.reload({ include: [Tag] });
  },

  async deleteEvent(eventId, authRequest) {
    const event = await Event.findByPk(eventId, { include: [{ model: Schedule, include: [{ model: User, as: 'owner' }] }] });
    if (!event) {
      throw new Error("Event not found");
    }

    const owner = await UserService.findUserById(authRequest.userId);
    if (!owner || owner.email !== authRequest.email || owner.passwordHash !== authRequest.passwd) {
      throw new Error("U DONT HAVE ACCESS TO THIS");
    }
    
    if (event.schedule.owner.userId === authRequest.userId) {
      await event.destroy();
    } else {
      throw new Error("U DONT HAVE ACCESS TO THIS");
    }
  },
};

module.exports = EventService;