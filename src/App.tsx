import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RestApi from "./pages/RestApi";
import GraphqlClient from "./pages/GraphqlClient";

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
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
