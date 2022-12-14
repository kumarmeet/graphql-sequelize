const User = require("../../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//{req, res} coming form apollo server context as third arg
module.exports = {
  Query: {
    login: async (_, { email, password }, { req, res }) => {
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
  },

  Mutation: {
    _createUser: async (_, { userInput }, { req, res, isLoggedIn }) => {
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
  },
};
