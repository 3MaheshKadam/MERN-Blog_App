import jwt from 'jsonwebtoken';
import {errorHandler} from'./error.js';

export const verifyToken =(req,res,next)=>{
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(410,"Unauthorize"));
    }
    jwt.verify(token , process.env.JWT_SECRET,(err, user)=>{
        if(err){
            return next(errorHandler(401,"Unauthourize"));
        }
        req.user =user;
        next();
    });
};
//user.router here if verifytoken is done then 
// the lst  2 line of the page will be executed 
//req.user and after that next() will go to updateUser at user.route