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

  input PostData {
    title: String!
    content: String!
    image_url: String!
    creator: ID!
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

  type Query {
    user: User
  }

  type Mutation {
    _createPost(postInput: PostData!): Post
  }
`;

module.exports = typeDefs;
