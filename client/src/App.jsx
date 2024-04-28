import React from 'react'
import {BrowserRouter ,Routes , Route } from "react-router-dom"
import About from './pages/About'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Signup from './pages/Signup'
import Projects from './pages/Projects'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost.jsx';
import UpdatePost from './pages/UpdatePost.jsx';
import PostPage from './pages/PostPage.jsx'
import ScrollToTop from './Components/ScrollToTop.jsx'
const App = () => {
  return (
   <BrowserRouter>
   <ScrollToTop/>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>

    <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path='/create-post' element={<CreatePost/>}>
      </Route>  
      <Route path='/update-post/:postId' element={<UpdatePost />} />
    </Route>

    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/projects' element={<Projects/>}/>

    <Route path='/post/:postSlug' element={<PostPage/>}/>



   </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App