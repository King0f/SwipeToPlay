import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import imagenEjemplo from '../../../assets/textoLogo.png'
import imagenUser from '../../../assets/profile.jpg'
import conectarLol from '../../../assets/conectarLol.jpg'
import conectarValo from '../../../assets/conectarValo.jpg'
import conectarDiscord from '../../../assets/conectarDiscord.jpg'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


const Tarjetas = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const [actualizar, setActualizar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cardNumber, setCardNumber] = useState('XXXX XXXX XXXX XXXX');
    const [expDate, setExpDate] = useState('12/24');
    const [ccvNumber, setCcvNumber] = useState('***');
    const [cardName, setCardName] = useState('Nombre Apellido');
    /* const [tarjetas, setTarjetas] = useState(); */
    const {tarjetas, obtenerTarjetas, guardarTarjeta} = usuarioStore((state) => ({
      tarjetas: state.tarjetas,
      obtenerTarjetas: state.obtenerTarjetas,
      guardarTarjeta: state.guardarTarjeta
    }))
    useEffect(() => {
      obtenerTarjetas()
  }, [actualizar])
    const handleCerrarSesion = () => {
      localStorage.removeItem('token'); // Eliminar el token del localStorage
      navigate(path);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      guardarTarjeta(cardName,cardNumber,expDate,ccvNumber)
      setActualizar(!actualizar);
      setMostrarFormulario(false); // Ocultar el formulario después de agregar la tarjeta
    };

  return (
    <div className="pt-20">
  <Header />
  <div className="flex w-full p-2 justify-center">
    <div className="fixed left-5 flex flex-col p-2 border-2 border-red-300 rounded justify-center transform -translate-y-1/2 top-1/3">
      <Link to={path + "/Profile"}>
        <button className="flex p-2 hover:bg-red-400 rounded">
          <box-icon name="user"></box-icon>
        </button>
      </Link>
      <Link to={path + "/Tarjetas"}>
        <button className="flex p-2 hover:bg-red-400 rounded">
          <box-icon name="credit-card"></box-icon>
        </button>
      </Link>
      <Link to={path + "/Conexiones"}>
        <button className="flex p-2 hover:bg-red-400 rounded">
          <box-icon name="link-alt"></box-icon>
        </button>
      </Link>
      <Link to={path + "/HistorialMatch"}>
        <button className="flex p-2 hover:bg-red-400 rounded">
          <box-icon name="heart"></box-icon>
        </button>
      </Link>
      <Link to={path + "/Configuracion"}>
        <button className="flex p-2 hover:bg-red-400 rounded">
          <box-icon name="cog"></box-icon>
        </button>
      </Link>
      <button onClick={handleCerrarSesion} className="flex p-2 hover:bg-red-400 rounded">
        <box-icon name="log-out"></box-icon>
      </button>
    </div>
  </div>
  <div className="bg-white flex flex-wrap justify-center gap-8 m-40">
  {tarjetas?.map((tarjeta) => (
    <div key={tarjeta.id} className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
      <img className="object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" alt="tarjeta" />
      <div className="w-full px-8 absolute top-8">
        <div className="flex justify-between">
          <div>
            <h1 className="font-light">Nombre completo</h1>
            <p className="font-medium tracking-widest">{tarjeta.titular}</p>
          </div>
          <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="logo" />
        </div>
        <div className="pt-1">
          <h1 className="font-light">Número tarjeta</h1>
          <p className="font-medium tracking-more-wider">{tarjeta.n_tarjeta}</p>
        </div>
        <div className="pt-6 pr-6">
          <div className="flex justify-between">
            <div>
              <h1 className="font-light text-xs">Válido</h1>
              <p className="font-medium tracking-wider text-sm">{tarjeta.f_caducidad}</p>
            </div>
            <div>
              <h1 className="font-light text-xs">CVV</h1>
              <p className="font-bold tracking-more-wider text-sm">{tarjeta.CVV}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
    <div className="mb-5">
    {!mostrarFormulario && (
      <div className="flex justify-center mt-16">
        <button onClick={() => setMostrarFormulario(true)} className="bg-stone-500 text-white p-2 rounded hover:bg-red-500 w-50">Añadir Tarjeta</button>
      </div>
    )}
    {mostrarFormulario && (
      <main className="flex items-center justify-center min-h-screen p-6">
        <form className="bg-white w-full max-w-3xl mx-auto px-4 py-8 shadow-md rounded-md flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-full max-w-md">
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">Número de tarjeta:</label>
              <input
                id="cardNumber"
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                maxLength="16"
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div className="flex gap-x-2 mb-4">
              <div className="block w-1/2">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">Fecha Expiración:</label>
                <input
                  id="expDate"
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  maxLength="5"
                  placeholder="MM/YY"
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                />
              </div>
              <div className="block w-1/2">
                <label className="text-neutral-800 font-bold text-sm mb-2 block">CCV:</label>
                <input
                  id="ccvNumber"
                  type="text"
                  className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  maxLength="3"
                  placeholder="123"
                  value={ccvNumber}
                  onChange={(e) => setCcvNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">Titular:</label>
              <input
                id="cardName"
                type="text"
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Nombre Apellidos"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full max-w-md mt-5">
            <div className="bg-white flex justify-center items-center p-2">
              <div className="space-y-16">
                <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl">
                  <img className="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png" alt="tarjeta" />
                  <div className="w-full px-8 absolute top-8">
                    <div className="flex justify-between">
                      <div>
                        <h1 className="font-light">Nombre completo</h1>
                        <p className="font-medium tracking-widest">{cardName}</p>
                      </div>
                      <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png" alt="logo" />
                    </div>
                    <div className="pt-1">
                      <h1 className="font-light">Número tarjeta</h1>
                      <p className="font-medium tracking-more-wider">{cardNumber}</p>
                    </div>
                    <div className="pt-6 pr-6">
                      <div className="flex justify-between">
                        <div>
                          <h1 className="font-light text-xs">Válido</h1>
                          <p className="font-medium tracking-wider text-sm">{expDate}</p>
                        </div>
                        <div>
                          <h1 className="font-light text-xs">CVV</h1>
                          <p className="font-bold tracking-more-wider text-sm">{ccvNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-4">
            <div className="m-2">
              <button className="bg-stone-500 text-white p-2 rounded hover:bg-red-500 w-50">Añadir Tarjeta</button>
            </div>
            <div className="m-2">
              <button onClick={() => setMostrarFormulario(false)} className="bg-stone-500 text-white p-2 rounded hover:bg-red-500 w-50">Cancelar</button>
            </div>
          </div>
        </form>
      </main>
    )}
    </div>

<footer><Footer/></footer>
</div>
    
  )
}

export default Tarjetas
