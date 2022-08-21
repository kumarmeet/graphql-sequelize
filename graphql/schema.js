const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  type Post{
    id: ID!
    title: String!
    content: String!
    image_url: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }

  type User{
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String
    status: Boolean
    posts: [Post!]
  }

  input UserData{
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  input PostData{
    title: String!
    content: String!
    image_url: String!
    creator: ID!
  }
  
  type RootMutation{
    createUser(userInput: UserData!): User
    createPost(postInput: PostData!): Post
  }

  type Login{
    id: ID!
    email: String!
    token: String!
  }

  type RootQuery{
    login(email: String!, password: String!): Login
  }

  schema{
    mutation: RootMutation
    query: RootQuery
  }
`);
