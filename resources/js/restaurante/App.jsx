import { useState, useEffect } from 'react'
import {Routes, Route } from "react-router-dom";
import Principal from './Principal'
import Reservas from './Reservas'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/prueba')
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error))
  
  }, [])

  const path = 'restaurante'  

  return (
    <>
      <Routes>
        <Route path={path} element={<Principal />}></Route>
        <Route path={path +'/reservas' } element={<Reservas />}></Route>
      </Routes>
    </>
  )
}

export default App
