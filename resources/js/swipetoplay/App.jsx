import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal.jsx'
import Testing from './pages/Testing.jsx'
import './styles/App.css'
import SubirImg from './testing/SubirImg.jsx';
import RegisterTesting from './testing/RegisterTesting.jsx';
import LoginTesting from './testing/LoginTesting.jsx';
import Swipe from './pages/Swipe.jsx';
import Profile from './pages/Profile.jsx';	

function App() {
  return (
    <>
    <Router basename="/SwipeToPlay/public">
      <Routes>
        <Route path='/' element={<Principal />}></Route>
        <Route path='/Testing' element={<Testing />}></Route>
        <Route path='/SubirImg' element={<SubirImg />}></Route>
        <Route path='/RegisterTesting' element={<RegisterTesting />}></Route>
        <Route path='/LoginTesting' element={<LoginTesting />}></Route>
        <Route path='/Swipe' element={<Swipe />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
