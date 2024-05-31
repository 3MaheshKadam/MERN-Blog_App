import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import postRouters from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js';

dotenv.config();

mongoose
  .connect(process.env.url)
  .then(() => {
    console.log(`MongoDb is connected `);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('https://mern-blog-app-yxwl.onrender.com/api/user', userRoutes);
app.use('https://mern-blog-app-yxwl.onrender.com/api/auth', authRoutes);
app.use('https://mern-blog-app-yxwl.onrender.com/api/post',postRouters);
app.use('https://mern-blog-app-yxwl.onrender.com/api/comment', commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
