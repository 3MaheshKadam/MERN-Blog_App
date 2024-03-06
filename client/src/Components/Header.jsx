import React from 'react';
import {Button, Navbar ,TextInput} from 'flowbite-react';
import { Link ,useLocation } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';


const Header = () => {

  const path =useLocation().pathname;

  return (
    <Navbar className='border-b-2'>
    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
    <span className='px-2 py-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-300 rounded-lg text-white'>Kadam's </span>Blog
      </Link>
      <form>
        <TextInput type='text' placeholder='search...'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'>
        </TextInput>
      </form>
      <Button className='w-12 h10 lg:hidden' color='gray' pill><AiOutlineSearch/></Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h10  sm:inline'pill color='gray'>
          <FaMoon/>
        </Button>
        <Link to='/sign-in'>
          <Button gradientDuoTone='redToOrange' >Sign IN</Button>
        </Link>
        <Navbar.Toggle/>
      </div>
        <Navbar.Collapse>
          <Navbar.Link active={path ==="/"} as={"div"}>
         
            <Link to='/'>Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path ==="/about"}as={"div"}> 
            <Link to='/about'>About</Link>
          </Navbar.Link>
          <Navbar.Link active={path ==="/projects"}as={"div"}>
            <Link to='/projects'>Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header