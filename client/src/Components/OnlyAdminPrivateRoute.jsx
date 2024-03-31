import {  useSelector } from "react-redux";
import {Outlet , Navigate} from 'react-router-dom';

 
import React from 'react'

const OnlyAdminPrivateRoute = () => {
    const {currentUser } = useSelector((state)=> state.user);
    return currentUser && currentUser.isAdmin
     ? (<Outlet/> ):(<Navigate to='signin'/>);
   }


export default OnlyAdminPrivateRoute