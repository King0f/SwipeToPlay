import React, { useEffect, useState } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import imagenEjemplo from '../../../assets/textoLogo.png'
import imagenUser from '../../../assets/profile.jpg'
import conectarLol from '../../../assets/conectarLol.jpg'
import conectarValo from '../../../assets/conectarValo.jpg'
import conectarDiscord from '../../../assets/conectarDiscord.jpg'
import {useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const {usuario, obtenerUsuario} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
    }))
    useEffect(() => {
      obtenerUsuario();
    }, []);
    const home = () => {
        navigate('/');
    };
  return (
    <div>
    <div className='bg-red-500 rounded-full w-6 p-1 m-5 hover:cursor-pointer' onClick={home}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHUlEQVR4nO2cT4hNURzHPzNi/J+MhRTSbCwsSclC/mQjC9L4s1PW0iiEhZ2ZDGFKbERZoDSRP8WCZK0s/EkUZYaYiUgoHN3m2EzzrvveO/ecc+/9fupXr/d63fs+79fv/O4591wQQgghhBBCCCGEEI3SBhwDPgIjwHFgonS6l3wLMGOiT6Lzl2xsdgsHTAKu15D8L4QHyUaW/Ug2Eu1HspFoP5KNRPuRbCTaj2Qj0X4kG4n2I9lItB/JRqL9SDYS7Ueykej6J4gajRHgFfAIuAdcA/qBvcB2YAXQUaU/JA/Jpo4YAu7YqdXNwBxKSGjJpkY8B84CG4ApFJxYJZsx8Q0YALrsOReKokg249T9U8BiKthdmEDx0JaWKClqJpuUuA8sIzJ6IhBjcog/wGVgHpHwLgIpJueBcx8wIbTooQhkGA/xAJgfUvSRCCQYTzEccrAs42Bo/lO7D0g23oSfD3WbWll6aVNH3AAmh5BdtTJi7O8NchlfxcweCNX+VTGzTxKIKmb2zlCyXWd2B9AJLAFWAxuBHcBu4IQdnJ4BPwKJTo67tAyys9IKLABWAd3AVY9XsE9DdSIuZTfLQru2eBp4m6PsXgIS2w00rbYEHQZeOhb92y4UU9TMzosWYDlwDvjuSPaT0Mtkzcj2wWzgkJ1Aalb2LgLTqGyfzAAOAl+bEP0emEYBZYdgLnDBzto1Ins/EVCkrRXrgDcNiP4EzCICirRZaCZwpQHZe4iErGUkBlrsGmI9peSF/V5hZMfE1jov9dcQEW0psj8QH+uBnxlFJyWHIsg+SpxsAn5lEJ38Ie1EKLvP9qHD9pESMT9GojtjVm8LfaJl4GIG0ZdCn2QZaM/QZ38JPf9RFtZmaPtWhj7JqpSQZP5EOFpcSOuvk45KOKI/RfRnu+ggHNBpV1lqyU6yXjjidoro5IpSOKIrRXSyAVU4YnrK+uMZVwcRo9ytIfqm/VzkvJHqsasDiFG21BD92n4uHLGohuhkRlI4ZGrK3LRwzOA4opP7/oSHATHZMihyuJ2ix2b2oH2dvCeEEEIIIYQQQghB2fkLwbeDtVPAFoUAAAAASUVORK5CYII="/></div>
        <div className='w-full h-16 m-auto mt-5 flex justify-end mb-5'><img src={imagenEjemplo}/></div>
        <div className='flex w-full'>

        <div className=' flex flex-col w-1/3'>
            <img src={imagenUser} className='w-1/2 m-auto rounded-full'/>
            <p className='text-center font-Swipe text-red-400 font-bold'>{usuario.username}</p>
        </div>

        <div className=' flex-col w-2/3 m-auto'>
        <p className='text-center font-Swipe text-red-500 text-xl font-extrabold mt-10'>Información del Usuario</p>
        <div className='w-72 h-4 my-5 m-auto'><b>Email: </b>{usuario.email}</div>
        <div className='w-72 h-4 my-5 m-auto'><b>Membresia: </b>{usuario.lvl_premium}</div>
        <div className='w-72 h-16 bg-black my-5 m-auto'><img src={conectarLol}/></div>
        <div className='w-72 h-16 bg-black my-5 m-auto'><img src={conectarValo}/></div>
        <div className='w-72 h-16 bg-black my-5 m-auto'><img src={conectarDiscord}/></div>
        </div>

        </div>
    </div>
  )
}

export default Profile
