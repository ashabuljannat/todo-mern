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
    // practice in my todo collection in mongodb api///////////////////////////
    getMongoAllTodo: async () => {
      try {
        const users = await todoModel.find();
        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    createTodo: async (_, { todoInput: { title, description } }) => {
      const createTodo = await new todoModel({
        title,
        description,
      }).save();
      return {
        message: "Todo Add Successfully...",
      };
    },

    deleteTodo: async (_, { id }) => {
      const isDeleted = await todoModel.deleteOne({ _id: id });
      return {
        message: "Todo Deleted Successfully...",
      };
    },

    updateTodo: async (_, { id, todoInput: { title, description } }) => {
      const isEdited = await todoModel.updateOne(
        { _id: id },
        { title, description }
      );
      return {
        message: "Todo Updated Successfully...",
      };
    },

    // practice in online api///////////////////////////
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
