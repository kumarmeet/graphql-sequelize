/**
 * https://www.apollographql.com/docs/apollo-server/integrations/middleware
 * you can read from above reference how to use middeware integration with apollo-server-express
 */
const http = require("http");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core");

const sequelize = require("./database/db");
const User = require("./model/User");
const Post = require("./model/Post");
const auth = require("./middlewares/auth");

const schema = require("./api/index");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: schema.typeDefs,
  resolvers: schema.resolver,
  context: async ({ req, res }) => {
    return {
      req,
      res,
    };
  },
  introspection: true,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});

server.start().then(() => {
  server.applyMiddleware({ app, path: "/api", cors: true });
});

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

sequelize
  .sync()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log("🚀🚀🚀🚀 Server starting on: " + PORT);
    });
  })
  .catch(() => {
    console.log("Server not running!!!!");
  });
