import React, { useRef } from 'react'
import textoLogo2 from '../../../assets/textoLogo2.png'
import { useNavigate } from 'react-router-dom';
import { apiStore } from '../store/apiStore/apiStore';
const Footer = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const swiper = () =>{
        navigate(path + "/Swipe");
    }
    const prof = () =>{
        navigate(path + "/Profile");
    }

    const chats = () =>{
        navigate(path + "/Chat");
    }

    const games = () =>{
        navigate(path + "/games");
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Para que el desplazamiento sea suave
        });
      };

  return (
    <>
<div className='bg-black h-[400px] tres:hidden md:flex'>
        <div className='flex flex-col'>
        <img src={textoLogo2} className='ml-20 pt-10'/>
        <p className='font-Swipe text-center text-size-xl text-white font-medium mt-20'>Questions, feedback or need help?</p>
        <p className='font-Swipe text-center text-size-2xl text-white font-semibold'>social@swipetoplay.io</p>
        </div>
        <div className='flex flex-col w-1/2'>
        <p className='w-min mx-auto font-Swipe text-center text-size-l text-white font-medium hover:cursor-pointer mt-20 transform transition-transform duration-300 ease-in-out hover:scale-110' onClick={scrollToTop}>Home</p>
        <p className='w-min mx-auto font-Swipe text-center text-size-l text-white mt-5 font-medium hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110' onClick={swiper}>Swipe</p>
        <p className='w-min mx-auto font-Swipe text-center text-size-l text-white mt-5 font-medium hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110' onClick={games}>Games</p>
        <p className='w-min mx-auto font-Swipe text-center text-size-l text-white mt-5 font-medium hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110' onClick={prof}>Profile</p>
        <p className='w-min mx-auto font-Swipe text-center text-size-l text-white mt-5 font-medium hover:cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110' onClick={chats}>Chats</p>
        </div>
    </div>
    <div className='bg-black pb-5 tres:hidden md:flex'><p className='font-Swipe text-size-l text-center text-white'> ©2024 SwipeToPlay technologies.  All rights reserved.</p></div>
</>
  )
}

export default Footer
