import React, { useState } from 'react';
import { TextInput, Label, Button } from 'flowbite-react';
import { Link , useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

const Signup = () => {
  const [formData, setFormData] = useState({});
const navigate =useNavigate();
  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://mern-blog-app-yxwl.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Response data:', data);
        if(res.ok){
          navigate('/signin');
        }
        // Handle successful response data
      } else {
        console.error('Server error:', res.status, res.statusText);
        // Handle error response (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className='text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-300 rounded-lg text-white'>Kadam's </span>Blog
          </Link>
          <p className='text-sm mt-5'>
            You can Sign up with your email and password
          </p>
        </div>
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value="Enter user name"></Label>
              <TextInput 
                type='text' placeholder='User Name' id="username" onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Enter Email-ID"></Label>
              <TextInput 
                type='email' placeholder='Email-Id' id="email" onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Enter Password"></Label>
              <TextInput 
                type='password' placeholder=' Password' id="password" onChange={handleChange}
              />
            </div>
            <Button className='bg-gradient-to-r from-red-500 to-yellow-300' type='submit'>
              Sign-UP
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span className='text-gray-500'>Have an Account ?</span>
            <Link to='/signin' className='text-sm text-blue-500'>Sign IN</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
