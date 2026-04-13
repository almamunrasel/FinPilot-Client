import { createBrowserRouter } from "react-router";
import homelayout from "../layout/homelayout";
import home from "../pages/home";

import { Component } from "react";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import PrivateRoute from "../context/PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile";

import DashBoard from "../pages/DashBoard";
import AddTransaction from "../pages/AddTransaction";
import TransactionDetails from "../pages/TransactionDetails";


const router= createBrowserRouter([
  {
    path:'/',
    Component:homelayout,
    children:[
      {
        path:"/",
        Component:home


      },
      {
        path:'/transaction',
        element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>
        
      },
      {
        path:'/add-transaction',
        element:<PrivateRoute><AddTransaction></AddTransaction></PrivateRoute>
        
      },
      {
        path:'/transactionDetails/:id',
        element: <PrivateRoute><TransactionDetails></TransactionDetails></PrivateRoute>
      }

      
    ]
  },
  {
  path:'/auth',
  Component:AuthLayout,
  children:[
    {
      path:'/auth/login',
      element:<LoginPage></LoginPage>
    },
    {
      path:'/auth/registration',
      element:<RegistrationPage></RegistrationPage>
    },
    {
      path:'/auth/updateProfile',
      element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>
    }
    
  ]

  }
  
  
])

export default router;