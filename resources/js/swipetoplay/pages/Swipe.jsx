import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import { usuarioStore } from '../store/userStore/usuarioStore'
import imagenUser from '../../../assets/profile.jpg'
import Icon_social_like_l from '../components/Icon_social_like_l'
import Icon_actions_close_l from '../components/Icon_actions_close_l'
import Icon_social_like_m from '../components/Icon_social_like_m'
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
    <div className='flex mx-auto mb-20 mt-14'>
    <div className='flex flex-col justify-around'>
    <p className='text-center text-4xl font-Swipe font-semibold'>Swipe</p>
    <div className='flex'>
    <div className='m-auto mr-5'><button onClick={() => handleAction(2)}> <Icon_actions_close_l fill="red"/></button></div>
    <div className='w-96 h-96 border-2 bg-gray-300'>
      <img src={usuarioSwipe.imagen  || imagenUser} className="profile-img m-auto mt-2"/>
      <p className='text-center font-Swipe font-semibold text-red-600'>{usuarioSwipe.username}</p>
      <div className='flex font-Swipe justify-center'><p>{usuarioSwipe.likes}</p><Icon_social_like_m fill="red"/></div>
      <hr />
      <div className='flex justify-around'>
      <div className='flex flex-col border-r-2'>
      <h3><b>League of Legends</b></h3>
      <p>ID: {conexionLOL.riotID}</p>
      <p>Rank: {conexionLOL.rango} </p>
      <p>Rol: {conexionLOL.posicion}</p>
      </div>
      <div className='flex flex-col'>
      <h3><b>Valorant</b></h3>
      <p>ID: {conexionValorant.riotID} </p>
      <p>Rank: {conexionValorant.rango} </p>
      <p>Rol: {conexionValorant.posicion} </p>
      </div>
      </div>
      <p className='text-center'>Total de deslizamientos restantes: {usuario.desplazamientos}</p>
    </div>
    <div className='m-auto ml-5'><button onClick={() => handleAction(1)}> <Icon_social_like_l fill="lightgreen"/></button></div>
    </div>
    <div className='h-16 bg-gray-500 w-1/2 mx-auto mt-4'>Superlike</div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Swipe
