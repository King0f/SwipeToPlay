import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagenEjemplo from '../../../assets/textoLogo.png';
import '../styles/App.css'
import ProfileComp from './ProfileComp';

export default function Header() {
  const token = !!localStorage.getItem('token');
  // Estado para almacenar la pÃ¡gina actual
  const [currentPage, setCurrentPage] = useState("Home");
  const navigate = useNavigate();
  const redToSwipe = () => {
    navigate('/Swipe');
  };
  return (
    <div className="w-full flex justify-center h-16 bg-black-300 bg-opacity-75 mb-5">
      <header className="fixed top-0 w-4/5 h-16 mt-5 clearNav z-50 border-0 rounded-full flex items-center justify-between bg-opacity-35">

        <div className="mx-5 align-self-lg-start w-1/3">
          <img src={imagenEjemplo} alt="TextoLogo" className=""/>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Home")}
            className={`text-white font-Swipe ${currentPage === "Home" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/">Inicio</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Profile")}
            className={`text-white font-Swipe ${currentPage === "Profile" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/Swipe">Start Swiping</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Games")}
            className={`text-white font-Swipe ${currentPage === "Games" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/games">Games</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Blablabla")}
            className={`text-white font-Swipe ${currentPage === "Blablabla" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/blablabla">Blablabla</Link>
          </div>
        </div>

        {/* <div className="flex bg-slate-900 bg-opacity-45 rounded-full h-16 justify-center px-5 items-center" onClick={redToSwipe}>

          <p className='text-white font-Swipe'>Start Swiping</p>
        </div> */}

      <ProfileComp />
      </header>
    </div>
  );
}
