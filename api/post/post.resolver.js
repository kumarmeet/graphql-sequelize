const User = require("../../model/User");
const Post = require("../../model/Post");
const isAuth = require("../../lib/check-is-auth");

//{req, res} coming form apollo server context as third arg
module.exports = {
  Query: {
    user: async (_, { __ }, { req, res, isLoggedIn }) => {
      isAuth(isLoggedIn);

      const userPosts = await Post.findAll({ where: { userId: isLoggedIn } });
      const user = await User.findOne({ where: { id: isLoggedIn } });

      return { ...user.dataValues, posts: userPosts };
    },
  },

  Mutation: {
    _createPost: async (_, { postInput }, { req, res, isLoggedIn }) => {
      isAuth(isLoggedIn);

      console.log(isLoggedIn);

      const post = await Post.create({
        ...postInput,
        userId: postInput.creator,
      });

      const user = await User.findOne({ where: { id: post.dataValues.id } });

      return { ...post.dataValues, creator: { ...user.dataValues } };
    },
  },
};
