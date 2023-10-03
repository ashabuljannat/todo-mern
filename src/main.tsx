import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetMongoAllTodo {
//         getMongoAllTodo {
//           _id
//           title
//           description
//           createdAt
//           updatedAt
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(11,result.data.getMongoAllTodo));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
