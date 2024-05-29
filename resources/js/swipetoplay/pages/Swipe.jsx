import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import flechaIzq from '../components/f1.png';
import flechaDer from '../components/f2.png';
import { usuarioStore } from '../store/userStore/usuarioStore';
import imagenUser from '../../../assets/profile.jpg';
import Icon_social_like_l from '../components/Icon_social_like_l';
import Icon_actions_close_l from '../components/Icon_actions_close_l';
import Icon_social_like_m from '../components/Icon_social_like_m';
import Icon_social_pleasures_xl from '../components/Icon_social_pleasures_xl';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TinderCard from 'react-tinder-card';

const Swipe = () => {
  const { usuario, usuarioSwipe, obtenerUsuarioSwipe, obtenerConexionLOL, obtenerConexionValorant, actionSwipe, swipesResetTimer, resetTimer } = usuarioStore((state) => ({
    usuario: state.usuario,
    usuarioSwipe: state.usuarioSwipe,
    obtenerUsuarioSwipe: state.obtenerUsuarioSwipe,
    obtenerConexionLOL: state.obtenerConexionLOL,
    obtenerConexionValorant: state.obtenerConexionValorant,
    actionSwipe: state.actionSwipe,
    swipesResetTimer: state.swipesResetTimer,
    resetTimer: state.resetTimer
  }));

  const [juegoSeleccionado, setJuegoSeleccionado] = useState('');
  const [conexionLOL, setConexionLOL] = useState([]);
  const [conexionValorant, setConexionValorant] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (action) => {
    try {
      if (usuario.desplazamientos <= 0 && usuario.lvl_premium !== 2) {
        toast.error("No tienes deslizamientos suficientes para realizar esta acción.", {
          position: 'top-right',
          className: 'foo-bar',
          theme: 'light',
          transition: Zoom,
          autoClose: 3000,
        });
      } else {
        await actionSwipe(usuarioSwipe.id, action);
        fetchData();
      }
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
    if (direction === 'right') {
      handleAction(1); // Aceptar
    } else if (direction === 'left') {
      handleAction(2); // Rechazar
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <>
      <Header />
      <div className='flex justify-between'>
        <ToastContainer pauseOnFocusLoss={false} limit={3} />
        <Filters juegoSeleccionado={juegoSeleccionado} setJuegoSeleccionado={setJuegoSeleccionado} />
        <div className='flex mx-auto mb-20 mt-14'>
          <div className='flex flex-col justify-around'>
            <div className='flex justify-center'>
              <img src={flechaIzq} className='w-10 h-10 self-center mx-2' />
              <p className='text-center text-4xl font-Swipe font-semibold text-red-600'>Swipe</p>
              <img src={flechaDer} className='w-10 h-10 self-center mx-2' />
            </div>
            <div className='flex'>
              <div className='self-center mr-5 rounded-full w-12 h-12 hover:bg-red-300'>
                <div className='ml-2 mt-2'>
                  <button onClick={() => handleAction(2)} className=''>
                    <Icon_actions_close_l fill="red" />
                  </button>
                </div>
              </div>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                preventSwipe={['up', 'down']}
                className='w-[400px] h-[450px] border-4 border-red-800 bg-red-400 mx-2'
              >
                <div id="containerSwipe" className='w-full h-full flex flex-col justify-normal'>
                  <img src={usuarioSwipe.imagen || imagenUser} className="w-[96px] h-[96px] rounded-full border-4 border-black mx-auto my-2" />
                  <p className='text-center text-size-xl font-Swipe font-semibold text-black mt-2'>{usuarioSwipe.username}</p>
                  <div className='flex font-Swipe justify-center mb-4 font-semibold mt-1'>
                    <p>{usuarioSwipe.likes}</p>
                    <Icon_social_like_m fill="green" />
                  </div>
                  <div className='flex justify-around'>
                    {juegoSeleccionado === 'Lol' && (
                      <div id="Lol" className='flex flex-col'>
                        <p><b>Id:</b> {conexionLOL.riotID}</p>
                        <p><b>Rank:</b> {conexionLOL.rango} </p>
                        <p><b>Rol:</b> {conexionLOL.posicion}</p>
                      </div>
                    )}
                    {juegoSeleccionado === 'Valorant' && (
                      <div id="Valorant" className='flex flex-col'>
                        <p><b>Id:</b> {conexionValorant.riotID}</p>
                        <p><b>Rank:</b> {conexionValorant.rango}</p>
                        <p><b>Rol:</b> {conexionValorant.posicion} </p>
                      </div>
                    )}
                  </div>
                  <p className='text-center mt-10'>Total de deslizamientos restantes: {usuario.lvl_premium === 2 ? '∞' : usuario.desplazamientos}</p>
                </div>
              </TinderCard>
              <div className='self-center ml-5 rounded-full w-12 h-12 hover:bg-green-300'>
                <div className='ml-2 mt-2'>
                  <button onClick={() => handleAction(1)} className=''>
                    <Icon_social_like_l fill="green" />
                  </button>
                </div>
              </div>
            </div>
            <button>
              <div className='h-16 bg-yellow-300 w-1/2 mx-auto mt-4 border-2 border-yellow-950 flex justify-center hover:bg-yellow-200 hover:text-red-800'>
                <p className='self-center font-swipe text-center font-semibold text-size-2xl'>SUPERLIKE</p>
                <div className='self-center ml-4'>
                  <Icon_social_pleasures_xl fill='brown' />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Swipe;
