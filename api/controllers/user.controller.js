import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async(req,res,next)=>{
  // console.log(req.user);//id comming from cookie
//verificaion of token at user must be only for an authenticated user hence 
//we'll just put the verification process under the utils FOLDER AND THERER IF USER IS AUTHENTICATED THEN ONLY REDIRECT TO UPDATE THE USER FUNCTIONALITY
if(req.user.id != req.params.userId){
  return next(errorHandler(403,"you are not allowed to update the user"));
}
if(req.body.password){
  if(req.body.password.length <6){
    return next(errorHandler(400,"pass must be atleast 6 chars"));
  }
  req.body.password = bcryptjs.hashSync(req.body.password,10);
}
if(req.body.username){
  if(req.body.username.length <3 || req.body.username.length>20){
    return next(errorHandler(400,"username must be in beteween 3 and 20"));
  }
  if(req.body.username.includes(' ')){
    return next(errorHandler(400,"user  namae cant contan blank spaces"));
  }
  if(req.body.username !== req.body.username.toLowerCase())
  {
    return next(errorHandler(400,"user  namae cant contan blank spaces"));
  }
}
try {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
    }, 
  },
  { new: true }
);
const { password, ...rest } = updatedUser._doc;
res.status(200).json(rest);
} catch (error) {
next(error);
}
};

export const deleteUser = async (req,res ,next)=>{
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403 ,"you are not allowed  to delete this user"));
  }
  try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('user is deleted');
  }
  catch(error){
    next(error);
  }
};

export const signout = (req,res,next)=>{
  try{
    res
    .clearCookie('access_token')
    .status(200)
    .json('User has been sign-out ');
  }
  catch(error){
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};