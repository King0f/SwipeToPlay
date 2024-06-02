import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import LateralNavP from '../components/LateralNavP'
import imagenUser from '../../../assets/profile.jpg'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Profile = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false)
    const path = apiStore.getState().basename;
    const {usuario, obtenerUsuario, guardarFotoPerfil, borrarUsuario} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
      guardarFotoPerfil: state.guardarFotoPerfil,
      borrarUsuario: state.borrarUsuario
    }))
    useEffect(() => {
      obtenerUsuario();
    }, []);
    const fileInputRef = useRef(null);
    const handleEditPictureClick = () => {
      fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        guardarFotoPerfil(file); 
      }
    };
  return (
    <div className="pt-20">
      <Header />
      <LateralNavP />
  <div className="flex w-full p-2">
    <div className="flex flex-col w-1/3">
      <div className="relative w-1/2 h-auto m-auto rounded-full flex items-center justify-center"
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}>
        <img
          src={usuario.imagen || imagenUser}
          className="rounded-full h-64 w-64 border-2 border-black"
          onClick={handleEditPictureClick}
        />
        {hovered && (
          <span className="absolute flex items-center justify-center bg-gray-100 bg-opacity-70 h-64 w-64 p-2 rounded-full text-2xl cursor-pointer" onClick={handleEditPictureClick}>
            <b>Cambiar imagen</b>
          </span>
        )}
      </div>
      <p className="text-center font-Swipe text-red-400 font-bold mt-5">{usuario.username}</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
    </div>

    <div className="flex flex-col w-2/3 m-auto">
      <p className="text-center font-Swipe text-red-500 text-xl font-extrabold mt-10">Información del Usuario</p>
      <div className="w-72 h-4 my-5 m-auto"><b>Email: </b>{usuario.email}</div>
      <div className="w-72 h-4 my-5 m-auto"><b>Membresia: </b>
        {(() => {
          switch (usuario.lvl_premium) {
            case 0:
              return <span>Suscripción Básica</span>;
            case 1:
              return <span>Suscripción Premium</span>;
            case 2:
              return <span>Suscripción Deluxe</span>;
            default:
              return <span>Valor no reconocido</span>;
          }
        })()}
      </div>
      <div className="w-72 h-4 my-5 m-auto"><b>Teléfono: </b>{usuario.phone}</div>
      <div className="w-72 h-4 my-5 m-auto"><b>Deslizamientos restantes: </b>{usuario.desplazamientos}</div>
      <div className="w-72 h-4 my-5 m-auto"><b>Mensajes restantes: </b>{usuario.n_mensajes}</div>
    </div>
  </div>
  <div className="mt-72"><Footer /></div>
</div>


  )
}

export default Profile
