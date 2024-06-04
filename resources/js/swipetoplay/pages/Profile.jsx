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
    <div className="bg-gray-200 pt-20">
      <Header />
      <div className="flex w-full justify-center">
      <LateralNavP />
      </div>
  <div className="lg:flex w-full p-2 ">
    <div className="flex flex-col 2xl:w-1/3 md:ml-20 xl:py-10">
    <h2 className="text-center font-montserrat text-red-500 my-4  xl:hidden text-[22px]">Cambiar foto de perfil</h2>
      <div className="relative 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 m-auto rounded-full flex items-center justify-center shadow-custom"
           onMouseEnter={() => setHovered(true)}
           onMouseLeave={() => setHovered(false)}>
        <img
          src={usuario.imagen || imagenUser}
          className="rounded-full 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 border-2 border-black"
          onClick={handleEditPictureClick}
        />
        {hovered && (
          <span className="absolute flex items-center justify-center bg-gray-100 bg-opacity-70 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 p-2 rounded-full text-2xl cursor-pointer tres:hidden xl:flex" onClick={handleEditPictureClick}>
            <b>Cambiar imagen</b>
          </span>
        )}
      </div>
      <p className="text-center text-red-400 font-bold mt-6 text-[22px]">{usuario.username}</p>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept="image/*"
      />
    </div>

    <div className="flex items-center justify-center flex-col xl:ml-10 xl:py-10">
      <p className="text-center font-Swipe text-red-500 text-xl font-extrabold mt-10 text-[26px]">Información del Usuario</p>
      <div className="w-72 h-4 my-6 m-auto text-[18px]"><b>Email</b> <br/> {usuario.email}</div>
      <div className="w-72 h-4 my-6 m-auto text-[18px]"><b>Membresia</b> <br/> 
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
      <div className="w-72 h-4 my-6 m-auto text-[18px]"><b>Teléfono </b>  <br/>  {usuario.phone}</div>
      <div className="w-72 h-4 my-6 m-auto text-[18px]"><b>Deslizamientos restantes </b> <br/> {usuario.lvl_premium === 2 ? '∞' : usuario.desplazamientos}</div>
      <div className="w-72 h-4 my-6 m-auto text-[18px]"><b>Mensajes restantes</b> <br/> {usuario.n_mensajes}</div>
    </div>
  </div>
  <div className="mt-72"><Footer /></div>
</div>


  )
}

export default Profile
