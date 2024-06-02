import React, { useEffect, useState } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import { Link, useNavigate } from "react-router-dom";
import '../styles/App.css'
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons'

export default function LateralNavP() {
  const navigate = useNavigate();
  const path = apiStore.getState().basename;
  const {usuario, obtenerUsuario, borrarUsuario} = usuarioStore((state) => ({
    usuario: state.usuario,
    obtenerUsuario: state.obtenerUsuario,
    borrarUsuario: state.borrarUsuario
  }))
  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    borrarUsuario();
    navigate(path);
  };
  return (
    <>
      <div className="bg-white fixed top-1/3 left-5 transform -translate-y-1/2 flex flex-col p-2 border-2 border-red-300 rounded items-center">
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
    </>
  );
}
