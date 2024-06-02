import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import LateralNavP from '../components/LateralNavP'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Conexiones = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const [conexionLOL, setConexionLOL] = useState([]);
    const [conexionValorant, setConexionValorant] = useState([]);
    const {usuario, obtenerUsuario, obtenerConexionLOL, obtenerConexionValorant, borrarUsuario} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
      obtenerConexionLOL: state.obtenerConexionLOL,
      obtenerConexionValorant: state.obtenerConexionValorant,
      borrarUsuario: state.borrarUsuario
    }))
    async function fetchData() {
      try {
        obtenerUsuario();
        const conexionLOLData = await obtenerConexionLOL(usuario.id);
        const conexionValorantData = await obtenerConexionValorant(usuario.id);
        setConexionLOL(conexionLOLData);
        setConexionValorant(conexionValorantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    useEffect(() => {
      fetchData();
    }, []);
  return (
    <div className="pt-20">
            <Header />
            <LateralNavP />

            <div className="flex flex-wrap justify-center gap-8 p-4">
                <div className="bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(../storage/imagenes/background-lol.jpg)`, width: '728px', height: '410px' }}>
                    <form className="w-full h-full flex flex-col justify-center items-center bg-opacity-70 bg-gray-800 rounded">
                        <h2 className="text-white text-2xl mb-4"><b>League Of Legends</b></h2>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                            <input
                                type="text"
                                value={conexionLOL.riotID || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Rango:</label>
                            <input
                                type="email"
                                value={conexionLOL.rango || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Posición:</label>
                            <input
                                type="email"
                                value={conexionLOL.posicion || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                    </form>
                </div>
                <div className="bg-cover bg-center  rounded-2xl mb-20" style={{ backgroundImage: `url(../storage/imagenes/background-valorant.jpg)`, width: '728px', height: '410px' }}>
                    <form className="w-full h-full flex flex-col justify-center items-center bg-opacity-70 bg-gray-800 rounded">
                        <h2 className="text-white text-2xl mb-4"><b>Valorant</b></h2>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                            <input
                                type="text"
                                value={conexionValorant.riotID || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Rango:</label>
                            <input
                                type="email"
                                value={conexionValorant.rango || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Posición:</label>
                            <input
                                type="email"
                                value={conexionValorant.posicion || ''}
                                readOnly
                                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded"
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Footer className="top-3/3"/>
        </div>
  )
}

export default Conexiones
