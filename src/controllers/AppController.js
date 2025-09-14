const ScheduleService = require('../services/ScheduleService');
const UserService = require('../services/UserService');
const GroupService = require('../services/GroupService');
const EventService = require('../services/EventService');
const TagService = require('../services/TagService');

const AppController = {


  //Schedule
  async addSchedule(req, res) {
    try {
      const { ownerId, name } = req.query;
      const newSchedule = await ScheduleService.addSchedule(ownerId, name);
      res.status(200).json(newSchedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async editSchedule(req, res) {
    try {
      const { scheduleId, name } = req.query;
      const authRequest = req.body;
      const updatedSchedule = await ScheduleService.editSchedule(scheduleId, name, authRequest);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },
  
  async deleteSchedule(req, res) {
    try {
      const { scheduleId } = req.query;
      const authRequest = req.body;
      await ScheduleService.deleteSchedule(scheduleId, authRequest);
      res.status(204).end();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },





  //Group
  async addGroup(req, res) {
    try {
      const { ownerId, name } = req.query;
      const newGroup = await GroupService.addGroup(ownerId, name);
      res.status(200).json(newGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async editGroup(req, res) {
    try {
      const { groupId, name } = req.query;
      const updatedGroup = await GroupService.editGroup(groupId, name);
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async deleteGroup(req, res) {
    try {
      const { groupId } = req.query;
      await GroupService.deleteGroup(groupId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async addMember(req, res) {
    try {
      const { groupId, userId } = req.query;
      const updatedGroup = await GroupService.addMember(groupId, userId);
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async removeMember(req, res) {
    try {
      const { groupId, userId } = req.query;
      const updatedGroup = await GroupService.removeMember(groupId, userId);
      res.status(200).json(updatedGroup);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },




  // Tag
  async addTag(req, res) {
    try {
      const { name } = req.query;
      const newTag = await TagService.addTag(name);
      res.status(200).json(newTag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async editTag(req, res) {
    try {
      const { tagId, newName } = req.query;
      const updatedTag = await TagService.editTag(tagId, newName);
      res.status(200).json(updatedTag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async deleteTag(req, res) {
    try {
      const { tagId } = req.query;
      await TagService.deleteTag(tagId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  



  //Event
  async addEvent(req, res) {
    try {
      const { scheduleId, title, description, startTime, endTime, tagIds } = req.query;
      const newEvent = await EventService.addEvent(scheduleId, title, description, startTime, endTime, tagIds);
      res.status(200).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async editEvent(req, res) {
    try {
      const { eventId, participantId, newTitle, newDescription, newStartTime, newEndTime, newTagIds } = req.query;
      const updatedEvent = await EventService.editEvent(eventId, participantId, newTitle, newDescription, newStartTime, newEndTime, newTagIds);
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async deleteEvent(req, res) {
    try {
      const { eventId } = req.query;
      const authRequest = req.body;
      await EventService.deleteEvent(eventId, authRequest);
      res.status(204).end();
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  },
  
  async addUser(req, res) {
    try {
      const { name, email, passwordHash } = req.body;
      const newUser = await UserService.addUser(name, email, passwordHash);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async editUser(req, res) {
    try {
      const { userId } = req.query;
      const { name, email, passwordHash } = req.body;
      const updatedUser = await UserService.editUser(userId, name, email, passwordHash);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async deleteUser(req, res) {
    try {
      const { userId } = req.query;
      await UserService.deleteUser(userId);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  async findUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.findUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }
};

module.exports = AppController;