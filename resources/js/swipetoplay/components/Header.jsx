import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link si estás utilizando react-router-dom
import imagenEjemplo from '../../../assets/textoLogo.png';

export default function Header() {
  // Estado para almacenar la página actual
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <div className="flex justify-center bg-black-300 bg-opacity-75">
      <header className="fixed top-0 w-4/5 h-16 mt-5 clearNav z-50 border-0 rounded-full flex items-center justify-between bg-opacity-35">

        <div className="mx-5 align-self-lg-start w-1/3">
          <img src={imagenEjemplo} alt="TextoLogo" className=""/>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Home")}
            className={`text-white font-Swipe ${currentPage === "Home" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/">Home</Link>
          </div>
        </div>

        <div className="">
          <div
            onClick={() => setCurrentPage("Profile")}
            className={`text-white font-Swipe ${currentPage === "Profile" ? "font-bold" : ""} nav-link`}
          >
            <Link to="/profile">Profile</Link>
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

        <div className="flex bg-slate-950 bg-opacity-45 rounded-full h-16 justify-center px-5 items-center">
          <p className='text-white font-Swipe'>Start Swiping</p>
        </div>

      </header>
    </div>
  );
}
