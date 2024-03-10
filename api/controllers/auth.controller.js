
import bcryptjs from 'bcryptjs';
import bcrypt from 'bcrypt';
import User from "../models/user.model.js";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword  // Store the hashed password in the database
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      const key = Object.keys(error.keyPattern)[0];

      if (key === "username") {
        return res.status(400).json({ message: "Username is already taken" });
      } else if (key === "email") {
        return res.status(400).json({ message: "Email is already associated with an account" });
      }
    } else {
      // Handle other errors
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export { signup };
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};