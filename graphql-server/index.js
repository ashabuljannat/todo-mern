import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import mongoose from "mongoose";
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

import typeDefs from "./schemas/typeDefs.js";
import resolvers from "./resolvers/resolvers.js";
import todoModel from "./models/models.js";


const USERNAME = "2alifashabuljannat";
const PASS = "xRUS7o24l1ch3It6";
const MONGODB_URI = `mongodb+srv://${USERNAME}:${PASS}@cluster0.b0adi82.mongodb.net/`;
const MONGODB_URI_DRIVER =
  "mongodb+srv://2alifashabuljannat:xRUS7o24l1ch3It6@cluster0.b0adi82.mongodb.net/todo?retryWrites=true&w=majority";

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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

  app.get("/", async (req, res) => {
    const data = await todoModel.find({});
    res.json({ success: true, data: data });
  });

  app.post("/create", async (req, res) => {
    const data = await new todoModel(req.body).save();
    res.json({ success: "Your Todo Saved Successfully...", create: data });
  });

  app.put("/update", async (req, res) => {
    const { id, ...updateData } = req.body;
    const data = await todoModel.updateOne({ _id: req.body.id }, updateData);
    res.json({ success: "Your Todo Updated Successfully...", update: data });
  });

  app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const data = await todoModel.deleteOne({ _id: id });
    res.json({ success: "Your Todo Deleted Successfully...", delete: data });
  });

  app.listen(8000, () => console.log("Server Started at PORT 8000"));
}

startServer();
