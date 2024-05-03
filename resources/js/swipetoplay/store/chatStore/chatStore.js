import { create } from "zustand";
import { apiStore } from "../apiStore/apiStore";
const {localhost} = apiStore((state) => ({
    localhost: state.localhost,
}))
export const chatStore = create((set,get) => ({
    mensajes: [],
    chats: [],
    getChats: async () =>{
        try{
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
  
            const headers = new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            });
            const response = await fetch(`${localhost}/api/obtenerChats`, {
              method: 'GET',
              headers: headers
            });
            if (!response.ok) throw new Error('Network response was not ok');
  
            const data = await response.json();
            set({ chats: data });
            
        }catch(err){
            console.error(err)
        }
    },
    setMensaje: (mensaje) =>{
        set(() => ({ mensajes: [...mensaje] }))
    },
    getMensajes: async (idChat) => {
        try{
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
  
            const headers = new Headers({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            });
            const response = await fetch(`${localhost}/api/obtenerMensajes/${idChat}`, {
              method: 'GET',
              headers: headers
            });
            if (!response.ok) throw new Error('Network response was not ok');
  
            const data = await response.json();
            const currentState = get().mensajes
            if (JSON.stringify(currentState) !== JSON.stringify(data)) {
                set({ mensajes: data });
            }
        }catch(err){
            console.error(err)
        }
    },
    guardarMensaje: async (chat,id_usuario,mensaje, username) => {
        const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
  
        const url = `${localhost}/api/guardarMensaje`;  
        const payload = {
            id_chat: chat,
            id_usuario: id_usuario,
            mensaje: mensaje,
            username: username
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) { // Verifica si la respuesta del servidor es 200-299
                    console.log("Respuesta del servidor: OK");
                } else {
                    throw new Error('Algo salió mal en la solicitud al servidor'); // Lanza un error si la respuesta no es satisfactoria
                }
            })
            .catch(error => {
                console.error("Error al guardar mensaje en la base de datos:", error);
            });
    }
}) )