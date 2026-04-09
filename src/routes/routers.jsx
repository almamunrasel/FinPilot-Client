import { createBrowserRouter } from "react-router";
import homelayout from "../layout/homelayout";
import home from "../pages/home";

import { Component } from "react";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";

const router= createBrowserRouter([
  {
    path:'/',
    Component:homelayout,
    children:[
      {
        path:"/",
        Component:home


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
    }
    
  ]

  }
  
  
])

export default router;