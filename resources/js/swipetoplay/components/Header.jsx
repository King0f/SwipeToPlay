import React from "react";
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

  const init = () => {
    navigate(path);
  };

  const isActive = (pagePath) => location.pathname === pagePath ? "font-bold" : "";

  return (
    <div className="w-full flex justify-center h-16 bg-black-300 bg-opacity-75">
      <header className="fixed top-0 w-full h-20 clearNav z-50 flex items-center justify-around bg-opacity-35">
        <div className="mx-5 w-1/3">
          <img src={imagenEjemplo} alt="TextoLogo" onClick={init} className="transform transition-transform duration-300 ease-in-out hover:scale-110" />
        </div>
        {token ? (
          <>
            <div className="">
              <div
                onClick={() => navigate(path)}
                className={`text-black font-Swipe ${isActive(path)} nav-link`}
              >
                <Link to={path}>Inicio</Link>
              </div>
            </div>

            <div className="">
              <div
                onClick={() => navigate(path + "/Swipe")}
                className={`text-black font-Swipe ${isActive(path + "/Swipe")} nav-link`}
              >
                <Link to={path + "/Swipe"}>Start Swiping</Link>
              </div>
            </div>

            <div className="">
              <div
                onClick={() => navigate(path + "/games")}
                className={`text-black font-Swipe ${isActive(path + "/games")} nav-link`}
              >
                <Link to={path + "/games"}>Games</Link>
              </div>
            </div>

            <div className="">
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
              <div className="">
                <div
                  onClick={() => navigate(path)}
                  className={`text-black font-Swipe ${isActive(path)} nav-link`}
                >
                  <Link to={path}>Inicio</Link>
                </div>
              </div>

              <div className="">
                <div className={`text-black font-Swipe nav-link`}>
                  <button onClick={popUpNotLogged}>Start Swiping</button>
                </div>
              </div>

              <div className="">
                <div className={`text-black font-Swipe nav-link`}>
                  <button onClick={popUpNotLogged}>Games</button>
                </div>
              </div>

              <div className="">
                <div className={`text-black font-Swipe nav-link`}>
                  <button onClick={popUpNotLogged}>Start Chatting</button>
                </div>
              </div>
            </>
          )
        }

        <ProfileComp />
      </header>
    </div>
  );
}
