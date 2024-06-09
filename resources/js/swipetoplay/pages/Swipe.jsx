import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import flechaIzq from '../components/f1.png';
import flechaDer from '../components/f2.png';
import { usuarioStore } from '../store/userStore/usuarioStore';
import imagenUser from '../../../assets/profile.jpg';
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { motion, useAnimation } from 'framer-motion';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const Swipe = () => {
  const { usuario, usuariosSwipe,obtenerUsuariosSwipe, obtenerConexion, actionSwipe, actionSuperlike } = usuarioStore((state) => ({
    usuario: state.usuario,
    usuariosSwipe: state.usuariosSwipe,
    obtenerUsuariosSwipe: state.obtenerUsuariosSwipe,
    obtenerConexion: state.obtenerConexion,
    actionSwipe: state.actionSwipe,
    actionSuperlike: state.actionSuperlike
  }));

  const [conexion, setConexion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetPosition, setResetPosition] = useState(false);
  const [loading, setLoading] = useState(false);
  const fondoMovil = window.innerWidth <= 1650;

  useEffect(() => {
    const fetchData = async () => {
      if (currentIndex >= usuariosSwipe.length - 1) {
        await obtenerUsuariosSwipe();
        setCurrentIndex(0);
      } else {
        const data = await obtenerConexion(usuariosSwipe[currentIndex].id);
        setConexion(data);
      }
    };
    fetchData();
  }, [currentIndex, obtenerConexion]);

  useEffect(() => {
    const fetchData = async () => {
      await obtenerUsuariosSwipe();
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerConexion(usuariosSwipe[currentIndex].id);
      setConexion(data)
    };
    fetchData();
  }, [usuariosSwipe]);

  const handleAction = async (action) => {
    let idJuego = 0;
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
        idJuego = conexion.juego === 'League of Legends' ? 1 : 2;
        await actionSwipe(usuariosSwipe[currentIndex].id, action, idJuego);
        setResetPosition(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  const handleSuperlike = async () => {
    let idJuego = 0;
    try {
      if (usuario.superlikes <= 0 && usuario.lvl_premium !== 2) {
        toast.error("No tienes superlikes suficientes para realizar esta acción.", {
          position: 'top-right',
          className: 'foo-bar',
          theme: 'light',
          transition: Zoom,
          autoClose: 3000,
        });
      } else {
        setLoading(true);
        idJuego = conexion.juego === 'League of Legends' ? 1 : 2;
        await actionSuperlike(usuariosSwipe[currentIndex].id, idJuego);
        setLoading(false);
        toast.success("Super like realizado! Entre a sus chats y empiece a jugar.", {
          position: 'top-left',
          theme: 'light',
          transition: Zoom,
          autoClose: 3000,
        });
        setResetPosition(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error handling action:", error);
    }
  }

  const controls = useAnimation();

  const isMobile = useIsMobile();

  const handleDragEnd = (event, info) => {
    const onActionComplete = () => {
      if (isMobile) {
        setTimeout(() => {
          controls.set({ x: 0, opacity: 1 });
        }, 1500);
      } else {
        controls.start({ x: 0, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } });
      }
    };

    if (info.offset.x > 50) {
      controls.start({
        x: '100vw',
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }).then(() => {
        handleAction(1);
        onActionComplete();
      });
    } else if (info.offset.x < -50) {
      controls.start({
        x: '-100vw',
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }).then(() => {
        handleAction(2);
        onActionComplete();
      });
    } else {
      onActionComplete();
    }
  };

  const MAX_LENGTH = 100;

  const getDescripcionCortada = (text) => {
    if (!text) return '';
    if (text.length > MAX_LENGTH) {
      return text.substring(0, MAX_LENGTH) + '...';
    }
    return text;
  };

  useEffect(() => {
    if (resetPosition) {
      controls.set({ x: 0, opacity: 1 });
      setResetPosition(false);
    }
  }, [currentIndex, resetPosition, controls]);

  return (
    <div className='bg-gray-300 bg-contain bg-no-repeat tres:bg-none sm:bg-gray-300' style={{
      backgroundImage: fondoMovil ? 'none' : `url(../storage/imagenes/prueba11.png)`
    }}>
      <div className="overflow-hidden select-none  xl:h-full">
        <Header />
        <div className='flex justify-between'>
          <div className='flex mx-auto mb-15 mt-8'>
            <div className='flex flex-col justify-around'>
              <div className='justify-center mb-2 tres:hidden xl:hidden 390:flex md:mt-0'>
                <img src={flechaIzq} className='w-8 h-8 self-center mx-2' />
                <p className='text-center text-3xl font-Swipe font-semibold text-red-600'>Swipe</p>
                <img src={flechaDer} className='w-8 h-8 self-center mx-2' />
              </div>
              <div className='flex '>
                {currentIndex < usuariosSwipe.length && (
                  <motion.div className="flex flex-col md:w-[448px] tres:w-[350px] 390:pb-32 md:pb-32 pb-10 mx-auto text-white shadow-lg rounded-md overflow-hidden transform transition-transform cursor-pointer 390:bg-cover tres:bg-stretch bg-no-repeat bg-center 390:mt-3 xl:mt-0"
                    style={{
                      backgroundImage: `url(../storage/imagenes/${conexion.juego === 'Valorant' ? 'valorant3.png' : 'lol2.png'})`
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    initial={resetPosition ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                    whileTap={{ cursor: "grabbing" }}
                    whileDrag={{ scale: 1.05 }}
                  >
                    <div className="flex flex-col items-center p-4">
                      <img className="md:w-36 md:h-36  tres:w-20 tres:h-20 rounded-full mb-4" src={usuariosSwipe[currentIndex].imagen || imagenUser} alt="User" />
                      <h2 className="md:text-2xl 390:text-xl tres:text-md font-montserrat text-white">{usuariosSwipe[currentIndex].username}</h2>
                      <h3 className="md:text-xl 390:text-lg tres:text-sm font-Swipe text-white">{usuariosSwipe[currentIndex].likes}</h3>
                      <box-icon name='heart' type='solid' color='#d80707'></box-icon>
                    </div>
                    <div className="px-16 bg-opacity-20 bg-black  ">
                      <h3 className="390:text-lg tres:text-sm  text-white font-montserrat my-1">Descripción:</h3>
                      <p className="md:text-base 390:text-[13px] tres:text-[12px] text-white text-Swipe mt-2">{getDescripcionCortada(usuariosSwipe[currentIndex].descripcion)}</p>
                    </div>
                    <div className="bg-opacity-20 bg-black flex flex-col items-center justify-center 390:mt-4">
                      <h3 className="md:text-base tres:text-sm text-white font-montserrat mt-1">Id de Riot</h3><span className="lg:text-base tres:text-[12px] font-Swipe mb-1">{conexion.riotID ? conexion.riotID : 'cargando...'}</span>
                      <h3 className="md:text-base tres:text-sm  text-white font-montserrat mt-1">Rango</h3><span className="lg:text-basetres:text-[12px] font-Swipe mb-1">{conexion.rango ? conexion.rango : 'cargando...'}</span>
                      <h3 className="md:text-base tres:text-sm  text-white font-montserrat mt-1">Posición</h3><span className="lg:text-base tres:text-[12px] font-Swipe mb-1">{conexion.posicion ? conexion.posicion : 'cargando...'}</span>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className='flex justify-center space-x-12 390:mt-4 tres:mt-2'>
                <div className='self-center rounded-full w-12 h-12'>
                  <button className="relative inline-flex items-center justify-center p-4 bg-white rounded-full text-red-600 shadow-lg transform transition duration-200 hover:text-red-700 hover:scale-105 focus:outline-none" onClick={() => handleAction(2)}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className='mt-2'>
                  <button className="relative inline-flex items-center justify-center p-4 bg-white rounded-full text-purple-600 shadow-lg transform transition duration-200 hover:text-purple-700 hover:scale-105 focus:outline-none" onClick={() => handleSuperlike()}>
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.344l1.172-1.172a4 4 0 115.656 5.656l-5.172 5.172a1 1 0 01-1.414 0L3.172 10.828a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className='self-center rounded-full w-12 h-12'>
                  <button className="relative inline-flex items-center justify-center p-4 bg-white rounded-full text-green-600 shadow-lg transform transition duration-200 hover:text-green-700 hover:scale-105 focus:outline-none" onClick={() => handleAction(1)}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-medium text-gray-800">Cargando Superlike...</span>
          </div>
        </div>
      )}
      <div className='mt-10'>
        <Footer />
      </div>
    </div>
  );
}

export default Swipe;
