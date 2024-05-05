import React from 'react';
import filters from '../../../assets/ajustes-deslizadores.svg';

const Filters = () => {
  return (
    <div className="h-screen w-60 bg-slate-300 p-5">
      <div className='bg-gray-500 w-8 rounded-full mt-5 m-auto p-1'><img src={filters} className=''/></div>
      <br/>
      <br/>
      <div>Filtro 2</div>
      <div>Filtro 3</div>
      <div>Filtro 4</div>
      <div>Filtro 5</div>
      <div>Filtro 6</div>
      <div>Filtro 7</div>
      <div>Filtro 8</div>
      <div>Filtro 9</div>
    </div>
  );
};

export default Filters;
