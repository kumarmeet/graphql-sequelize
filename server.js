const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const sequelize = require("./database/db");
const User = require("./model/User");
const Post = require("./model/Post");
const auth = require("./middlewares/auth");
const authApollo = require("./middlewares/auth-apollo");

const schema = require("./api/index");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth);

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolver,
  context: async ({ req, res }) => {
    const token = req.headers.authorization || "";
    const isLoggedIn = await authApollo(token);

    return {
      isLoggedIn,
      req,
      res,
    };
  },
  introspection: true,
  csrfPrevention: true,
  cors: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], //this is for graphql playground
});

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

sequelize
  .sync()
  .then(() => {
    server
      .listen(PORT)
      .then(() => {
        console.log("🚀🚀🚀🚀 Server starting on port: " + PORT);
      })
      .catch(() => {
        console.log("Server not running!!");
      });
  })
  .catch(() => {
    console.log("Server not running!!");
  });
