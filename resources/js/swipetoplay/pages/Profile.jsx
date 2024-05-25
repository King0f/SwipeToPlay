import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import imagenEjemplo from '../../../assets/textoLogo.png'
import imagenUser from '../../../assets/profile.jpg'
import conectarLol from '../../../assets/conectarLol.jpg'
import conectarValo from '../../../assets/conectarValo.jpg'
import conectarDiscord from '../../../assets/conectarDiscord.jpg'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Profile = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false)
    const path = apiStore.getState().basename;
    const {usuario, obtenerUsuario, guardarFotoPerfil} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
      guardarFotoPerfil: state.guardarFotoPerfil
    }))
    useEffect(() => {
      obtenerUsuario();
    }, []);
    const home = () => {
        navigate(path);
    };
    const fileInputRef = useRef(null);

    // Función para abrir el selector de archivos
    const handleEditPictureClick = () => {
      fileInputRef.current.click();
    };

    // Función para manejar cuando un archivo es seleccionado
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log(file)
      if (file) {
        guardarFotoPerfil(file); // Suponiendo que esta función maneja la actualización
      }
    };
    const handleCerrarSesion = () => {
      localStorage.removeItem('token'); // Eliminar el token del localStorage
      navigate(path);
    };
  return (
    <div className="pt-20">
  <Header />
  <div className="fixed top-1/3 left-5 transform -translate-y-1/2 flex flex-col p-2 border-2 border-red-300 rounded items-center">
    <Link to={path + "/Profile"}>
      <button className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="user"></box-icon>
      </button>
    </Link>
    <Link to={path + "/Tarjetas"}>
      <button className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="credit-card"></box-icon>
      </button>
    </Link>
    <Link to={path + "/Conexiones"}>
      <button className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="link-alt"></box-icon>
      </button>
    </Link>
    <Link to={path + "/HistorialMatch"}>
      <button className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="heart"></box-icon>
      </button>
    </Link>
    <Link to={path + "/Configuracion"}>
      <button className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="cog"></box-icon>
      </button>
    </Link>
    <button onClick={handleCerrarSesion} className="flex p-2 hover:bg-red-400 rounded">
      <box-icon name="log-out"></box-icon>
    </button>
  </div>

  <div className="flex w-full p-2">
    <div className="flex flex-col w-1/3">
      <div className="relative w-1/2 m-auto rounded-full flex items-center justify-center"
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
      <div className="w-72 h-4 my-5 m-auto"><b>Username: </b>{usuario.username}</div>
      <div className="w-72 h-4 my-5 m-auto"><b>Email: </b>{usuario.email}</div>
      <div className="w-72 h-4 my-5 m-auto"><b>Membresia: </b>
        {(() => {
          switch (usuario.lvl_premium) {
            case 0:
              return <span>Nivel básico</span>;
            case 1:
              return <span>Premium nivel 1</span>;
            case 2:
              return <span>Premium nivel 2</span>;
            default:
              return <span>Valor no reconocido</span>;
          }
        })()}
      </div>
    </div>
  </div>
  <div className="mt-72"><Footer /></div>
</div>


  )
}

export default Profile
