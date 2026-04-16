import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/routers.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './context/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
      <RouterProvider router={router}>

      </RouterProvider>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        closeOnClick
      />
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
