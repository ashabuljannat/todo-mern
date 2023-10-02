import gql from "graphql-tag";
const typeDefs = gql`
  type Post {
    userId: ID
    id: ID
    title: String
    body: String
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
    post: Post
  }

  type Todo {
    userId: ID!
    id: ID!
    title: String!
    completed: Boolean
  }

  type MongoAllTodo {
    _id: String
    title: String
    description: String
    createdAt: String
    updatedAt: String
  }

  input TodoInput {
    title: String!
    description: String!
  }

  type Query {
    getMongoAllTodo: [MongoAllTodo]
    createTodo(recipeInput: TodoInput): MongoAllTodo

    getTodos: [Todo]
    getAllUsers: [User]
    getPosts: [Post]
    getUser(id: ID): User
  }
`;
export default typeDefs;
