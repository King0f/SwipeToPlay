import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import imagenEjemplo from '../../../assets/textoLogo.png';
import '../styles/App.css'
import ProfileComp from './ProfileComp';
import { apiStore } from "../store/apiStore/apiStore";
import { ToastContainer, Zoom, toast } from 'react-toastify';

export default function Header() {
  const token = !!localStorage.getItem('token');
  const path = apiStore.getState().basename;
  const navigate = useNavigate();
  const location = useLocation();  // Obtener la ruta actual
  const popUpNotLogged = () => {
    toast.warning("Necesitas tener una cuenta y estar logeado para entrar a esta página.",
      { position: 'top-left', theme: 'light', transition: Zoom, })
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const init = () => {
    navigate(path);
  };

  const isActive = (pagePath) => location.pathname === pagePath ? "font-bold" : "";

  return (
   <div className="w-full flex justify-center h-16 bg-black-300 bg-opacity-75">
      <header className="fixed top-0 w-full h-20 clearNav z-50 flex items-center justify-around bg-opacity-35">
        <div className="mx-5 md:w-1/3">
          <img src={imagenEjemplo} alt="TextoLogo" onClick={init} className="transform transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
        {token ? (
          <>
           <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
            <div className={`${isOpen ? '' : 'md:flex hidden'}`}>
              <div
                onClick={() => navigate(path)}
                className={`text-black font-Swipe ${isActive(path)} nav-link`}
              >
                <Link to={path}>Inicio</Link>
              </div>
            </div>

            <div className={`${isOpen ? '' : 'md:flex hidden'}`}>
              <div
                onClick={() => navigate(path + "/Swipe")}
                className={`text-black font-Swipe ${isActive(path + "/Swipe")} nav-link`}
              >
                <Link to={path + "/Swipe"}>Start Swiping</Link>
              </div>
            </div>

            <div className={`${isOpen ? '' : 'md:flex hidden'}`}>
              <div
                onClick={() => navigate(path + "/games")}
                className={`text-black font-Swipe ${isActive(path + "/games")} nav-link`}
              >
                <Link to={path + "/games"}>Games</Link>
              </div>
            </div>

            <div className={`${isOpen ? '' : 'md:flex hidden'}`}>
              <div
                onClick={() => navigate(path + "/Chat")}
                className={`text-black font-Swipe ${isActive(path + "/Chat")} nav-link`}
              >
                <Link to={path + "/Chat"}>Start Chatting</Link>
              </div>
            </div>
          </>
        )
          : (
            <>
              <ToastContainer pauseOnFocusLoss={false} limit={3} />
              <div className="md:hidden mr-4">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
              <div className={`${isOpen ? 'bg-gray-200  text-white w-full absolute left-60 p-5' : 'md:flex hidden'}`} style={{ top: '80px' }}>
              <div className="text-black font-Swipe nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                <box-icon name='home' ></box-icon>
                  <Link className="ml-2" to={path}>Inicio</Link>
                </div>
              </div>

              <div className={`${isOpen ? 'bg-gray-200 text-white w-full absolute left-60 p-5' : 'md:flex hidden'}`} style={{ top: '120px' }} >
              <div className="text-black font-Swipe nav-link" style={{ display: 'flex', alignItems: 'center' }}>
              <box-icon name='sort' rotate='90' ></box-icon>
                  <button className="ml-2" onClick={popUpNotLogged}>Swipe</button>
                </div>
              </div>

              <div className={`${isOpen ? 'bg-gray-200  text-white w-full absolute left-60 p-5' : 'md:flex hidden'}`} style={{ top: '160px' }}>
              <div className="text-black font-Swipe nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                <box-icon name='joystick'></box-icon>
                  <button className="ml-2" onClick={popUpNotLogged}>Juegos</button>
                </div>
              </div>

              <div className={`${isOpen ? 'bg-gray-200 text-white w-full absolute left-60 p-5' : 'md:flex hidden'}`} style={{ top: '202px' }}>
              <div className="text-black font-Swipe nav-link" style={{ display: 'flex', alignItems: 'center' }}>
                <box-icon name='chat'></box-icon>
                  <button className="ml-2" onClick={popUpNotLogged}>Chats</button>
                </div>
              </div>
              <Link to={path + '/Login'} className={`${isOpen ? 'rounded-b-xl bg-gray-800 text-white w-full absolute left-60 p-5' : 'md:hidden md:flex hidden'}`} style={{ top: '250px' }}>
              <div className="text-white font-Swipe nav-link" style={{ display: 'flex', alignItems: 'center' }}>
              <box-icon name='user' color='#ffffff'></box-icon>
                <button className="ml-2">Login/Register</button>
              </div>
            </Link>
            </>
          )
        }
        <div className={`${isOpen ? 'md:flex hidden' : 'md:flex hidden'}`}>
        <ProfileComp />
        </div>
      </header>
    </div>
  );
}
