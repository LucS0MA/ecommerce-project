import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./pages/Admin";

import { BasketProvider } from "./contexts/BasketContext";

import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Catalogue from "./pages/Catalogue";
import Page404 from "./pages/404";
import About from "./pages/About";
import Panier from "./pages/Panier";
import "./App.css";

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
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/catalogue",
    element: <Catalogue />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/panier",
    element: (
      <BasketProvider>
        <Panier />
      </BasketProvider>
    ),
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
