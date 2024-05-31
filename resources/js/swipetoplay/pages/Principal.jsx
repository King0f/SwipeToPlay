import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate} from "react-router-dom";
import '../styles/App.css'
import Header from '../components/Header';
import textoPagPrincipal from '../../../assets/textoPagPrincipal.png'
import instrucciones from '../../../assets/instrucciones.png'
import textoLogo2 from '../../../assets/textoLogo2.png'
import { riotStore } from '../store/riotStore/riotStore';
import { apiStore } from '../store/apiStore/apiStore';
import Footer from '../components/Footer';
import { usuarioStore } from '../store/userStore/usuarioStore';
import {ToastContainer, Zoom, toast } from 'react-toastify'

function Principal() {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const token = !!localStorage.getItem('token');
    const popUpNotLogged = () => {
        toast.warning("Necesitas tener una cuenta y estar logeado para entrar a esta página.",
          { position: 'top-left', theme: 'light', transition: Zoom, autoClose: 3000, })
      };
    const {usuario, obtenerUsuario} = usuarioStore((state) => ({
        usuario: state.usuario,
        obtenerUsuario: state.obtenerUsuario,
    }))
    useEffect(() => {
        obtenerUsuario();
    }, []);

    const swiper = () =>{
        navigate(path + "/Swipe");
    }

    const comprobarLvlPremium = (lvl) => {
        if (lvl == 1) {
            if (usuario.lvl_premium == lvl) {
                toast.error("Usted ya tiene el nivel de suscripción premium.", {position: 'top-left', theme:'light', transition: Zoom, autoClose: 3000});
            } else {
                toast.dismiss(); 
                navigate(path + '/ComprarPremium');
            }
        } else if (lvl == 2) {
            if (usuario.lvl_premium == lvl) {
                toast.error("Usted ya tiene el nivel de suscripción deluxe.", {position: 'top-left', theme:'light', transition: Zoom, autoClose: 3000});
            } else {
                toast.dismiss(); 
                navigate(path + '/ComprarDeluxe');
            }
        }
    };

  return (
    <>
    <Header />
    <ToastContainer pauseOnFocusLoss={false} limit={3} />
    <div>
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 p-4">
    <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 px-12"> 
        <div className="flex flex-col justify-center text-center md:text-left pt-6 md:pt-0"> 
        <h1 className="font-montserrat font-extrabold text-heading-super md:text-heading-super leading-heading-super text-primary tracking-wide">
            <span className="text-highlight">Swipe</span> to find <span className="text-highlight">your</span> next <span className="text-highlight">partner</span>
          </h1>
        </div>
        <div className="hidden md:block"></div>
        {token ? (
        <div className="relative flex justify-center items-center">
          <div className="bg-white text-customGray p-4 rounded-custom shadow-custom w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"> {/* Ajusté la anchura máxima */}
            <Link to={path + '/Swipe'} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center mb-4">
                <span role="img" aria-label="swipe card" className="mr-2">🃏</span>
                <span className="font-sofia-pro text-xl font-semibold">Try Swipe</span>
              </div>
            </Link>
            <Link to={path + '/Chat'} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center mb-4">
                <span role="img" aria-label="chatting" className="mr-2">💬</span>
                <span className="font-sofia-pro text-xl font-semibold">Start Chatting</span>
              </div>
            </Link>
            <Link to={path + '/Profile'} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center">
                <span role="img" aria-label="profile" className="mr-2">👤</span>
                <span className="font-sofia-pro text-xl font-semibold">Customize Profile</span>
              </div>
            </Link>
          </div>
        </div>) : (
        <div className="relative flex justify-center items-center">
          <div className="bg-white text-customGray p-4 rounded-custom shadow-custom w-full md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"> {/* Ajusté la anchura máxima */}
            <a onClick={popUpNotLogged} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center mb-4">
                <span role="img" aria-label="swipe card" className="mr-2">🃏</span>
                <span className="font-sofia-pro text-xl font-semibold">Try Swipe</span>
              </div>
            </a>
            <a onClick={popUpNotLogged} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center mb-4">
                <span role="img" aria-label="chatting" className="mr-2">💬</span>
                <span className="font-sofia-pro text-xl font-semibold">Start Chatting</span>
              </div>
            </a>
            <Link to={path + '/Login'} className="block w-full text-customGray no-underline hover:bg-customRedLight hover:text-black p-2 rounded cursor-pointer">
              <div className="flex items-center">
                <span role="img" aria-label="profile" className="mr-2">👤</span>
                <span className="font-sofia-pro text-xl font-semibold">Create Profile</span>
              </div>
            </Link>
          </div>
        </div>)
        }
      </div>
    </div>
    <div className="relative max-h-[100vh] bg-cover bg-center bg-gray-900 text-white p-6">
  <div className="flex items-center justify-center ml-16 py-32">
    <img
      src="../imagenes/lolval.jpg"
      alt="Imagen de Valorant y League of Legends"
      className="w-1/2 h-auto mr-12 rounded-xl"
      style={{ maxWidth: '90%', maxHeight: '90%' }}
    />
    <div className='mt-24 ml-10 mr-20 text-center'>
    <h2 className="text-4xl font-bold mb-4"><b className="text-highlight">Find</b> someone to play with.</h2>
    <p>Explore the entire League of Legends and Valorant community on our page.</p>
    <br/>
    <h2 className="text-4xl font-bold mb-4">Play while <b className="text-highlight">having fun</b>.</h2>
    <p>Enhance your experience by playing with people at your skill level.</p>
    <br/>
    <h2 className="text-4xl font-bold mb-4"><b className="text-highlight">Communicate</b> with your teammates.</h2>
    <p>Chat with the people you match with and start playing!</p>
    <br/>
    <button className="botonInicio text-white font-bold py-3 px-6 rounded mt-4"   
        onClick={() => {navigate(path + '/Swipe')}}
    >
        Start Swiping
  </button>
</div>
  </div>
</div>

    {token ? (
    <>
    <div>
    <p className='text-center text-size-3xl mb-5 font-semibold font-Swipe text-red-800'>Suscripciones mensuales</p>
    <div className="w-full h-96 flex justify-center">
    <div className='rounded-xl w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center rounded-lg'>Básica</p>
    <div>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>10 deslizamientos diarios</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium line-through'>Superlike no disponible</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>25 mensajes diarios</p>
    </div>
    <button className='mb-4'><div className='w-44 h-12 m-auto border-gray-900 border-2 bg-gray-600 hover:bg-gray-700 hover:border-gray-950 flex justify-center rounded-full'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Gratuita</p></div></button>
    </div>
    <div className='rounded-xl w-80 h-96 border-4 mx-5 flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center rounded-lg'>Deluxe</p>
    <p className='font-Swipe font-bold text-size-xl text-red-400 mt-2 text-center'>9.99€/Mes</p>
    </div>
    <div>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Delizamientos ilimitados</p>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Superlikes ilimitados</p>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Mensajes ilimitados</p>
    </div>

    <button className='mb-4' onClick={() => comprobarLvlPremium(2)}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center rounded-full'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>

   </div>
    <div className='rounded-xl w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>Premium</p>
    <p className='font-Swipe font-bold text-size-xl text-red-400 mt-2 text-center'>4.99€/Mes</p>
    </div>
    <div>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>25  deslizamientos diarios</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>1 Superlike diario</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>100 mensajes ilimitados</p>
    </div>
    <button className='mb-4' onClick={() => comprobarLvlPremium(1)}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center rounded-full'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>
    </div>

    </div>
</div>
    <div className='my-36'></div>
    <div className='bg-black h-[500px]'>
        <img src={instrucciones} className='w-10/12'/>
    </div>
    <div className='mb-72 bg-black flex justify-center pb-10'>
        <button className='rounded-full bg-red-600 w-56 h-14 hover:bg-red-800 hover:text-white hover:border-4 hover:border-yellow-300 transition' onClick={swiper}><p className='font-Swipe text-size-l font-semibold'>Start Swiping</p></button>
    </div>
    </>) : (
    <>
    <div>
    <p className='text-center text-size-3xl mb-5 font-semibold font-Swipe text-red-800'>Suscripciones mensuales</p>
    <div className="w-full h-96 flex justify-center">
    <div className='w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>Básica</p>
    <div>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>10 deslizamientos diarios</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium line-through'>Superlike no disponible</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>25 mensajes diarios</p>
    </div>
    <button className='mb-4'><div className='w-44 h-12 m-auto border-gray-900 border-2 bg-gray-600 hover:bg-gray-700 hover:border-gray-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Gratuita</p></div></button>
    </div>
    <div className='w-80 h-96 border-4 mx-5 flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>Deluxe</p>
    <p className='font-Swipe font-bold text-size-xl text-red-400 mt-2 text-center'>9.99€/Mes</p>
    </div>
    <div>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Delizamientos ilimitados</p>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Superlikes ilimitados</p>
    <p className='text-size-l text-center text-gray-500 font-Swipe font-medium'>Mensajes ilimitados</p>
    </div>

    <button className='mb-4' onClick={popUpNotLogged}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>

   </div>
    <div className='w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>Premium</p>
    <p className='font-Swipe font-bold text-size-xl text-red-400 mt-2 text-center'>4.99€/Mes</p>
    </div>
    <div>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>25  deslizamientos diarios</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>1 Superlike diario</p>
    <p className='text-size-m text-center text-gray-500 font-Swipe font-medium'>100 mensajes ilimitados</p>
    </div>
    <button className='mb-4' onClick={popUpNotLogged}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>
    </div>

    </div>
</div>
    <div className='my-36'></div>
    <div className='bg-black h-[500px]'>
        <img src={instrucciones} className='w-10/12'/>
    </div>
    <div className='mb-72 bg-black flex justify-center pb-10'>
        <button className='bg-red-600 w-56 h-14 hover:bg-red-800 hover:text-white hover:border-4 hover:border-yellow-300 transition' onClick={popUpNotLogged}><p className='font-Swipe text-size-l font-semibold'>Start Swiping</p></button>
    </div>
    </>)}
        <div><Footer/></div>

        </div>
    </>
  )
}

export default Principal
