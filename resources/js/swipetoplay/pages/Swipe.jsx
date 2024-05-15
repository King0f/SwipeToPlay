import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'
import flechaIzq from '../components/f1.png'
import flechaDer from '../components/f2.png'
import { usuarioStore } from '../store/userStore/usuarioStore'
import imagenUser from '../../../assets/profile.jpg'
import Icon_social_like_l from '../components/Icon_social_like_l'
import Icon_actions_close_l from '../components/Icon_actions_close_l'
import Icon_social_like_m from '../components/Icon_social_like_m'
import Icon_social_pleasures_xl from '../components/Icon_social_pleasures_xl'
import {ToastContainer, Zoom, toast } from 'react-toastify'
const Swipe = () => {
  const {usuario, usuarioSwipe, obtenerUsuarioSwipe, obtenerConexionLOL, obtenerConexionValorant, actionSwipe, swipesResetTimer, resetTimer} = usuarioStore((state) => ({
    usuario: state.usuario,
    usuarioSwipe: state.usuarioSwipe,
    obtenerUsuarioSwipe: state.obtenerUsuarioSwipe,
    obtenerConexionLOL: state.obtenerConexionLOL,
    obtenerConexionValorant: state.obtenerConexionValorant,
    actionSwipe: state.actionSwipe,
    swipesResetTimer: state.swipesResetTimer,
    resetTimer: state.resetTimer
  }))
  const [conexionLOL, setConexionLOL] = useState([]);
  const [conexionValorant, setConexionValorant] = useState([]);
  async function fetchData() {
    try {
      await obtenerUsuarioSwipe();
      const conexionLOLData = await obtenerConexionLOL(usuarioSwipe.id);
      const conexionValorantData = await obtenerConexionValorant(usuarioSwipe.id);
      setConexionLOL(conexionLOLData);
      setConexionValorant(conexionValorantData);
      console.log(conexionLOL)
      console.log(conexionValorant)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    /* swipesResetTimer();
    console.log(resetTimer) */
  }, []);

  const handleAction = async (action) => {
    try{
      if (usuario.desplazamientos <= 0 && usuario.lvl_premium != 2){
        toast.error("No tienes deslizamientos suficientes para realizar esta accion.", 
        {position: 'top-right',className:'foo-bar',theme:'light',transition:Zoom, autoClose:3000, })
      }else{
        actionSwipe(usuarioSwipe.id, action)
        fetchData();
      }
    }catch{

    }
  };

  return (
    <>
    <Header/>
    <div className='flex justify-between'>
    <ToastContainer pauseOnFocusLoss={false} limit={3} />
    <Filters/>
    <div className='flex mx-auto mb-20 mt-14'>
    <div className='flex flex-col justify-around'>
    <div className='flex justify-center'><img src={flechaIzq} className='w-10 h-10 self-center mx-2'/><p className='text-center text-4xl font-Swipe font-semibold text-red-600'>Swipe</p><img src={flechaDer} className='w-10 h-10 self-center mx-2'/></div>
    <div className='flex'>
    <div className=' self-center mr-5 rounded-full w-12 h-12 hover:bg-red-300 '><div className='ml-2 mt-2'><button onClick={() => handleAction(2)} className=''><Icon_actions_close_l fill="red"/></button></div></div>
    <div className='w-[400px] h-[450px] border-4 border-red-800 bg-red-400'>
      <img src={usuarioSwipe.imagen  || imagenUser} className="w-24 rounded-full border-4 border-black m-auto mt-2"/>
      <p className='text-center text-size-xl font-Swipe font-semibold text-black mt-2'>{usuarioSwipe.username}</p>
      <div className='flex font-Swipe justify-center mb-4 font-semibold mt-1'><p>{usuarioSwipe.likes}</p><Icon_social_like_m fill="green"/></div>
      <div className='flex justify-around'>
      <div className='flex flex-col'>
      <h3 className='text-center font-swipe text-size-m font-medium'><b>LOL</b></h3>
      <p><b>Id:</b> {conexionLOL.riotID}</p>
      <p><b>Rank:</b> {conexionLOL.rango} </p>
      <p><b>Rol: </b>{conexionLOL.posicion}</p>
      </div>
      <div className='flex flex-col'>
      <h3 className='text-center font-swipe text-size-m font-medium'><b>VALORANT</b></h3>
      <p><b>Id:</b> {conexionValorant.riotID}</p>
      <p><b>Rank:</b> {conexionValorant.rango}</p>
      <p><b>Rol: </b> {conexionValorant.posicion} </p>
      </div>
      </div>
      <p className='text-center mt-10'>Total de deslizamientos restantes: {usuario.lvl_premium === 2 ? '∞' : usuario.desplazamientos}</p>
      {/* <p className='text-center mt-10'>Siguiente reseteo de deslizamientos: {resetTimer}</p> */}
    </div>
    <div className=' self-center ml-5 rounded-full w-12 h-12 hover:bg-green-300 '><div className='ml-2 mt-2'><button onClick={() => handleAction(1)} className=''><Icon_social_like_l fill="green"/></button></div></div>
    </div>
    <button><div className=' h-16 bg-yellow-300 w-1/2 mx-auto mt-4 border-2 border-yellow-950 flex justify-center hover:bg-yellow-200 hover:text-red-800 '><p className='self-center font-swipe text-center font-semibold text-size-2xl'>SUPERLIKE</p><div className='self-center ml-4'><Icon_social_pleasures_xl fill='brown'/></div></div></button>
    </div>
    </div>
    </div>
    </>
  )
}

export default Swipe
