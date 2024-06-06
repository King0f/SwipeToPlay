import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import flechaIzq from '../components/f1.png';
import flechaDer from '../components/f2.png';
import { usuarioStore } from '../store/userStore/usuarioStore';
import imagenUser from '../../../assets/profile.jpg';
import Icon_actions_close_l from '../components/Icon_actions_close_l';
import Icon_social_pleasures_xl from '../components/Icon_social_pleasures_xl';
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { motion, useAnimation } from 'framer-motion';

const Swipe = () => {
  const { usuario, usuariosSwipe, obtenerUsuariosSwipe, obtenerConexion, actionSwipe } = usuarioStore((state) => ({
    usuario: state.usuario,
    usuariosSwipe: state.usuariosSwipe,
    obtenerUsuariosSwipe: state.obtenerUsuariosSwipe,
    setUsuariosSwipe: state.setUsuariosSwipe,
    obtenerConexion: state.obtenerConexion,
    actionSwipe: state.actionSwipe,
  }));

  const [conexion, setConexion] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  async function fetchData() {
    try {
        if (currentIndex >= 8) {
          setCurrentIndex(1)
          await obtenerUsuariosSwipe(); 
        }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function primeraCarga(){
    await obtenerUsuariosSwipe();
  }
  useEffect(() => {
    try{
      if (currentIndex == 0){
        primeraCarga()
      }
      fetchData();
    }
    catch (e){

    }
  }, []);

  useEffect(() => {
    const fetchConexion = async () => {
      const data = await obtenerConexion(usuariosSwipe[currentIndex].id);
      setConexion(data);
    };
    fetchConexion();
  }, [currentIndex, usuariosSwipe]); 

  const handleAction = async (action) => {
    console.log(usuariosSwipe[currentIndex].username);
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
        console.log(usuariosSwipe[currentIndex].id, action)
        await actionSwipe(usuariosSwipe[currentIndex].id, action);
        setCurrentIndex(currentIndex + 1);
        fetchData();
      }
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  const onCardLeftScreen = () => {
    setSwipeDirection(null);
    onCardLeftScreen('fooBar');
  };

  const controls = useAnimation();
  const [swiped, setSwiped] = useState(false);

  const handleDragEnd = (event, info) => {
    // Set a reasonable threshold for swipe detection
    if (info.offset.x > 50) { // Threshold for a "right swipe"
      controls.start({
          x: '100vw', 
          opacity: 0, 
          transition: { duration: 0.3, ease: "easeOut" }
      }).then(() => {
          handleAction(1); // Accept action
          setSwiped(false); // Reset swipe state
      });
  } else if (info.offset.x < -50) { // Threshold for a "left swipe"
      controls.start({
          x: '-100vw', 
          opacity: 0, 
          transition: { duration: 0.3, ease: "easeOut" }
      }).then(() => {
          handleAction(2); // Reject action
          setSwiped(false); // Reset swipe state
      });
  } else {
      // If not swiped far enough, return to original position
      controls.start({ x: 0, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } });
  }
  };

  const MAX_LENGTH = 100;

    const getDescripcionCortada = (text) => {
        if (text.length > MAX_LENGTH) {
            return text.substring(0, MAX_LENGTH) + '...';
        }
        return text;
    };

  if (swiped) {
    return null;
  }
  return (
    <>
    

    <div className="h-screen overflow-hidden select-none bg-gray-100">
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
                <motion.div className="flex flex-col w-[448px] pb-36 mx-auto text-white shadow-lg rounded-md overflow-hidden transform transition-transform cursor-pointer" 
                style={{ 
                  backgroundImage: `url(../storage/imagenes/${conexion.juego == 'Valorant' ? 'valorant3.png' : 'lol2.png'})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={controls}
                initial={{ x: 0, opacity: 1 }}
                whileTap={{ cursor: "grabbing" }}
                whileDrag={{ scale: 1.05 }}
            >
                <div className="flex flex-col items-center p-4">
                    <img className="w-36 h-36 rounded-full mb-4" src={usuariosSwipe[currentIndex].imagen || imagenUser} alt="User" />
                    <h2 className="text-2xl font-montserrat text-white">{usuariosSwipe[currentIndex].username}</h2>
                    <h3 className="text-xl font-Swipe text-white">{usuariosSwipe[currentIndex].likes}</h3><box-icon name='heart' type='solid' color='#d80707' ></box-icon>
                </div>
                <div className="px-16">
                    <h3 className="text-white font-montserrat my-1">Descripción:</h3>
                    <p className="text-white text-Swipe mt-2">{getDescripcionCortada(usuariosSwipe[currentIndex].descripcion)}</p>
                </div>
                <div className="bg-opacity-10 bg-gray-800 flex flex-col items-center justify-center">
                    <h3 className="text-white font-montserrat mt-1">Juego</h3><span className="font-Swipe mb-1">{conexion.riotID ? conexion.riotID : 'cargando...'}</span>
                    <h3 className="text-white font-montserrat mt-1">Rango</h3><span className="font-Swipe mb-1">{conexion.rango ? conexion.rango : 'cargando...'}</span>
                    <h3 className="text-white font-montserrat mt-1">Posición</h3><span className="font-Swipe mb-1">{conexion.posicion ? conexion.riotID : 'cargando...'}</span>
                </div>
                </motion.div>
              )}
              <div className='self-center ml-5 rounded-full w-12 h-12 hover:bg-green-300'>
                <div className='ml-2 mt-2'>
                  <button onClick={() => handleAction(1)} className=''>
                    <box-icon name='like' type='solid' color='#079225' ></box-icon>
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
