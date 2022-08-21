const User = require("../model/User");
const Post = require("../model/Post");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async ({ userInput }, req) => {
    const { email, password } = userInput;

    const isUserExists = await User.findOne({ where: { email: email } });

    if (isUserExists) {
      throw new Error("User already exists!");
    }

    const user = await User.create({
      ...userInput,
      password: await bcrypt.hash(password, 12),
      status: true,
    });

    return user.dataValues;
  },

  createPost: async ({ postInput }, req) => {
    const post = await Post.create({
      ...postInput,
      userId: postInput.creator,
    });

    const user = await User.findOne({ where: { id: post.dataValues.id } });

    return { ...post.dataValues, creator: { ...user.dataValues } };
  },
};
