import { create } from "zustand";
import { apiStore } from "../apiStore/apiStore";
export const usuarioStore = create((set) => ({
  usuario: [],
  usuarioID: [],
  usuariosSwipe: [[]],
  resetTimer: [],
  tarjetas: [],
  setear: (user) => {
    set(() => ({ usuario: user }))
  },
  setUsuariosSwipe: (nuevosUsuarios) => {
    set(() => ({ usuariosSwipe: nuevosUsuarios }))
  },
  obtenerUsuarioById: async (id) => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/user/${id}`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  obtenerUsuario: async () => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/user`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      set({ usuario: data });
    } catch (err) {
      console.error(err);
    }
  },
  guardarFotoPerfil: async (file) => {
    const localhost = apiStore.getState().localhost;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const url = `${localhost}/api/subirImagen`;
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    set({ usuario: data });
  },
  obtenerUsuariosSwipe: async (usersSwipe) => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const payload = {
        usersSwipe: usersSwipe,
      };
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/userSwipe`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ usuariosSwipe: data });
    } catch (err) {
      console.error(err);
    }
  },
  obtenerConexion: async (id) => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/obtenerConexion/${id}`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  obtenerConexionLOL: async (id) => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/obtenerConexionLOL/${id}`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  obtenerConexionValorant: async (id) => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/obtenerConexionValorant/${id}`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  actionSwipe: async (idUser, action, juego) => {
    const localhost = apiStore.getState().localhost;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    if (action == 1) {
      const payload = {
        idUser: idUser,
        juego: juego
      };

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/handleLike`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ usuario: data });
    } else if (action == 2) {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/handlePass`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      set({ usuario: data });
    } else {
      throw new Error('Elija una opcion valida.');
    }

  },
  actionSuperlike: async (idUser, juego) => {
    const localhost = apiStore.getState().localhost;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const payload = {
      idUser: idUser,
      juego: juego
    };
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    const response = await fetch(`${localhost}/api/handleSuperlike`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    set({ usuario: data });
  },
  swipesResetTimer: async () => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      });
      const response = await fetch(`${localhost}/api/timerReset`, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      set({ resetTimer: data });
    } catch (err) {
      console.error(err);
    }
  },
  obtenerTarjetas: async () => {
    try {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
      const response = await fetch(`${localhost}/api/tarjetas`, { method: 'GET', headers: headers })
      const data = await response.json();
      set({ tarjetas: data });
    } catch (err) {
      console.error(err);
    }
  },
  guardarTarjeta: async (titular, n_tarjeta, f_caducidad, cvv) => {
    try {
      const localhost = apiStore.getState().localhost;
      const tarjeta = {
        titular: titular,
        n_tarjeta: n_tarjeta,
        f_caducidad: f_caducidad,
        cvv: cvv
      }
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
      const response = await fetch(`${localhost}/api/newTarjeta`, { method: 'POST', headers: headers, body: JSON.stringify(tarjeta) });
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  },
  modificarUsuario: async (username, email, phone, descripcion) => {
    try {
      const localhost = apiStore.getState().localhost;
      const user = {
        username: username,
        email: email,
        phone: phone,
        descripcion: descripcion
      }
      const token = localStorage.getItem('token');
      const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
      const response = await fetch(`${localhost}/api/modificarUsuario`, { method: 'POST', headers: headers, body: JSON.stringify(user) });
      const data = await response.json();
      set({ usuario: data });
    } catch (err) {
      console.error(err);
    }
  },
  procesarCompra: async (action) => {
    const localhost = apiStore.getState().localhost;
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const payload = {
      action: action,
    };
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    const response = await fetch(`${localhost}/api/procesarCompra`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    set({ usuario: data });
  },
  borrarUsuario: () => {
    set(() => ({ usuario: [] }))
  },
}))
