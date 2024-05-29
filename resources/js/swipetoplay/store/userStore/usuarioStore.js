import { create } from "zustand";
import { apiStore } from "../apiStore/apiStore";
export const usuarioStore = create((set) => ({
    usuario: [],
    usuarioID: [],
    usuarioSwipe: [],
    resetTimer: [],
    tarjetas: [],
    setear: (user) =>{
        set(() => ({ usuario: user }))
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
        return data; // Devolvemos el usuario obtenido
      } catch (err) {
        console.error(err);
        // Devuelve null o maneja el error de alguna manera que permita a la llamada saber que falló
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
          set({ usuario: data }); // Actualizamos el estado directamente aquí
        } catch (err) {
          console.error(err);
          // Puedes manejar el error de alguna manera específica si lo necesitas
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
      set({ usuario: data })
    },
    obtenerUsuarioSwipe: async () => {
      try {
        const localhost = apiStore.getState().localhost;
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        });
        const response = await fetch(`${localhost}/api/userSwipe`, {
          method: 'GET',
          headers: headers
        });
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        set({ usuarioSwipe: data }); // Actualizamos el estado directamente aquí
      } catch (err) {
        console.error(err);
        // Puedes manejar el error de alguna manera específica si lo necesitas
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
        // Puedes manejar el error de alguna manera específica si lo necesitas
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
        // Puedes manejar el error de alguna manera específica si lo necesitas
      }
    },
    actionSwipe: async (idUser, action) => {
      const localhost = apiStore.getState().localhost;
      const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');
      if(action == 1){
        const payload = {
            idUser: idUser,
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
        set({usuario: data}); 
      }else if(action == 2){
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
        set({usuario: data}); 
      }else{
        throw new Error('Elija una opcion valida.');
      }
      
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
        set({ resetTimer: data }); // Actualizamos el estado directamente aquí
      } catch (err) {
        console.error(err);
        // Puedes manejar el error de alguna manera específica si lo necesitas
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
        // Puedes manejar el error de alguna manera específica si lo necesitas
      }
    },
    guardarTarjeta: async (titular,n_tarjeta,f_caducidad,cvv) => {
      try {
        const localhost = apiStore.getState().localhost;
        const tarjeta = {
            titular: titular,
            n_tarjeta: n_tarjeta,
            f_caducidad: f_caducidad,
            cvv: cvv
        }
        console.log(tarjeta)
        const token = localStorage.getItem('token');
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
        const response = await fetch(`${localhost}/api/newTarjeta`, { method: 'POST', headers: headers, body: JSON.stringify(tarjeta) });
        const data = await response.json();
      } catch (err) {
        console.error(err);
        // Puedes manejar el error de alguna manera específica si lo necesitas
      }
    }
}) )
