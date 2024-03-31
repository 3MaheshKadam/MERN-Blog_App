import React, { useState } from 'react'
import { Alert, Button ,TextInput ,Modal ,ModalBody } from 'flowbite-react'
import { useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {Link} from 'react-router-dom';


const DashProfile = () => {
  const {currentUser ,error ,loading}= useSelector((state)=> state.user);
  const [updateUserSuccess , setUpdateUserSuccess]= useState(null);
  const [updateUserError , setUpdateUserError] = useState(null);
  const [formData , setFormData] =useState({});
  const dispatch =useDispatch();

  const [showModal, setShowModal] = useState(false);

//for updating a user based onn his authentication
  const handleChange =(e)=>{
    setFormData({...formData ,[e.target.id]:e.target.value});
  };

  const handleSubmit =async(e)=>{
    e.preventDefault();

    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if(Object.keys(formData).length ===0){
      setUpdateUserError("No changes madee");
      return;
    }
    try{
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method :'PUT',
        headers:{
          'Content-type': 'application/json',
        },
        body:JSON.stringify(formData),
      });

      const data = await res.json();
      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }
      else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("user profile is updated successfully");
      }
    }
    catch(error){
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
//delete an existing user based on user validation
  const handleDeleteUser =async()=>{
    setShowModal(false);
    try{
      dispatch(  deleteUserStart());
      const res = await fetch (`/api/user/delete/${currentUser._id}`,{
        method :"DELETE",
      });
      const data = await res.json();
      if (!res.ok){
        dispatch(deleteUserFailure(data.message));
      }
      else{
        dispatch(deleteUserSuccess(data));
      }
    }
    catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  };

  //handeking if signout
  const handleSignOut = async()=>{
    try{
      const res = await fetch('/api/user/signout',{
        method :"POST",
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signoutSuccess());
      }
    }
    catch(error){
      console.log(error.message);
    }
  }
  return (
     <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {updateUserSuccess &&(
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img
            src={currentUser.profilePicture}
            alt='user'
            className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
          />
        </div>
        <TextInput
          type='text'
          id='username' 
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput 
        type='password' 
        id='password'
         placeholder='password' 
         onChange={handleChange}
         />
        <Button 
        type='submit'
         gradientDuoTone='pinkToOrange' outline
         disabled={loading}
         >
            {loading ? 'Loading..' : 'Update'}
        </Button>
        
        {currentUser.isAdmin &&(
          <Link to={'/create-post'}>
            <Button type='button'
            gradientDuoTone='pinkToOrange'
            className='w-full'>
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        
        <span className='cursor-pointer'
        onClick={()=> setShowModal(true)}
        >Delete Account</span>
        
        <span className='cursor-pointer'
         onClick={handleSignOut}
         >Sign Out</span>
         
      </div>
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProfile