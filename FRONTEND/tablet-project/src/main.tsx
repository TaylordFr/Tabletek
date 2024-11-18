import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Kezdolap from "./components/Kezdolap.tsx";
import TabletFelvetel from "./components/Tabletfelvetel.tsx";
import TabletLista from "./components/TabletLista.tsx";
import TabletReszletek from "./components/TabletReszletek.tsx";
import TabletTorles from "./components/TabletTorles.tsx";

const router = createBrowserRouter([
  {
    path: "/kezdolap",
    element: <Kezdolap />,
  },
  {
    path: "/tabletfelvetel",
    element: <TabletFelvetel />,
  },
  {
    path: "/tabletlista",
    element: <TabletLista />,
  },
  {
    path: "/tabletreszletek",
    element: <TabletReszletek />,
  },
  {
    path: "/tablettorles",
    element: <TabletTorles />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
