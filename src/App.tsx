import "./App.css";
// import { useQuery, gql } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestApi from "./pages/RestApi";
import GraphqlClient from "./pages/GraphqlClient";

// const GET_MONGO_ALL_TODO = gql`
//   query getMongoAllTodo {
//     getMongoAllTodo {
//       _id
//       title
//       description
//       createdAt
//       updatedAt
//     }
//   }
// `;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RestApi />,
  },
  {
    path: "/restapi",
    element: <RestApi />,
  },
  {
    path: "graphql",
    element: <GraphqlClient />,
  },
]);
function App() {
  // const { loading, error, data } = useQuery(GET_MONGO_ALL_TODO);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error : {error.message}</p>;

  // console.log("app", data.getMongoAllTodo);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
