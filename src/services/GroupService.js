const { Group, User } = require('../models');
const UserService = require('./UserService');

const GroupService = {
  async addGroup(ownerId, name) {
    const owner = await UserService.findUserById(ownerId);
    if (!owner) {
      throw new Error("User not found");
    }
    const newGroup = await Group.create({ groupName: name });
    await newGroup.addMember(owner);
    return newGroup;
  },

  async editGroup(groupId, name) {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    group.groupName = name;
    return group.save();
  },

  async deleteGroup(groupId) {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error("Group not found");
    }
    await group.destroy();
  },

  async addMember(groupId, userId) {
    const group = await Group.findByPk(groupId);
    const user = await UserService.findUserById(userId);
    if (!group || !user) {
      throw new Error("Group or User not found");
    }
    await group.addMember(user);
    return group.reload({ include: [User] });
  },

  async removeMember(groupId, userId) {
    const group = await Group.findByPk(groupId);
    const user = await UserService.findUserById(userId);
    if (!group || !user) {
      throw new Error("Group or User not found");
    }
    await group.removeMember(user);
    return group.reload({ include: [User] });
  },
};

module.exports = GroupService;