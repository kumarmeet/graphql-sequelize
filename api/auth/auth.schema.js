const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    image_url: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String
    status: Boolean
    posts: [Post!]
  }

  input UserData {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  type Login {
    id: ID!
    email: String!
    token: String!
  }

  type Query {
    login(email: String!, password: String!): Login
  }

  type Mutation {
    _createUser(userInput: UserData!): User
  }
`;

module.exports = typeDefs;
