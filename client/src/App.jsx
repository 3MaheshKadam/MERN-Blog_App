import React from 'react'
import {BrowserRouter ,Routes , Route } from "react-router-dom"
import About from './pages/About'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Header from './Components/Header'
const App = () => {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/projects' element={<Projects/>}/>


   </Routes>
   </BrowserRouter>
  )
}

export default App