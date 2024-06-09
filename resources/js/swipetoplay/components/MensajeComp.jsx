import { format, parseISO } from 'date-fns'
import { useState, useEffect } from "react"

const MensajeComp = ({ mensaje, User, photoURL, urlReceived }) => {
  const [mensajeClass, setMensajeClass] = useState('');
  const [fotito, setFotito] = useState('');
  useEffect(() => {
    if (User.id === mensaje.id_usuario) {
      setMensajeClass('sent');
      setFotito(photoURL);
    } else {
      setMensajeClass('received');
      setFotito(urlReceived);
    }
  }, []);
  return (
    <div className={`message ${mensajeClass}`}>
      <img src={fotito} className="chatimg bg-white" />
      <div className="message-info">
        <p className="chatp">{mensaje.mensaje}</p>
        <p className={`hora${mensajeClass}`}>{mensaje.created_at ? format(parseISO(mensaje.created_at), 'HH:mm') : ''}</p>
      </div>
    </div>
  )
}

export default MensajeComp