const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

const USERNAME = "2alifashabuljannat";
const PASS = "xRUS7o24l1ch3It6";
const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASS}@cluster0.b0adi82.mongodb.net/`;
const MONGODB_URI_DRIVER =
  "mongodb+srv://2alifashabuljannat:xRUS7o24l1ch3It6@cluster0.b0adi82.mongodb.net/todo?retryWrites=true&w=majority";

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Post {
            userId:ID
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
            userId:ID!
            id: ID!
            title: String!
            completed: Boolean
        }

     

        type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            getPosts: [Post]
            getUser(id: ID): User
        }

    `,
    resolvers: {
      User: {
        post: (post) => async () =>
          (
            await axios.get(
              `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
            )
          ).data,
      },

      Query: {
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
    },
  });

  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  mongoose
    .connect(MONGODB_URI_DRIVER)
    .then(() => {
      console.log("mongodb connect");
    })
    .catch((error) => console.log(error));

  const todoSchema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  const todoModal = mongoose.model("Todo", todoSchema);

  app.get("/", async (req, res) => {
    const data = await todoModal.find({});
    res.json({ success: true, data: data });
  });
  
  app.post("/create", async (req, res) => {
    const data = await new todoModal(req.body).save();
    res.json({ success: "Your Todo Saved Successfully...", create: data });
  });         

  app.put("/update", async (req, res) => {
    const { id, ...updateData } = req.body;
    const data = await todoModal.updateOne({ _id: req.body.id }, updateData);
    res.json({ success: "Your Todo Updated Successfully...", update: data });
  });

  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await todoModal.deleteOne({ _id: id });
    res.json({ success: "Your Todo Deleted Successfully...",delete: data });
  });

  app.listen(8000, () => console.log("Server Started at PORT 8000"));
}

startServer();
