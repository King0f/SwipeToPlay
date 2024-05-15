import React, { useEffect, useState } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import { Link, useNavigate } from "react-router-dom";
import '../styles/App.css'
import { apiStore } from "../store/apiStore/apiStore";

export default function ProfileComp() {
  const token = !!localStorage.getItem('token');
  const path = apiStore.getState().basename;
  /* debugger; */
  const {usuario, obtenerUsuario} = usuarioStore((state) => ({
    usuario: state.usuario,
    obtenerUsuario: state.obtenerUsuario,
  }))
  useEffect(() => {
    obtenerUsuario();
  }, []);
  return (
    <>
      {token ? (<Link to={path + "/Profile"}>
                <div className="username-container flex bg-slate-900 bg-opacity-45 rounded-full h-16 justify-center px-5 items-center">
                    <div className="profile-container">
                        <div className="profile-img">
                        <img src={usuario.imagen ? usuario.imagen : "https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"} alt="Profile Picture" />
                        </div>
                        <div className="profile-description">
                        <p className="user-title">{usuario.username }</p>
                <p className="username">@{usuario.username }</p>
                        </div>
                    </div>
                    <div className="menu-bar">
                        <i className="bi bi-three-dots"></i>
                    </div>
                </div>
            </Link>): (<Link to={path + "/Login"}>
            <div className="username-container">
                <div className="profile-container">
                    <div className="profile-img">
                        <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" alt="Profile Picture" />
                    </div>
                    <div className="profile-description">
                        <p className="user-title">Iniciar sesion</p>
                    </div>
                </div>
                <div className="menu-bar">
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
      </Link>)}
    </>
  );
}
