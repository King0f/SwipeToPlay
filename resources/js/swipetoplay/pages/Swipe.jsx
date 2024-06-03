import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
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
import Footer from '../components/Footer';

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

  const [conexionLOL, setConexionLOL] = useState([]);
  const [conexionValorant, setConexionValorant] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usuariosSwipe, setUsuariosSwipe] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  async function fetchData() {
    try {
      await obtenerUsuarioSwipe();
      const conexionLOLData = await obtenerConexionLOL(usuarioSwipe.id);
      const conexionValorantData = await obtenerConexionValorant(usuarioSwipe.id);
      setConexionLOL(conexionLOLData);
      setConexionValorant(conexionValorantData);
      setUsuariosSwipe([...usuariosSwipe, usuarioSwipe]);  // Agregar al array de usuarios para swipe
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (action) => {
    console.log(usuarioSwipe.username);
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
        console.log(usuarioSwipe.id, action)
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
      setSwipeDirection(direction);
      handleAction(1); // Aceptar
    } else if (direction === 'left') {
      setSwipeDirection(direction);
      handleAction(2); // Rechazar
    }
    setCurrentIndex(currentIndex + 1);
  };

  const onCardLeftScreen = () => {
    setSwipeDirection(null);
    onCardLeftScreen('fooBar');
  };

  return (
    <>
    <div className="h-screen overflow-hidden select-none">
      <Header />
      <div className='flex justify-between'>
        <ToastContainer pauseOnFocusLoss={false} limit={3} />
        <div className='flex mx-auto mb-15 mt-10'>
          <div className='flex flex-col justify-around'>
            <div className='flex justify-center mb-2'>
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
              {currentIndex < usuariosSwipe.length && (
                <TinderCard
                  key={usuariosSwipe[currentIndex].id}
                  onSwipe={onSwipe}
                  onCardLeftScreen={() => onCardLeftScreen()}
                  preventSwipe={['up', 'down']}
                  className={`w-[1000px] h-[450px] mx-2 background-image rounded-xl ${
                    swipeDirection === 'left' ? 'swipe-left' : swipeDirection === 'right' ? 'swipe-right' : 'swipe'
                  }`}
                >
                  <div id="containerSwipe" className='w-full h-full flex flex-col justify-normal'>
                    <img src={usuarioSwipe.imagen || imagenUser} className="w-[96px] h-[96px] rounded-full mx-auto my-3 shadow-custom-circle" />
                    <p className='text-center text-size-xl font-Swipe font-semibold text-white mt-2'>{usuarioSwipe.username}</p>
                    <div className='flex font-Swipe justify-center mb-4 font-semibold mt-1'>
                      <p className='text-center text-size-l font-Swipe font-semibold text-white mr-1'>{usuarioSwipe.likes}</p>
                      <Icon_social_like_m fill="green" />
                    </div>
                    <div className='flex justify-around mt-7'>
                      <div className='flex flex-col'>
                        <p className='font-Swipe text-size-l'>
                          <b>Id:</b> {conexionLOL.riotID ? conexionLOL.riotID : 'undefined'}
                        </p>
                        <p className='font-Swipe text-size-l'>
                          <b>Rank:</b> {conexionLOL.rango ? conexionLOL.rango : 'undefined'}
                        </p>
                        <p className='font-Swipe text-size-l'>
                          <b>Rol:</b> {conexionLOL.posicion ? conexionLOL.posicion : 'undefined'}
                        </p>
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-Swipe text-size-l'>
                          <b>Id:</b> {conexionValorant.riotID ? conexionValorant.riotID : 'undefined'}
                        </p>
                        <p className='font-Swipe text-size-l'>
                          <b>Rank:</b> {conexionValorant.rango ? conexionValorant.rango : 'undefined'}
                        </p>
                        <p className='font-Swipe text-size-l'>
                          <b>Rol:</b> {conexionValorant.posicion ? conexionValorant.posicion : 'undefined'}
                        </p>
                      </div>
                    </div>
                    <p className='text-center mt-28 font-Swipe font-medium text-white'>Total de deslizamientos restantes: {usuario.lvl_premium === 2 ? '∞' : usuario.desplazamientos}</p>
                  </div>
                </TinderCard>
              )}
              <div className='self-center ml-5 rounded-full w-12 h-12 hover:bg-green-300'>
                <div className='ml-2 mt-2'>
                  <button onClick={() => handleAction(1)} className=''>
                    <Icon_social_like_l fill="green" />
                  </button>
                </div>
              </div>
            </div>
            <button>
              <div className='h-16 bg-yellow-300 w-1/2 mx-auto mt-4 border-2 border-yellow-950 flex rounded-xl justify-center hover:bg-yellow-200 hover:text-red-800'>
                <p className='self-center font-swipe text-center font-semibold text-size-2xl'>SUPERLIKE</p>
                <div className='self-center ml-4'>
                  <Icon_social_pleasures_xl fill='brown' />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Swipe;
