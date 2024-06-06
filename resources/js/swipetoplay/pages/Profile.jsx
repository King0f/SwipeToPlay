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
    <div className="bg-gray-200 pt-20 ">
      <Header />
      <div className="flex w-full justify-center">
      <LateralNavP />
      </div>
      <div className="xl:flex w-full p-4 font-montserrat">
      <div className="flex flex-col 2xl:w-1/3 md:ml-18 xl:ml-24 xl:py-10 xl:px-10 items-center bg-black p-4 rounded-md shadow-custom border-1 border-gray-400">
        <h2 className="text-center font-montserrat text-red-100 my-4 xl:hidden text-[22px]">Cambiar foto de perfil</h2>
        <div className="relative 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 m-auto rounded-full flex items-center justify-center shadow-custom"
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>
          <img
            src={usuario.imagen || imagenUser}
            className="rounded-full 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 border-2 border-white shadow-md shadow-gray bg-gray-100"
            onClick={handleEditPictureClick}
          />
          {hovered && (
            <span className="absolute flex items-center justify-center bg-gray-100 bg-opacity-70 2xl:w-80 2xl:h-80 md:w-64 md:h-64 tres:w-48 tres:h-48 p-2 rounded-full text-2xl cursor-pointer tres:hidden xl:flex" onClick={handleEditPictureClick}>
              <b>Cambiar imagen</b>
            </span>
          )}
        </div>
        <p className="text-center text-red-100 font-bold mt-4 mb-8 text-[24px]">{usuario.username}</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </div>

      <div className="flex flex-col xl:py-10 tres:py-4 tres:pb-10 w-full xl:w-2/3 bg-gradient-to-l from-red-200 via-red-300 to-red-400 p-4 rounded-md shadow-custom border-1 border-gray-400">
            <p className="text-center text-black text-xl font-extrabold mt-6 xl:mb-6 xl:text-[30px] tres:text-[26px]">Información del Usuario</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 px-4">
                <div className="w-full p-4 bg-white shadow-custom rounded-md">
                    <b>Email</b> <br /> <span className="font-Swipe">{usuario.email}</span>
                </div>
                <div className="w-full p-4 bg-white shadow-custom rounded-md">
                    <b>Membresia</b> <br /> <span className="font-Swipe">{(() => {
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
                    })()}</span>
                </div>
                <div className="w-full p-4 bg-white shadow-custom rounded-md">
                    <b>Teléfono</b> <br /> <span className="font-Swipe">{usuario.phone}</span>
                </div>
                <div className="w-full p-4 bg-white shadow-custom rounded-md">
                    <b>Deslizamientos restantes</b> <br /> <span className="font-Swipe">{usuario.lvl_premium === 2 ? '∞' : usuario.desplazamientos}</span>
                </div>
                <div className="w-full p-4 bg-white shadow-custom rounded-md ">
                    <b>Mensajes restantes</b> <br /> <span className="font-Swipe">{usuario.n_mensajes}</span>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                    <div className="w-full p-6 bg-white shadow-custom rounded-md text-center">
                        <b>Descripción</b> <br /> <span className="font-Swipe text-lg">{usuario.descripcion}</span>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  <div className="xl:mt-72 tres:mt-24"><Footer /></div>
</div>


  )
}

export default Profile
