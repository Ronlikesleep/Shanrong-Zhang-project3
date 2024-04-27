import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './homepage.jsx'
import Login from './LoginPage.jsx'
import Register from './RegisterPage.jsx'
import Management from './PasswordManager.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/management",
    element: <Management />
  },

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)