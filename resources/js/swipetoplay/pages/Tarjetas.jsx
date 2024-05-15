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

const Tarjetas = () => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false)
    const path = apiStore.getState().basename;
    const {usuario, obtenerUsuario, guardarFotoPerfil} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
      guardarFotoPerfil: state.guardarFotoPerfil
    }))
    useEffect(() => {
      obtenerUsuario();
    }, []);
    const home = () => {
        navigate(path);
    };
    const fileInputRef = useRef(null);

    // Función para abrir el selector de archivos
    const handleEditPictureClick = () => {
      fileInputRef.current.click();
    };

    // Función para manejar cuando un archivo es seleccionado
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log(file)
      if (file) {
        guardarFotoPerfil(file); // Suponiendo que esta función maneja la actualización
      }
    };
    const handleCerrarSesion = () => {
      localStorage.removeItem('token'); // Eliminar el token del localStorage
      navigate(path);
    };
    const [cardNumber, setCardNumber] = useState('4256 4256 4256 4256');
    const [expDate, setExpDate] = useState('12/24');
    const [ccvNumber, setCcvNumber] = useState('342');
    const [cardName, setCardName] = useState('John Doe');
    const [showBack, setShowBack] = useState(false);

    const toggleBackCard = () => {
      setShowBack(!showBack);
    };
  return (
    <div>
    <div className='bg-red-500 rounded-full w-6 p-1 m-5 hover:cursor-pointer' onClick={home}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHUlEQVR4nO2cT4hNURzHPzNi/J+MhRTSbCwsSclC/mQjC9L4s1PW0iiEhZ2ZDGFKbERZoDSRP8WCZK0s/EkUZYaYiUgoHN3m2EzzrvveO/ecc+/9fupXr/d63fs+79fv/O4591wQQgghhBBCCCGEEI3SBhwDPgIjwHFgonS6l3wLMGOiT6Lzl2xsdgsHTAKu15D8L4QHyUaW/Ug2Eu1HspFoP5KNRPuRbCTaj2Qj0X4kG4n2I9lItB/JRqL9SDYS7Ueykej6J4gajRHgFfAIuAdcA/qBvcB2YAXQUaU/JA/Jpo4YAu7YqdXNwBxKSGjJpkY8B84CG4ApFJxYJZsx8Q0YALrsOReKokg249T9U8BiKthdmEDx0JaWKClqJpuUuA8sIzJ6IhBjcog/wGVgHpHwLgIpJueBcx8wIbTooQhkGA/xAJgfUvSRCCQYTzEccrAs42Bo/lO7D0g23oSfD3WbWll6aVNH3AAmh5BdtTJi7O8NchlfxcweCNX+VTGzTxKIKmb2zlCyXWd2B9AJLAFWAxuBHcBu4IQdnJ4BPwKJTo67tAyys9IKLABWAd3AVY9XsE9DdSIuZTfLQru2eBp4m6PsXgIS2w00rbYEHQZeOhb92y4UU9TMzosWYDlwDvjuSPaT0Mtkzcj2wWzgkJ1Aalb2LgLTqGyfzAAOAl+bEP0emEYBZYdgLnDBzto1Ins/EVCkrRXrgDcNiP4EzCICirRZaCZwpQHZe4iErGUkBlrsGmI9peSF/V5hZMfE1jov9dcQEW0psj8QH+uBnxlFJyWHIsg+SpxsAn5lEJ38Ie1EKLvP9qHD9pESMT9GojtjVm8LfaJl4GIG0ZdCn2QZaM/QZ38JPf9RFtZmaPtWhj7JqpSQZP5EOFpcSOuvk45KOKI/RfRnu+ggHNBpV1lqyU6yXjjidoro5IpSOKIrRXSyAVU4YnrK+uMZVwcRo9ytIfqm/VzkvJHqsasDiFG21BD92n4uHLGohuhkRlI4ZGrK3LRwzOA4opP7/oSHATHZMihyuJ2ix2b2oH2dvCeEEEIIIYQQQghB2fkLwbeDtVPAFoUAAAAASUVORK5CYII="/></div>
        <div className='flex w-full'>
          <div class="flex flex-col p-2 border-2 border-red-300 rounded">
            <Link to={path + "/Profile"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='user'></box-icon>
            </button></Link>
            <Link to={path + "/Tarjetas"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='credit-card' ></box-icon>
            </button></Link>
            <Link to={path + "/Conexiones"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='link-alt' ></box-icon>
            </button></Link>
            <Link to={path + "/Condiguracion"}>
            <button class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='cog' ></box-icon>
            </button></Link>
            <button onClick={handleCerrarSesion} class="flex p-2 hover:bg-red-400 rounded">
              <box-icon name='log-out'></box-icon>
            </button>
          </div>
        </div>
        <div class="bg-white  flex justify-center items-center">
          <div class="space-y-16">
            <div class="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
            
                <img class="relative object-cover w-full h-full rounded-xl" src="https://i.imgur.com/kGkSg1v.png"/>
                
                <div class="w-full px-8 absolute top-8">
                    <div class="flex justify-between">
                        <div class="">
                            <h1 class="font-light">
                                Nombre completo
                            </h1>
                            <p class="font-medium tracking-widest">
                                Karthik P
                            </p>
                        </div>
                        <img class="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
                    </div>
                    <div class="pt-1">
                        <h1 class="font-light">
                            Número tarjeta
                        </h1>
                        <p class="font-medium tracking-more-wider">
                            4642  3489  9867  7632
                        </p>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <div class="">
                                <h1 class="font-light text-xs">
                                    Válido
                                </h1>
                                <p class="font-medium tracking-wider text-sm">
                                    11/15
                                </p>
                            </div>
    
                            <div class="">
                                <h1 class="font-light text-xs">
                                    CVV
                                </h1>
                                <p class="font-bold tracking-more-wider text-sm">
                                    ···
                                </p>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
            
        </div>
        {/* <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
          <form className="bg-white w-full max-w-3xl mx-auto px-4 lg:px-6 py-8 shadow-md rounded-md flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:pr-8 lg:border-r-2 lg:border-slate-300">
          <div className="mb-4">
            <label className="text-neutral-800 font-bold text-sm mb-2 block">Card number:</label>
            <input
              id="cardNumber"
              type="text"
              onClick={() => setShowBack(false)}
              className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
              maxLength="19"
              placeholder="XXXX XXXX XXXX XXXX"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="flex gap-x-2 mb-4">
            <div className="block">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">Exp. date:</label>
              <input
                id="expDate"
                type="text"
                onClick={() => setShowBack(false)}
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxLength="5"
                placeholder="MM/YY"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
              />
            </div>
            <div className="block">
              <label className="text-neutral-800 font-bold text-sm mb-2 block">CCV:</label>
              <input
                id="ccvNumber"
                type="text"
                onClick={() => setShowBack(true)}
                className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
                maxLength="3"
                placeholder="123"
                value={ccvNumber}
                onChange={(e) => setCcvNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-neutral-800 font-bold text-sm mb-2 block">Card holder:</label>
            <input
              id="cardName"
              type="text"
              onClick={() => setShowBack(false)}
              className="flex h-10 w-full rounded-md border-2 bg-background px-4 py-1.5 text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 undefined"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8">
          <div className="w-full max-w-sm h-56" style={{ perspective: '1000px' }}>
            <div
              id="creditCard"
              className={`relative crediCard cursor-pointer transition-transform duration-500 ${
                showBack ? 'seeBack' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
              onClick={toggleBackCard}
            >
              <div
                className="w-full h-56 m-auto rounded-xl text-white shadow-2xl absolute"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <img
                  src="https://i.ibb.co/LPLv5Sx/card-ccv.png"
                  className="w-full h-full object-contain rounded-xl"
                  alt="Card CCV"
                />
              </div>
              <div
                className="w-full h-56 m-auto absolute"
                style={{
                  backgroundColor: '#10b981',
                  borderRadius: '0.75rem',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex justify-end p-2">
                  <img
                    src="https://i.ibb.co/rp7KZrc/card-cirrus.png"
                    className="w-12 h-12 object-contain rounded-lg"
                    alt="Card Cirrus"
                  />
                </div>
                <div className="px-4">
                  <div className="flex justify-between items-center">
                    <img
                      src="https://i.ibb.co/hV0n6BQ/card-chip.png"
                      className="w-12 h-12 object-contain rounded-md"
                      alt="Card Chip"
                    />
                    <img
                      src="https://i.ibb.co/gzJ4MPM/card-mastercard.png"
                      className="w-12 h-12 object-contain rounded-lg"
                      alt="Card Mastercard"
                    />
                  </div>
                  <div className="text-white text-lg font-semibold my-4">{cardNumber}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-white text-lg font-semibold">{cardName}</div>
                    <div className="text-white text-lg font-semibold">{expDate}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main> */}
    </div>
    </div>
    
  )
}

export default Tarjetas
