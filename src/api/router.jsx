import App from "../App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Question1 from "../components/Question1.jsx";
import Question2 from "../components/Question2.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <App />,
  },
  {
    path: "/question1",
    element: <Question1 />,
    errorElement: <App />,
  },
  {
    path: "/question2",
    element: <Question2 />,
    errorElement: <App />,
  },
]);
