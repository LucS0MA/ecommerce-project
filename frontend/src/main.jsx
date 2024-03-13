import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Catalogue from "./pages/Catalogue";
import Page404 from "./pages/404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
  {
    path: "/catalogue",
    element: <Catalogue />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
