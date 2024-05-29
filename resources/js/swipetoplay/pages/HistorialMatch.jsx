import React, { useEffect, useState, useRef } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header'
import {useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const HistorialMatch = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const {usuario, obtenerUsuario} = usuarioStore((state) => ({
      usuario: state.usuario,
      obtenerUsuario: state.obtenerUsuario,
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
      navigate(path);
    };
    const matches = [
        { id: 1, fechaCreacion: '2024-05-01', usuario: 'Usuario1', juego: 'Juego1' },
        { id: 2, fechaCreacion: '2024-05-02', usuario: 'Usuario2', juego: 'Juego2' },
        { id: 3, fechaCreacion: '2024-05-03', usuario: 'Usuario3', juego: 'Juego3' },
      ];
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
            <div className="flex justify-center items-center min-h-3.5 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(../storage/imagenes/background-historialmatch.jpg)` }}>
                <div className="bg-white bg-opacity-80 rounded-md shadow-lg p-6 m-4 max-w-4xl w-full">
                <table className="min-w-full divide-y divide-gray-200 md">
                    <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de creación</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juego</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {matches.map((match) => (
                        <tr key={match.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{match.fechaCreacion}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{match.usuario}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{match.juego}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            </div>
            <Footer />
        </div>
  )
}

export default HistorialMatch
