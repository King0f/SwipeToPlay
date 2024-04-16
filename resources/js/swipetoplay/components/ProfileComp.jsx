import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/App.css'

export default function ProfileComp() {
  const token = !!localStorage.getItem('token');
  /* debugger; */
  const LSusername = localStorage.getItem('username');
  const [usuario, setUsuario] = useState();
  const [nick, setNick] = useState();
  if (LSusername == nick || LSusername == "0") {
    if (token) {
      const obtener = async () => {
        const token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
        const response = await fetch('http://localhost/SwipeToPlay/public/api/user', { method: 'GET', headers: headers })
        const data = await response.json();
        return data;
      }
      obtener().then(data => { setUsuario(data);  
        localStorage.setItem('username', usuario?.username);
        setNick(localStorage.getItem('username')); }
      ).catch(err => { console.log(err) });
    }
  } else {
    setNick(localStorage.getItem('username'));
  }
  return (
    <>
      {token ? (<Link to="/Profile">
                <div class="username-container flex bg-slate-900 bg-opacity-45 rounded-full h-16 justify-center px-5 items-center">
                    <div class="profile-container">
                        <div class="profile-img">
                            <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" alt="Profile Picture" />
                        </div>
                        <div class="profile-description">
                        <p className="user-title">{nick }</p>
                <p className="username">@{nick }</p>
                        </div>
                    </div>
                    <div class="menu-bar">
                        <i class="bi bi-three-dots"></i>
                    </div>
                </div>
            </Link>): (<Link to="/Login">
            <div class="username-container">
                <div class="profile-container">
                    <div class="profile-img">
                        <img src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png" alt="Profile Picture" />
                    </div>
                    <div class="profile-description">
                        <p class="user-title">Iniciar sesion</p>
                    </div>
                </div>
                <div class="menu-bar">
                    <i class="bi bi-three-dots"></i>
                </div>
            </div>
      </Link>)}
    </>
  );
}
