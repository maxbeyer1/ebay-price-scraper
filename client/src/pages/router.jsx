import { createBrowserRouter } from "react-router-dom";

import Home from "./Home";
import Results from "./Results";

const pagesData = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/results",
    element: <Results />,
  }
];

const router = createBrowserRouter(pagesData)

export default router;