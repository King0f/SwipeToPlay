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
    <div className="w-full flex justify-center h-16 bg-black-300 bg-opacity-75">
      <header className="fixed top-0 w-full h-20 clearNav z-50 flex items-center justify-around bg-opacity-35">
        <div className="mx-5 w-1/3">
          <img src={imagenEjemplo} alt="TextoLogo" className=""/>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Home")}
            className={`text-black font-Swipe ${currentPage === "Home" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/">Inicio</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Profile")}
            className={`text-black font-Swipe ${currentPage === "Profile" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/Swipe">Start Swiping</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Games")}
            className={`text-black font-Swipe ${currentPage === "Games" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/games">Games</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Blablabla")}
            className={`text-black font-Swipe ${currentPage === "Blablabla" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/blablabla">Blablabla</Link>
          </div>
        </div>

      <ProfileComp/>
      </header>
    </div>
  );
}
