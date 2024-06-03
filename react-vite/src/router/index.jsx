import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { Landing } from "../components/LandingPage/Landing";
import { Albums } from "../components/Albums/Albums";
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/albums",
        element: <Albums />,
      },
      {
        path: `/:albumId`,
        element: <h1>Hello I am still working on this component</h1>,
      },
    ],
  },
]);
