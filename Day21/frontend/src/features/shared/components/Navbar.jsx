import React from 'react'
import "../Navbar.scss"
import { useNavigate } from "react-router";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <nav className='nav-bar'>
        <p>Insta</p>
        <button onClick={()=>{navigate('/create-post')}} className='primary-button button'>New Post</button>
    </nav>
  )
}

export default Navbar
