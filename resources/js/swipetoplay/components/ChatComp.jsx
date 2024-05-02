import { chatStore } from "../store/chatStore/chatStore"
import { usuarioStore } from "../store/userStore/usuarioStore"
import "../styles/Chat.css"
import { useState, useEffect, useRef } from "react"
import MensajeComp from "./MensajeComp"
const ChatComp = ({ chatId }) => {
    const dummy = useRef()
    const [formValue, setFormValue] = useState('');
    const chat = chatId
    const {mensajes, getMensajes, guardarMensaje} = chatStore((state) => ({
        mensajes: state.mensajes,
        getMensajes: state.getMensajes,
        guardarMensaje: state.guardarMensaje
    }))
    const {usuario} = usuarioStore((state) => ({
        usuario: state.usuario,
    }))
    const photoURL = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'
    useEffect(() => {
        const fetchMessages = () => {
            getMensajes(chat, mensajes);
        };

        fetchMessages();  // Carga inicial de mensajes

        // Configurar polling
        let intervalId = setInterval(fetchMessages, 100000); // Polling cada 5 segundos

        // Ajustar el polling según la visibilidad de la pestaña
        const handleVisibilityChange = () => {
            if (document.hidden) {
                clearInterval(intervalId); // Detener polling cuando la pestaña no es visible
            } else {
                fetchMessages(); // Cargar mensajes al volver a la pestaña
                intervalId = setInterval(fetchMessages, 100000); // Reanudar polling
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
        
        
    }, [getMensajes, chat, chatId])
    useEffect(() => {
        dummy.current.scrollIntoView({behavior: 'smooth'});
    },[mensajes])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValue.trim()) {
            await guardarMensaje(chat, usuario.id, formValue, usuario.username);
            await getMensajes(chat);
            setFormValue('');
            dummy.current.scrollIntoView({behavior: 'smooth'});
        }
    }
    return (
        <div className="chatApp">
        <section>
        <main className="chatmain">
        {mensajes && mensajes.map((msg, index) => (
            <MensajeComp key={msg.id || index} mensaje={msg} User ={usuario} photoURL={photoURL}/>
        ))} 
        <div ref={dummy}></div>
        </main>
        <form onSubmit={handleSubmit} className="chatform">
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} className="chatinput"></input> 
            <button type="submit" className="chatbutton"> 📩 </button>
        </form>
        </section>
        </div>
    )
}

export default ChatComp