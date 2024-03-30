import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import Footer from './Footer';

const SelecImg = () => {
    const navigate = useNavigate();
  /* La línea `const [formData, setFormData] = useState({ nombre de usuario: '', contraseña: '', });`
  está usando el gancho `useState` en React para crear una variable de estado llamada `formData` y
  una función llamada ` setFormData` para actualizar el estado. */
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  /**
   * La función handleChange actualiza el estado de formData estableciendo el valor del campo de
   * entrada de destino en la propiedad correspondiente en el objeto formData.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * La función handleSubmit envía una solicitud POST a un punto final de API de inicio de sesión con
   * credenciales de usuario y registra el token resultante.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email:formData.username,
      password:formData.password
    }
    /* La constante `opciones` es un objeto que contiene la configuración para la solicitud HTTP. En
    este caso, se utiliza para una solicitud POST. */
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };

    const url = '/api/loginUser';
    const response = await fetch(url, options);
    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = '/restaurante/';
  };


  return (
    <>
        <form onSubmit={handleSubmit}>
            <input type="file" name='file' id='file'/>
          <button type="submit">
            Subir Imagen
          </button>
        </form>
    </>
  );
};

export default SelecImg;
