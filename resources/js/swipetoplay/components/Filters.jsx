import React, { useState } from 'react';
import filters from '../../../assets/ajustes-deslizadores.svg';
<<<<<<< Updated upstream
import { apiStore } from '../store/apiStore/apiStore';

=======
import '../styles/App.css';
>>>>>>> Stashed changes
const Filters = () => {
    const path = apiStore.getState().basename;
    const [juego, setJuego] = useState('Lol');

  const handleJuegoChange = (event) => {
    setJuego(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setJuegoSeleccionado(juego);
  };
  return (
<<<<<<< Updated upstream
    <div className="h-screen w-60 bg-slate-300 p-5">
      <div className='bg-gray-500 w-8 rounded-full mt-5 m-auto p-1'><img src={filters} className=''/></div>
=======
    <div className="filters-container">
      <div className="mt-12 ml-5 rounded-full h-3/4 w-16 bg-slate-300 p-5 filters-wrapper block m-auto">
        <div className='bg-gray-500 rounded-full p-1'><img src={filters} width={16} className='block m-auto'/></div>
>>>>>>> Stashed changes
      <br/>
      <br/>
      <form onSubmit={handleSubmit}>
      <label>
        <div className='flex'><p className="font-Swipe mx-2">Juego:</p>
        <select value={juego} onChange={handleJuegoChange}>
          <option value="Lol">Lol</option>
          <option value="Valorant">Valorant</option>
        </select>
        </div>
      </label>
      <br/>
      <button type="submit" className='border-2 border-red-700 p-1 rounded-md bg-white m-auto hover:bg-red-500 hover:text-black hover:border-red-950' >Filtrar búsqueda</button>
    </form>
    </div>
    </div>
  );
};

export default Filters;
