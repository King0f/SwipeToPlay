import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const SubirImg = () => {
  debugger
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    file: null, // Cambia '' a null para almacenar el archivo
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0], // Accede al archivo seleccionado
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      body: formData.file, // Utiliza el archivo directamente como cuerpo de la solicitud
    };

    const url = 'http://localhost/SwipeToPlay/public/api/subirImagen';
    const response = await fetch(url, options);
    const data = await response.json();
    navigate('/'); // Redirige al inicio usando navigate
  };

  return (
    <>
      <Header />
      <div className='font-bold font-Swipe '>
        <form className='text-red-400 mt-20' encType='multipart/form-data' onSubmit={handleSubmit}>
          <input type="file" name='file' id='file' accept='image/*' onChange={handleChange} /><br />
          <button type="submit">
          </button>
        </form>
      </div>
    </>
  );
};

export default SubirImg;
