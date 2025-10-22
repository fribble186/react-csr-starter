import { createBrowserRouter } from "react-router";
import Root from "./App";

export default createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [],
  },
]);
