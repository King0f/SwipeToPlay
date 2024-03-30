import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './Principal.jsx'
import Reservas from './Reservas.jsx'

import './App.css'
import SelecImg from './SelecImg.jsx';

function App() {
  const [count, setCount] = useState(0)
/*
  useEffect(() => {
    fetch('/api/prueba')
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error))

  }, []) */

  return (
    <>
    <Router basename="/SwipeToPlay/public">
      <Routes>
        <Route path='/' element={<Principal />}></Route>
        <Route path='/reservas' element={<Reservas />}></Route>
        <Route path='/selImg' element={<SelecImg />}></Route>
      </Routes>
      </Router>
    </>
  )
}

export default App
