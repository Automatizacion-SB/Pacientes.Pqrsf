import { BrowserRouter, useRoutes } from "react-router-dom";

import { Home } from "./Home";
import { SendPeticion } from "./SendPeticion";
import { SearchPeticion } from "./SearchPeticion";
import { NotFound } from "./NotFound";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/send-peticion", element: <SendPeticion /> },
    { path: "/search-peticion", element: <SearchPeticion /> },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export { App };
