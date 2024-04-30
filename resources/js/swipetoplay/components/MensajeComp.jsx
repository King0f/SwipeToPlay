import { usuarioStore } from '../store/userStore/usuarioStore'
import {format, parseISO} from 'date-fns'
import { useState, useEffect } from "react"
const MensajeComp = ({mensaje, User}) => {
    const [mensajeClass, setMensajeClass] = useState()
    const [username, setUsername] = useState('');
    const {usuarioID,obtenerUsuarioById} = usuarioStore((state) => ({
        obtenerUsuarioById: state.obtenerUsuarioById,
        usuarioID: state.usuarioID
      }))
      useEffect(() => {
        let comprobar = false;
        if(User.id == mensaje.id_usuario){
            comprobar = true
        }
        comprobar === true ? setMensajeClass('sent') : setMensajeClass('received');
        console.log(usuarioID)
      }, []);
      const obtenerUsername = () => {
        obtenerUsuarioById(mensaje.id_usuario)
        return usuarioID.username
      }
    return(
        <div className={`message ${mensajeClass}`}>
            <p>{obtenerUsername()}</p>
            <p className="chatp">{mensaje.mensaje}</p>
            <p style={{ color: 'lightgray', fontSize: '0.8rem', textAlign: 'right' }}>{mensaje.created_at ? format(parseISO(mensaje.created_at), 'HH:mm') : ''}</p>
        </div>
    )
}

export default MensajeComp