import { usuarioStore } from '../store/userStore/usuarioStore'
import {format, parseISO} from 'date-fns'
import { useState, useEffect } from "react"
const MensajeComp = ({mensaje, User, photoURL}) => {
    const [mensajeClass, setMensajeClass] = useState()
      useEffect(() => {
        let comprobar = false;
        if(User.id == mensaje.id_usuario){
            comprobar = true
        }
        comprobar === true ? setMensajeClass('sent') : setMensajeClass('received');
      }, []);
    return(
      <div className={`message ${mensajeClass}`}>
        <img src={photoURL} className="chatimg" />
        <div className="message-info">
            <p className="chatp">{mensaje.mensaje}</p>
            <p className={`hora${mensajeClass}`}>{mensaje.created_at ? format(parseISO(mensaje.created_at), 'HH:mm') : ''}</p>
        </div>
      </div>
    )
}

export default MensajeComp