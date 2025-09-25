import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link} from "react-router-dom"
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
function App() {
  

  return (
    <div ClassName="">
     <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
