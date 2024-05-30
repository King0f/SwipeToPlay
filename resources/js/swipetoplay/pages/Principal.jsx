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
        navigate(path + "/Login");
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
                toast.dismiss(); // Cancela todos los toasts antes de navegar
                navigate(path + '/ComprarPremium');
            }
        } else if (lvl == 2) {
            if (usuario.lvl_premium == lvl) {
                toast.error("Usted ya tiene el nivel de suscripción deluxe.", {position: 'top-left', theme:'light', transition: Zoom, autoClose: 3000});
            } else {
                toast.dismiss(); // Cancela todos los toasts antes de navegar
                navigate(path + '/ComprarDeluxe');
            }
        }
    };

  return (
    <>
    <Header />
    <ToastContainer pauseOnFocusLoss={false} limit={3} />
    <div className="App mt-10">
    <img src={textoPagPrincipal}/>
    {token ? (
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

    <button className='mb-4' onClick={() => comprobarLvlPremium(2)}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>
   
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
    <button className='mb-4' onClick={() => comprobarLvlPremium(1)}><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Suscribirse</p></div></button>
    </div>

    </div>
</div>
    <div className='my-36'></div>
    <div className='bg-black h-[500px]'>
        <img src={instrucciones} className='w-10/12'/>
    </div>
    <div className='mb-72 bg-black flex justify-center pb-10'>
        <button className='bg-red-600 w-56 h-14 hover:bg-red-800 hover:text-white hover:border-4 hover:border-yellow-300 transition' onClick={swiper}><p className='font-Swipe text-size-l font-semibold'>Start Swiping</p></button>
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
    
    <Footer/>
        </div>
    </>
  )
}

export default Principal
