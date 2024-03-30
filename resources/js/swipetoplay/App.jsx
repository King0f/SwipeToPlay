import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal.jsx'
import Testing from './pages/Testing.jsx'

import './styles/App.css'
import SelecImg from './pages/SelecImg.jsx';
import LoginTesting from './testing/LoginTesting.jsx';

function App() {
  return (
    <>
    <Router basename="/SwipeToPlay/public">
      <Routes>
        <Route path='/' element={<Principal />}></Route>
        <Route path='/Testing' element={<Testing />}></Route>
        <Route path='/LoginTesting' element={<LoginTesting />}></Route>
        <Route path='/selImg' element={<SelecImg />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
