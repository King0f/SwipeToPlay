import { create } from "zustand";

export const usuarioStore = create((set) => ({
    usuario: [],
    usuarioID: [],
    setear: (user) =>{
        set(() => ({ usuario: user }))
    },
    obtenerUsuarioById: async (id) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
  
        const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        });
        const response = await fetch(`http://localhost/SwipeToPlay/public/api/user/${id}`, {
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
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No token found');

          const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          });
          const response = await fetch('http://localhost/SwipeToPlay/public/api/user', {
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
      }
}) )
