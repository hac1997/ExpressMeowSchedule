const { User } = require('../models');

const UserService = {
  async addUser(name, email, passwordHash) {
    return User.create({ name, email, passwordHash });
  },

  async editUser(userId, name, email, passwordHash) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.name = name;
    user.email = email;
    user.passwordHash = passwordHash;
    return user.save();
  },

  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.destroy();
  },

  async findUserById(userId) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
};

module.exports = UserService;