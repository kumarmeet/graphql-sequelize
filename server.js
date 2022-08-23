const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server");

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

const server = new ApolloServer({
  schema: schema,
  introspection: true,
  // playground: true,
  csrfPrevention: true,
  // plugins: [],
  // cors: true,
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
