import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Root from "./routes/root.jsx"
import Home from "./routes/home.jsx"
import Header from "./components/Header.jsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <><Header /> <Root /></>,
    },
    {
        path:"/home",
        element: <Home />,
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
