import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import { usuarioStore } from '../store/userStore/usuarioStore'
import imagenUser from '../../../assets/profile.jpg'
const Swipe = () => {
  const {usuario, usuarioSwipe, obtenerUsuarioSwipe, obtenerConexionLOL, obtenerConexionValorant, actionSwipe} = usuarioStore((state) => ({
    usuario: state.usuario,
    usuarioSwipe: state.usuarioSwipe,
    obtenerUsuarioSwipe: state.obtenerUsuarioSwipe,
    obtenerConexionLOL: state.obtenerConexionLOL,
    obtenerConexionValorant: state.obtenerConexionValorant,
    actionSwipe: state.actionSwipe
  }))
  const [conexionLOL, setConexionLOL] = useState([]);
  const [conexionValorant, setConexionValorant] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        await obtenerUsuarioSwipe();
        const conexionLOLData = await obtenerConexionLOL(usuarioSwipe.id);
        const conexionValorantData = await obtenerConexionValorant(usuarioSwipe.id);
        setConexionLOL(conexionLOLData);
        setConexionValorant(conexionValorantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const handleAction = async (action) => {
    try{
      actionSwipe(usuarioSwipe.id, action)
      obtenerUsuarioSwipe();
    }catch{

    }
  }

  
  return (
    <>
    <Header/>
    <div className='flex justify-between'>
    <Filters/>
    <div className='flex m-auto'>
    <div className='flex flex-col'>
    <p className='text-center text-4xl font-Swipe font-semibold'>Swipe</p>
    <div className='flex'>
    <div className='self-center w-12 h-12 rounded-full border-2 bg-gray-500'>
    <button onClick={() => handleAction(2)}> Pass </button>
    </div>
    <div className='w-96 h-96 border-2 bg-gray-300'>
      <img src={usuarioSwipe.imagen  || imagenUser} className="profile-img"></img>
      <p>{usuarioSwipe.username}</p>
      <p>Total de likes de este usuario: {usuarioSwipe.likes}</p>
      <h3><b>Datos de League of Legends:</b></h3>
      <p>Nombre de la cuenta de Riot: {conexionLOL.riotID}</p>
      <p>Rango del jugador: {conexionLOL.rango} </p>
      <p>Posicion más jugada:{conexionLOL.posicion}</p>
      <h3><b>Datos de Valorant:</b></h3>
      <p>Nombre de la cuenta de Riot: {conexionValorant.riotID} </p>
      <p>Rango del jugador:{conexionValorant.rango} </p>
      <p>Posicion más jugada: {conexionValorant.posicion} </p>
      <p>Total de deslizamientos restantes: {usuario.desplazamientos}</p>
    </div>
    <div className='self-center w-12 h-12 rounded-full border-2 bg-gray-500'>
    <button onClick={() => handleAction(1)}> Like </button>
    </div>
    </div>
    <div className='w-16 h-16 bg-gray-500 m-auto rounded-full mt-4'></div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Swipe
