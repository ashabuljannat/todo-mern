import axios from "axios";
import todoModel from "../models/models.js";
import { GraphQLError } from "graphql";

const resolvers = {
  User: {
    post: (post) => async () =>
      (
        await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
        )
      ).data,
  },

  Query: {
    // getMAllTodo: async () => (await axios.get(todoModel.find())).data,
    // getMongoAllTodo: async () => {
    //   try {
    //     const users = await todoModel.find();
    //     return users;
    //   } catch (error) {
    //     throw new GraphQLError(error.message);
    //   }
    // },

    // createTodo: async (_, { recipeInput: { title, description } }) => {
    //   const createTodo = await new todoModel({
    //     title,
    //     description,
    //   }).save();
    //   return createTodo;
    // },

    getTodos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts")).data,

    getAllUsers: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data
        .address,

    getUser: async (_, { id }) =>
      (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
        .data,

    getPosts: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/posts")).data,
  },
};

export default resolvers;
