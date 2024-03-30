import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css'

const SubirImg = () => {
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
  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email:formData.username,
      password:formData.password
    }
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
  }; */


  return (
    <>
        <div className='text-white'>
            <form  className='text-white mt-20' encType='multipart/form-data'>
                <input type="file" name='file' id='file' accept='image/*'/><br />
            <button type="submit">
                Subir Imagen
            </button>
            </form>
        </div>
    </>
  );
};

export default SubirImg;
