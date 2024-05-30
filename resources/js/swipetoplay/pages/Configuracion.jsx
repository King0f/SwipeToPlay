import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Configuracion = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const [conexionLOL, setConexionLOL] = useState([]);
    const [conexionValorant, setConexionValorant] = useState([]);
    const {usuario, obtenerUsuario, obtenerConexionLOL, obtenerConexionValorant} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
      obtenerConexionLOL: state.obtenerConexionLOL,
      obtenerConexionValorant: state.obtenerConexionValorant,
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
    const handleCerrarSesion = () => {
      localStorage.removeItem('token');
      borrarUsuario();
      navigate(path);
    };
    const handleChangeValorant = (event) => {handleChangePosValorant
        setConexionValorant({
          ...conexionValorant,
          rango: event.target.value,
        });
    };
    const handleChangePosValorant = (event) => {
        setConexionValorant({
          ...conexionValorant,
          posicion: event.target.value,
        });
    };
    const handleChangeUserValorant = (event) => {
        setConexionValorant({
          ...conexionValorant,
          riotID: event.target.value,
        });
    };
    const handleChangeLol = (event) => {
        setConexionLOL({
          ...conexionLOL,
          rango: event.target.value,
        });
    };
    const handleChangePosLol = (event) => {
        setConexionLOL({
          ...conexionLOL,
          posicion: event.target.value,
        });
    };
    const handleChangeUserLol = (event) => {
        setConexionLOL({
          ...conexionLOL,
          riotID: event.target.value,
        });
    };
    const handleSubmitLol = async (e) => {
        e.preventDefault();
        const localhost = apiStore.getState().localhost;
        const conexion = {
            id: conexionLOL.id,
            riotID: conexionLOL.riotID,
            juego: conexionLOL.juego,
            rango: conexionLOL.rango,
            posicion: conexionLOL.posicion,
            id_user: conexionLOL.id_user
        }
        const token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
        const response = await fetch(`${localhost}/api/modConexion`, { method: 'POST', headers: headers, body: JSON.stringify(conexion) });
        const data = await response.json();
      };
  return (
    <div className="pt-20">
            <Header />
            <div className="fixed top-1/3 left-5 transform -translate-y-1/2 flex flex-col p-2 border-2 border-red-300 rounded items-center">
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

            <div className="flex flex-wrap justify-center gap-8 p-4">
                <div className="bg-cover bg-center rounded-2xl" style={{ backgroundImage: `url(../storage/imagenes/background-lol.jpg)`, width: '728px', height: '410px' }}>
                    <form className="w-full h-full flex flex-col justify-center items-center bg-opacity-70 bg-gray-800 rounded">
                        <h2 className="text-white text-2xl mb-4"><b>League Of Legens</b></h2>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                            <input
                                type="text"
                                value={conexionLOL.riotID || ''}
                                onChange={handleChangeUserLol}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Rango:</label>
                            <select 
                                value={conexionLOL.rango}
                                onChange={handleChangeLol}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded">
                                <option value="Hierro">Hierro</option>
                                <option value="Bronce">Bronce</option>
                                <option value="Plata">Plata</option>
                                <option value="Oro">Oro</option>
                                <option value="Platino">Platino</option>
                                <option value="Esmeralda">Esmeralda</option>
                                <option value="Diamante">Diamante</option>
                                <option value="Master">Master</option>
                                <option value="GrandMaster">GrandMaster</option>
                                <option value="Challenger">Challenger</option>
                            </select>
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Posición:</label>
                            <select 
                                value={conexionLOL.posicion}
                                onChange={handleChangePosLol}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded">
                                <option value="Top">Top</option>
                                <option value="Jungla">Jungla</option>
                                <option value="Medio">Medio</option>
                                <option value="AD Carry">AD Carry</option>
                                <option value="Soporte">Soporte</option>
                            </select>
                        </div>
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-red-500 w-50" onSubmit={handleSubmitLol}>Modificar conexión</button>
                    </form>
                </div>
                <div className="bg-cover bg-center  rounded-2xl mb-10" style={{ backgroundImage: `url(../storage/imagenes/background-valorant.jpg)`, width: '728px', height: '410px' }}>
                    <form className="w-full h-full flex flex-col justify-center items-center bg-opacity-70 bg-gray-800 rounded">
                        <h2 className="text-white text-2xl mb-4"><b>Valorant</b></h2>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                            <input
                                type="text"
                                value={conexionValorant.riotID || ''}
                                onChange={handleChangeUserValorant}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Rango:</label>
                            <select 
                                value={conexionValorant.rango}
                                onChange={handleChangeValorant}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded">
                                <option value="Hierro">Hierro</option>
                                <option value="Bronce">Bronce</option>
                                <option value="Plata">Plata</option>
                                <option value="Oro">Oro</option>
                                <option value="Platino">Platino</option>
                                <option value="Esmeralda">Esmeralda</option>
                                <option value="Diamante">Diamante</option>
                                <option value="Inmortal">Inmortal</option>
                                <option value="Radiant">Radiant</option> 
                            </select>
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Posición:</label>
                            <select 
                                value={conexionValorant.posicion}
                                onChange={handleChangePosValorant}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded">
                                <option value="Duelista">Duelista</option>
                                <option value="Iniciador">Iniciador</option>
                                <option value="Centinela">Centinela</option>
                                <option value="Controlador">Controlador</option>
                            </select>
                        </div>
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-red-500 w-50">Modificar conexión</button>
                    </form>
                </div>
                <div className="bg-cover bg-center rounded-2xl mb-20" style={{ backgroundImage: `url(../storage/imagenes/background-perfil.jpg)`, width: '728px', height: '410px' }}>
                    <form className="w-full h-full flex flex-col justify-center items-center bg-opacity-70 bg-gray-800 rounded">
                        <h2 className="text-white text-2xl mb-4"><b>Perfil</b></h2>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Nombre de usuario:</label>
                            <input
                                type="text"
                                value={usuario.username}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Email:</label>
                            <input
                                type="email"
                                value={usuario.email}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded"
                            />
                        </div>
                        <div className="mb-4 w-3/4">
                            <label className="block text-white text-sm font-bold mb-2">Teléfono:</label>
                            <input
                                type="text"
                                value={usuario.phone}
                                className="w-full px-3 py-2 text-gray-900 bg-gray-200 rounded"
                            />
                        </div>
                        <button className="bg-gray-500 text-white p-2 rounded hover:bg-red-500 w-50">Modificar perfil</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default Configuracion
