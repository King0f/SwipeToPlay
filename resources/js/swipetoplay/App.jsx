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
import RiotUser from './pages/RiotUser.jsx';
import ChatComp from './components/ChatComp.jsx';

function App() {
  return (
    <>
    <Router basename="/SwipeToPlay/public">
      <Routes>
        <Route path='/' element={<Principal />}></Route>
        <Route path='/Testing' element={<Testing />}></Route>
        <Route path='/SubirImg' element={<SubirImg />}></Route>
        <Route path='/Register' element={<RegisterTesting />}></Route>
        <Route path='/Login' element={<LoginTesting />}></Route>
        <Route path='/Swipe' element={<Swipe />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
        <Route path='/RiotUser' element={<RiotUser />}></Route>
        <Route path='/Chat' element={<ChatComp />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
