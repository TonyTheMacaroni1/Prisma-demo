import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { NewCat, EditCat } from './components/'
import './index.css'


import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new",
    element: <NewCat />,
  },
  {
    path: "/edit/:id",
    element: <EditCat />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
