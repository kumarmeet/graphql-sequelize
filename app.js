const express = require("express");
const cors = require("cors");
const graphqlHttp = require("express-graphql").graphqlHTTP;
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");

const sequelize = require("./database/db");
const User = require("./model/User");
const Post = require("./model/Post");
const auth = require("./middlewares/auth");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(auth);

Post.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Post);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
    pretty: true,
  })
);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("🚀🚀🚀🚀 Server starting on port: " + PORT);
    });
  })
  .catch(() => {
    console.log("Error on server!");
  });
