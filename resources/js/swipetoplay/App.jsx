import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './pages/Principal.jsx'
import './styles/App.css'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Swipe from './pages/Swipe.jsx';
import Profile from './pages/Profile.jsx';	
import Tarjetas from './pages/Tarjetas.jsx';	
import Conexiones from './pages/Conexiones.jsx';
import Configuracion from './pages/Configuracion.jsx';
import HistorialMatch from './pages/HistorialMatch.jsx';
import RiotUser from './pages/RiotUser.jsx';
import Chats from './pages/Chats.jsx';
import { apiStore } from './store/apiStore/apiStore.js'
import Comprar from './pages/Comprar.jsx';
import Games from './pages/Games.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

function App() {
  const path =  apiStore.getState().basename;
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route path={path} element={<Principal />}></Route>
        <Route path={path + '/Register'} element={<Register />}></Route>
        <Route path={path + '/Login'} element={<Login />}></Route>
        <Route path={path + '/Swipe'} element={<Swipe />}></Route>
        <Route path={path + '/Games'} element={<Games />}></Route>
        <Route path={path + '/Profile'} element={<Profile />}></Route>
        <Route path={path + '/Tarjetas'} element={<Tarjetas />}></Route>
        <Route path={path + '/Conexiones'} element={<Conexiones />}></Route>
        <Route path={path + '/Configuracion'} element={<Configuracion />}></Route>
        <Route path={path + '/HistorialMatch'} element={<HistorialMatch />}></Route>
        <Route path={path + '/RiotUser'} element={<RiotUser />}></Route>
        <Route path={path + '/Chat'} element={<Chats />}></Route>
        <Route path={path + '/ComprarPremium'} element={<Comprar product="Suscripción Premium" precio="4.99€/Mes"/>}></Route>
        <Route path={path + '/ComprarDeluxe'} element={<Comprar product="Suscripción Deluxe" precio="9.99€/Mes"/>}></Route>
      </Routes>
    </>
  )
}

export default App
