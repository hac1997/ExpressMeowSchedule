const { Tag } = require('../models');

const TagService = {
  async addTag(name) {
    return Tag.create({ name });
  },

  async editTag(tagId, newName) {
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      throw new Error("Tag not found");
    }
    tag.name = newName;
    return tag.save();
  },

  async deleteTag(tagId) {
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      throw new Error("Tag not found");
    }
    await tag.destroy();
  },
};

module.exports = TagService;