import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Adduser from './Adduser/Adduser.jsx';
import Address from './Adduser/Form/Address.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <h1 className='text-center bg-lime-500 h-[500px]'>view all user</h1>
      },
      {
        path: "/adduser",
        element:<Adduser></Adduser>
      },
      {
        path: "/demo",
        element:<Address></Address>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='container mx-auto px-8'>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
)
