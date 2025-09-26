import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link} from "react-router-dom"
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import PublicRoute from '@/components/PublicRoutes'
function App() {
  

  return (
    <div >
     <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={ <PublicRoute>  <Login />  </PublicRoute>} />
         <Route path="/signup" element={<PublicRoute>  <SignUp /> </PublicRoute>     } />
      </Routes>
    </div>
  )
}

export default App
