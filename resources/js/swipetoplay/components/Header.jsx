import React from "react";
import imagenEjemplo from '../../../assets/textoLogo.png';
export default function Header() {
  return (
<div className="flex justify-center bg-pink-300 bg-opacity-75">
      <header className="fixed top-0 w-4/5 h-16 mt-5 clearNav z-50 border-0 rounded-full flex items-center justify-between bg-opacity-35">

      <div className="mx-5 align-self-lg-start w-1/3">
      <img src={imagenEjemplo} alt="TextoLogo" className=""/>
        </div>
      <div className="">
          <p className='text-white'>Home</p>
        </div>
        <div className="">
          <p className='text-white'>Profile</p>
        </div>
        <div className="">
          <p className='text-white'>Games</p>
        </div>
        <div className="">
          <p className='text-white'>Blablabla</p>
        </div>
        <div className="flex bg-pink-300 bg-opacity-45 rounded-full h-16 justify-center px-5 items-center">
          <p className='text-white'>Start Swipping</p>
        </div>
      </header>
    </div>
  );
}
