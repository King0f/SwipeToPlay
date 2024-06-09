import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imagenEjemplo from "../../../assets/textoLogo.png";
import "../styles/App.css";
import ProfileComp from "./ProfileComp";
import { apiStore } from "../store/apiStore/apiStore";
import { ToastContainer, Zoom, toast } from "react-toastify";

export default function Header() {
  const token = !!localStorage.getItem("token");
  const path = apiStore.getState().basename;
  const navigate = useNavigate();
  const popUpNotLogged = () => {
    toast.warning(
      "Necesitas tener una cuenta y estar logeado para entrar a esta página.",
      { position: "top-left", theme: "light", transition: Zoom }
    );
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const init = () => {
    navigate(path);
  };


  return (
    <div className="w-full flex justify-center h-16 bg-black-300 bg-opacity-75">
      <header className="fixed top-0 w-full h-20 clearNav z-50 flex items-center justify-around bg-opacity-35">
        <div className="mx-5 md:w-1/3">
          <img
            src={imagenEjemplo}
            alt="TextoLogo"
            onClick={init}
            className="transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        {token ? (
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
            <Link
              to={path}
              className={`${isOpen
                ? "bg-gray-200  text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "80px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="home"></box-icon>
                <button className="ml-2">Inicio</button>
              </div>
            </Link>

            <Link
              to={path + "/Swipe"}
              className={`${isOpen
                ? "bg-gray-200 text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "120px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="sort" rotate="90"></box-icon>
                <button className="ml-2">Swipe</button>
              </div>
            </Link>

            <Link
              to={path + "/Games"}
              className={`${isOpen
                ? "bg-gray-200  text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "160px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="joystick"></box-icon>
                <button className="ml-2">Juegos</button>
              </div>
            </Link>

            <Link
              to={path + "/Chat"}
              className={`${isOpen
                ? "bg-gray-200 text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "202px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="chat"></box-icon>
                <button className="ml-2">Chats</button>
              </div>
            </Link>
            <Link
              to={path + "/Profile"}
              className={`${isOpen
                ? "rounded-b-xl bg-gray-800 text-white w-full absolute left-60 p-5"
                : "md:hidden md:flex hidden"
                }`}
              style={{ top: "250px" }}
            >
              <div
                className="text-white font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon
                  name="user"
                  color="#ffffff"
                ></box-icon>
                <button className="ml-2">Perfil</button>
              </div>
            </Link>
          </>
        ) : (
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
            <Link
              to={path}
              className={`${isOpen
                ? "bg-gray-200  text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "80px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="home"></box-icon>
                <button className="ml-2">Inicio</button>
              </div>
            </Link>
            <div
              className={`${isOpen
                ? "bg-gray-200 text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "120px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="sort" rotate="90"></box-icon>
                <button
                  className="ml-2"
                  onClick={popUpNotLogged}
                >
                  Swipe
                </button>
              </div>
            </div>

            <div
              className={`${isOpen
                ? "bg-gray-200  text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "160px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="joystick"></box-icon>
                <button
                  className="ml-2"
                  onClick={popUpNotLogged}
                >
                  Juegos
                </button>
              </div>
            </div>

            <div
              className={`${isOpen
                ? "bg-gray-200 text-white w-full absolute left-60 p-5"
                : "md:flex hidden mr-6 xl:mr-0"
                }`}
              style={{ top: "202px" }}
            >
              <div
                className="text-black font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon name="chat"></box-icon>
                <button
                  className="ml-2"
                  onClick={popUpNotLogged}
                >
                  Chats
                </button>
              </div>
            </div>
            <Link
              to={path + "/Login"}
              className={`${isOpen
                ? "rounded-b-xl bg-gray-800 text-white w-full absolute left-60 p-5"
                : "md:hidden md:flex hidden"
                }`}
              style={{ top: "250px" }}
            >
              <div
                className="text-white font-Swipe nav-link"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <box-icon
                  name="user"
                  color="#ffffff"
                ></box-icon>
                <button className="ml-2">Login</button>
              </div>
            </Link>
          </>
        )}
        <div
          className={`${isOpen ? "md:flex hidden" : "md:flex hidden"
            }`}
        >
          <ProfileComp />
        </div>
      </header>
    </div>
  );
}
