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
    <div>
    <div className='bg-red-500 rounded-full w-6 p-1 m-5 hover:cursor-pointer' onClick={home}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHUlEQVR4nO2cT4hNURzHPzNi/J+MhRTSbCwsSclC/mQjC9L4s1PW0iiEhZ2ZDGFKbERZoDSRP8WCZK0s/EkUZYaYiUgoHN3m2EzzrvveO/ecc+/9fupXr/d63fs+79fv/O4591wQQgghhBBCCCGEEI3SBhwDPgIjwHFgonS6l3wLMGOiT6Lzl2xsdgsHTAKu15D8L4QHyUaW/Ug2Eu1HspFoP5KNRPuRbCTaj2Qj0X4kG4n2I9lItB/JRqL9SDYS7Ueykej6J4gajRHgFfAIuAdcA/qBvcB2YAXQUaU/JA/Jpo4YAu7YqdXNwBxKSGjJpkY8B84CG4ApFJxYJZsx8Q0YALrsOReKokg249T9U8BiKthdmEDx0JaWKClqJpuUuA8sIzJ6IhBjcog/wGVgHpHwLgIpJueBcx8wIbTooQhkGA/xAJgfUvSRCCQYTzEccrAs42Bo/lO7D0g23oSfD3WbWll6aVNH3AAmh5BdtTJi7O8NchlfxcweCNX+VTGzTxKIKmb2zlCyXWd2B9AJLAFWAxuBHcBu4IQdnJ4BPwKJTo67tAyys9IKLABWAd3AVY9XsE9DdSIuZTfLQru2eBp4m6PsXgIS2w00rbYEHQZeOhb92y4UU9TMzosWYDlwDvjuSPaT0Mtkzcj2wWzgkJ1Aalb2LgLTqGyfzAAOAl+bEP0emEYBZYdgLnDBzto1Ins/EVCkrRXrgDcNiP4EzCICirRZaCZwpQHZe4iErGUkBlrsGmI9peSF/V5hZMfE1jov9dcQEW0psj8QH+uBnxlFJyWHIsg+SpxsAn5lEJ38Ie1EKLvP9qHD9pESMT9GojtjVm8LfaJl4GIG0ZdCn2QZaM/QZ38JPf9RFtZmaPtWhj7JqpSQZP5EOFpcSOuvk45KOKI/RfRnu+ggHNBpV1lqyU6yXjjidoro5IpSOKIrRXSyAVU4YnrK+uMZVwcRo9ytIfqm/VzkvJHqsasDiFG21BD92n4uHLGohuhkRlI4ZGrK3LRwzOA4opP7/oSHATHZMihyuJ2ix2b2oH2dvCeEEEIIIYQQQghB2fkLwbeDtVPAFoUAAAAASUVORK5CYII="/></div>
        <div className='flex w-full'>
          <div class="flex flex-col p-2 border-2 border-red-300 rounded">
            <Link to={path + "/Profile"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='user'></box-icon>
            </button></Link>
            <Link to={path + "/Tarjetas"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='credit-card' ></box-icon>
            </button></Link>
            <Link to={path + "/Conexiones"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='link-alt' ></box-icon>
            </button></Link>
            <Link to={path + "/Condiguracion"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='cog' ></box-icon>
            </button></Link>
            <button onClick={handleCerrarSesion} class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='log-out'></box-icon>
            </button>
          </div>

          <div className='flex flex-col w-1/3'>
            <div className="relative w-1/2 m-auto rounded-full" 
                onMouseEnter={() => setHovered(true)} 
                onMouseLeave={() => setHovered(false)}>
              <img src={usuario.imagen || imagenUser} className="rounded-full hover:bg-gray-700 hover:opacity-90" onClick={handleEditPictureClick} />
              {hovered && (
                <span className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 p-2 rounded-full text-2xl" onClick={handleEditPictureClick}>
                  <b>Cambiar imagen</b>
                </span>
              )}
            </div>
            <p className='text-center font-Swipe text-red-400 font-bold mt-5'>{usuario.username}</p>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
            />
          </div>
        

        <div className=' flex-col w-3/3 m-auto'>
        <p className='text-center font-Swipe text-red-500 text-xl font-extrabold mt-10'>Información del Usuario</p>
        <div className='w-72 h-4 my-5 m-auto'><b>Email: </b>{usuario.email}</div>
        <div className='w-72 h-4 my-5 m-auto'><b>Membresia: </b>
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
    </div>
    
  )
}

export default Profile
