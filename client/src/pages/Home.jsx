import React, { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import mlImage from '../assets/ml.png'; // Import the image
import { Link } from 'react-router-dom';
import PostCard from '../Components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-[1200px] md:h-[70vh] mx-auto py-8'>
        <div className='col-span-1 my-auto mx-auto w-[200px] h-auto lg:w-[300px]'>
          <img src={mlImage} alt="hero image" />
        </div>
        <div className='col-span-2 px-5 my-auto'>
          <h1 className="text-4xl sm:text-5xl lg:text-8xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600 inline-block">I'm a</span> <br />
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                1000,
                "Backend Developer",
                1000,
                "Aspiring cloud engineer"
              ]}
              wrapper='span'
              speed={200}
              repeat={Infinity}
            />
          </h1>
          <p className='sm:text-lg my-6 lg:text-xl'>
            My Name is Mahesh Kadam. I have 0-1 years of experience in web development.
          </p>
          <div className="links flex">
            <div className='my-8 '>
              <a href="/" className="px-6 py-3 w-full rounded-xl mr-4 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                CV
              </a>
            </div>
            <div className='my-8'>
              <a href="/" className="px-6 py-3 w-full rounded-xl mr-4 bg-gradient-to-br from-orange-500 to-pink-500 text-white hover:border-none">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
          <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
          <p className='text-gray-200 text-xs sm:text-sm'>
          Discover an array of articles and tutorials covering diverse topics like web development, software engineering, and programming languages right here.
          </p>
          <Link
            to='/search'
            className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
          >
            View all posts
          </Link>
        </div>
       
        <div className='max-w-6xl ml-auto mx-auto p-3 flex flex-col gap-8 py-7'>
          {posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap gap-4'>
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={'/search'}
                className='text-lg text-teal-500 hover:underline text-center'
              >
                View all posts
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;