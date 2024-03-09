
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

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
