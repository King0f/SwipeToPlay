import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import LateralNavP from '../components/LateralNavP'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";


const Tarjetas = () => {
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null);
    const path = apiStore.getState().basename;
    const [actualizar, setActualizar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [ccvNumber, setCcvNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [tarjetas, setTarjetas] = useState();
    useEffect(() => {
      const obtenerTarjetas = async () => {
          const localhost = apiStore.getState().localhost;
          const token = localStorage.getItem('token');
          const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
          const response = await fetch(`${localhost}/api/tarjetas`, { method: 'GET', headers: headers })
          const data = await response.json();
          return data;
      }
      obtenerTarjetas().then(data => { setTarjetas(data) }).catch(err => { console.log(err) });
    }, [actualizar])
    const {borrarUsuario} = usuarioStore((state) => ({
      borrarUsuario: state.borrarUsuario
    }))
    const handleCardClick = (id) => {
      setSelectedCardId(id);
      setShowPopup(true);
    };
    const handleDelete = async () => {
        const localhost = apiStore.getState().localhost;
        const token = localStorage.getItem('token');
        const tarjeta = {
          id: selectedCardId
        }
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`});
        const response = await fetch(`${localhost}/api/delTarjeta`, { method: 'POST', headers: headers, body: JSON.stringify(tarjeta) })
        const data = await response.json();
        setActualizar(!actualizar);
        setShowPopup(false);
    };
    const handleCancel = () => {
      setShowPopup(false);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const localhost = apiStore.getState().localhost;
      const tarjeta = {
          titular: cardName,
          n_tarjeta: cardNumber,
          f_caducidad: expDate,
          cvv: ccvNumber
      }
      console.log(tarjeta)
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
      const response = await fetch(`${localhost}/api/newTarjeta`, { method: 'POST', headers: headers, body: JSON.stringify(tarjeta) });
      const data = await response.json();
      setActualizar(!actualizar);
      setMostrarFormulario(false);
    };

  return (
    <>
    <div className="min-h-[52.4vh]">
      <Header />
      <div className="flex w-full p-2 justify-center">
      <LateralNavP />
      </div>
      <div className="bg-white flex flex-wrap justify-center gap-8 mr-20 ml-20 mb-40">
      {tarjetas?.map((tarjeta) => (
        <div key={tarjeta.id} className="w-96 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110 cursor-pointer"
        onClick={() => handleCardClick(tarjeta.id)}>
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p>¿Deseas eliminar esta tarjeta?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Sí
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
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
      </div>
      <Footer className="w-full mt-auto"/>
    </>
  )
}

export default Tarjetas
