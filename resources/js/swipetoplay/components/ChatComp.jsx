import { chatStore } from "../store/chatStore/chatStore"
import { usuarioStore } from "../store/userStore/usuarioStore"
import "../styles/Chat.css"
import { useState, useEffect, useRef } from "react"
import MensajeComp from "./MensajeComp"
import {ToastContainer, Zoom, toast } from 'react-toastify'
const ChatComp = ({ chatId, urlReceived}) => {
    const dummy = useRef()
    const [formValue, setFormValue] = useState('');
    const chat = chatId
    const {mensajes, getMensajes, guardarMensaje} = chatStore((state) => ({
        mensajes: state.mensajes,
        getMensajes: state.getMensajes,
        guardarMensaje: state.guardarMensaje
    }))
    const {usuario, obtenerUsuario} = usuarioStore((state) => ({
        usuario: state.usuario,
        obtenerUsuario: state.obtenerUsuario
    }))
    const photoURL = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'
    useEffect(() => {
        const fetchMessages = () => {
            getMensajes(chat, mensajes);
        };

        fetchMessages();  // Carga inicial de mensajes

        // Configurar polling
        let intervalId = setInterval(fetchMessages, 2000); // Polling cada 5 segundos

        // Ajustar el polling según la visibilidad de la pestaña
        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearInterval(intervalId); // Detener polling cuando la pestaña no es visible
            } else {
                fetchMessages(); // Cargar mensajes al volver a la pestaña
                intervalId = setInterval(fetchMessages, 2000); // Reanudar polling
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
        
        
    }, [getMensajes, chat, chatId])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(usuario.lvl_premium != 2 && usuario.n_mensajes == 0){
            toast.error("0 Mensajes restantes.Necesita esperar una dia para mandar su mensaje.", {position: 'top-left', theme:'light', transition: Zoom, autoClose: 3000});
        }else{
            if (formValue.trim()) {
            await guardarMensaje(chat, usuario.id, formValue, usuario.username);
            await getMensajes(chat);
            await obtenerUsuario();
            setFormValue('');
            if (dummy.current) {
                const scrollableContainer = dummy.current.parentNode; // Asumiendo que el contenedor padre es scrollable
                const dummyPosition = dummy.current.offsetEnd; // Posición de `dummy` relativa al contenedor scrollable
                const scrollPosition = dummyPosition + dummy.current.clientHeight - scrollableContainer.clientHeight;
                scrollableContainer.scrollTo({
                  top: scrollPosition,
                  behavior: 'smooth'
                });
              }
        }}
    }
    return (
        <div className="chatApp">
            <ToastContainer pauseOnFocusLoss={false} limit={3} />
        <section>
        <main className="chatmain">
        {mensajes && mensajes.map((msg, index) => (
            <MensajeComp key={msg.id || index} mensaje={msg} User ={usuario} photoURL={usuario.imagen || photoURL} urlReceived={urlReceived}/>
        ))} 
        <div ref={dummy}></div>
        </main>
        <form onSubmit={handleSubmit} className="chatform">
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} className="chatinput rounded"></input> 
            <button type="submit" className="chatbutton rounded"> 📩 </button>
        </form>
        </section>
        </div>
    )
}

export default ChatComp