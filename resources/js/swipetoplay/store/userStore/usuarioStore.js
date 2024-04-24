import { create } from "zustand";

export const usuarioStore = create((set) => ({
    usuario: [],
    setear: (user) =>{
        set(() => ({ usuario: user }))
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