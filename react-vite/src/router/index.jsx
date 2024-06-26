import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import { Landing } from "../components/LandingPage/Landing";
import { Albums } from "../components/Albums/Albums";
import { Podcasts } from "../components/Podcasts/Podcasts";
import { AlbumDetails } from "../components/Albums/Album";
import AlbumCreation from "../components/AlbumForm/AlbumForm";
import AlbumEdit from "../components/AlbumForm/EditAlbum";
import Profile from "../components/Profile/Profile";
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
        path: "/podcasts",
        element: <Podcasts />,
      },
      {
        path: `/albums/:albumId`,
        element: <AlbumDetails />,
      },
      {
        path: "/new",
        element: <AlbumCreation />,
      },
      {
        path: "/albums/:albumId/edit",
        element: <AlbumEdit />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
