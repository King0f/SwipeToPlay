import { useEffect} from 'react'
import { Link, useNavigate} from "react-router-dom";
import '../styles/App.css'
import Header from '../components/Header';
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
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100 p-4">
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
  <div className="flex items-center justify-center ml-16 py-24">
    <img
      src="../imagenes/lolval.jpg"
      alt="Imagen de Valorant y League of Legends"
      className="w-1/2 h-auto mr-12 rounded-xl shadow-custom"
      style={{ maxWidth: '90%', maxHeight: '90%' }}
    />
    <div className='ml-10 mr-20 text-center'>
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
      <div className='bg-gray-300 pt-24 pb-28'>
      <div className="flex flex-col justify-center items-center text-center md:text-left pt-4 md:pt-0 my-4"> 
        <h1 className="font-montserrat font-extrabold text-5xl md:text-5xl leading-heading-super text-primary tracking-wide">
            Descubre nuestras <span className="text-highlight">suscripciones</span>
          </h1>
        </div>
    <div class="grid lg:grid-cols-3 px-64 p-10 text-zinc-800">
    <div class="flex flex-col items-center bg-slate-100 p-6 rounded-lg shadow-lg max-w-xs">
        <div>
            <h2 class="font-extrabold text-3xl text-center mb-2">Default</h2>
            <p class="opacity-60 text-center">Opciones gratuitas al crear una cuenta</p>
            <div class="flex flex-col items-center my-8">
                <p class="font-extrabold text-4xl">Free</p>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>10 Swipes cada media hora</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>25 Mensajes al dia</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Superlikes</s>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Notificaciones al hacer Match</s>
            </p>
            <div class="flex justify-center mt-8">
            <button className="botonInicio2 text-white font-bold py-3 px-6 rounded mt-4"   
            >
                Suscrito
            </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center bg-gradient-to-br from-red-200 via-red-300 to-red-400 p-8 rounded-lg shadow-lg relative border-8 border-red-500 max-w-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-20 h-20 absolute -top-11 -left-11 fill-red-400">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd"></path>
        </svg>
        <p class="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">POPULAR</p>
        <div>
            <div class="flex gap-4 justify-center">
                <p class="font-extrabold text-3xl mb-2">Deluxe</p>
            </div>
            <p class="opacity-60 text-center">Para las personas mas exigentes</p>
            <div class="flex gap-4 justify-center">
                <div class="flex flex-col items-center my-8">
                    <p class="font-extrabold text-4xl">€9.99</p>
                    <p class="text-sm opacity-60">/mes</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Swipes ILIMITADOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Mensajes ILIMITADOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Superlikes INFINITOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Notificaciones en Whatsapp y Gmail al hacer match</b>
            </p>
            <div class="flex justify-center mt-8">
            <button className="bg-red-600 text-white font-bold py-3 px-6 rounded mt-4"   
              onClick={() => {comprobarLvlPremium(2)}}
            >
              Suscribirse
            </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center bg-slate-100 p-6 rounded-lg shadow-lg max-w-xs ml-14">
    <div>
            <h2 class="font-extrabold text-3xl text-center mb-2">Premium</h2>
            <p class="opacity-60 text-center">La opción de pago mas básica</p>
            <div class="flex flex-col items-center my-8">
            <p class="font-extrabold text-4xl">€4.99</p>
                    <p class="text-sm opacity-60">/mes</p>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>25 Swipes cada media hora</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>100 Mensajes al dia</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>1 Superlike diario</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Notificaciones al hacer Match</s>
            </p>
            <div class="flex justify-center mt-8">
            <button className="bg-red-600 text-white font-bold py-3 px-6 rounded mt-4"   
              onClick={() => {comprobarLvlPremium(1)}}
            >
                Suscribirse
            </button>
            </div>
        </div>
    </div>
</div>
    </div>
    ) : (
    <>
     <div className='bg-gray-300 py-20'>
      <div className="flex flex-col justify-center items-center text-center md:text-left pt-6 md:pt-0 my-4"> 
        <h1 className="font-montserrat font-extrabold text-5xl md:text-5xl leading-heading-super text-primary tracking-wide">
            Descubre nuestras <span className="text-highlight">suscripciones</span>
          </h1>
        </div>
    <div class="grid lg:grid-cols-3 px-64 p-10 text-zinc-800">
    <div class="flex flex-col items-center bg-slate-100 p-6 rounded-lg shadow-lg max-w-xs">
        <div>
            <h2 class="font-extrabold text-3xl text-center mb-2">Default</h2>
            <p class="opacity-60 text-center">Opciones gratuitas al crear una cuenta</p>
            <div class="flex flex-col items-center my-8">
                <p class="font-extrabold text-4xl">Free</p>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>10 Swipes cada media hora</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>25 Mensajes al dia</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Superlikes</s>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Notificaciones al hacer Match</s>
            </p>
            <div class="flex justify-center mt-8">
            <button className="botonInicio2 text-white font-bold py-3 px-6 rounded mt-4"   
            >
                Suscrito
            </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center bg-gradient-to-br from-red-200 via-red-300 to-red-400 p-8 rounded-lg shadow-lg relative border-8 border-red-500 max-w-sm">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-20 h-20 absolute -top-11 -left-11 fill-red-400">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd"></path>
        </svg>
        <p class="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">POPULAR</p>
        <div>
            <div class="flex gap-4 justify-center">
                <p class="font-extrabold text-3xl mb-2">Deluxe</p>
            </div>
            <p class="opacity-60 text-center">Para las personas mas exigentes</p>
            <div class="flex gap-4 justify-center">
                <div class="flex flex-col items-center my-8">
                    <p class="font-extrabold text-4xl">€9.99</p>
                    <p class="text-sm opacity-60">/mes</p>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Swipes ILIMITADOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Mensajes ILIMITADOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Superlikes INFINITOS</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2 fill-red-600">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>Notificaciones en Whatsapp y Gmail al hacer match</b>
            </p>
            <div class="flex justify-center mt-8">
            <button className="bg-red-600 text-white font-bold py-3 px-6 rounded mt-4"   
              onClick={popUpNotLogged}
            >
                Suscribirse
            </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center bg-slate-100 p-6 rounded-lg shadow-lg max-w-xs ml-14">
    <div>
            <h2 class="font-extrabold text-3xl text-center mb-2">Premium</h2>
            <p class="opacity-60 text-center">La opción de pago mas básica</p>
            <div class="flex flex-col items-center my-8">
            <p class="font-extrabold text-4xl">€4.99</p>
                    <p class="text-sm opacity-60">/mes</p>
            </div>
        </div>
        <div class="flex flex-col gap-1">
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>25 Swipes cada media hora</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>100 Mensajes al dia</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd"></path>
                </svg>
                <b>1 Superlike diario</b>
            </p>
            <p class="flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="w-4 h-4 mr-2">
                    <path fill-rule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75C6.072 21.75 2.25 17.928 2.25 12S6.072 2.25 12 2.25 21.75 6.072 21.75 12 17.928 21.75 12 21.75zM15.53 8.47a.75.75 0 00-1.06 0L12 10.94l-2.47-2.47a.75.75 0 00-1.06 1.06L10.94 12l-2.47 2.47a.75.75 0 101.06 1.06L12 13.06l2.47 2.47a.75.75 0 101.06-1.06L13.06 12l2.47-2.47a.75.75 0 000-1.06z" clip-rule="evenodd"></path>
                </svg>
                <s>Notificaciones al hacer Match</s>
            </p>
            <div class="flex justify-center mt-8">
            <button className="bg-red-600 text-white font-bold py-3 px-6 rounded mt-4"   
              onClick={popUpNotLogged}
            >
                Suscribirse
            </button>
            </div>
        </div>
    </div>
</div>
    </div>
    </>)}
        <div><Footer/></div>

        </div>
    </>
  )
}

export default Principal
