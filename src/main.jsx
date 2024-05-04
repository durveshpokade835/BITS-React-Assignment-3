import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import DashBoard from './components/DashBoard.jsx'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <NavBar />
        <Login />
      </>
    ),
  },
  {
    path: "/dashboard",
    loader: () => {
      let item = localStorage.getItem("isAuthenticated");
      console.log("item", item);
      if (item !== "authenticated") {
        return redirect("/");
      }
      return null;
    },
    element: (
      <>
        <NavBar />
        <DashBoard />
      </>
    ),
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
