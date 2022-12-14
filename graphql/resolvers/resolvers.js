const User = require("../../model/User");
const Post = require("../../model/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  login: async (_, { email, password }, { req }, info) => {
    console.log(req);
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Check your credentials!!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Check your credentials!!");
    }

    const token = jwt.sign(
      {
        userId: user.dataValues.id.toString(),
        email: user.dataValues.email,
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );

    return {
      id: user.dataValues.id,
      email: user.dataValues.email,
      token: token,
    };
  },

  createPost: async ({ postInput }, req) => {
    if (!req.isAuth) {
      throw new Error("You are not authenticated!");
    }

    const post = await Post.create({
      ...postInput,
      userId: postInput.creator,
    });

    const user = await User.findOne({ where: { id: post.dataValues.id } });

    return { ...post.dataValues, creator: { ...user.dataValues } };
  },
};
