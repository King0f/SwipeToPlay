import { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import '../styles/App.css'
import Header from '../components/Header';
import { riotStore } from '../store/riotStore/riotStore';

    function Principal() {
    /* const {summoner, obtenerDatosInvocador} = riotStore((state) => ({
        summoner: state.summoner,
        obtenerDatosInvocador: state.obtenerDatosInvocador,
    }))
    useEffect(() => {
        obtenerDatosInvocador("SalmorejoKing/EUW", "europe");
      }, []); */


  return (
    <>
    <Header />
    <div className="App mt-10">
        <h1 className='text-black'>Swipe to Play</h1>
        <p className='text-black'>Click on the button to start the game</p>
        <Link to={`/Testing`} className='text-black'>
        <button>Paginas de testeo</button>
      </Link>
      <br/>
      <Link to={`/Swipe`} className='text-black'>
        <button>Paginas de tinder</button>
      </Link>
      <br/>
      <Link to={'/Chat'} className='text-black'>
        <button>Chats</button>
      </Link>
    </div>
    {/* {summoner && summoner.map((sum, index) => (
            <p>{sum[index]}</p>
        ))} */}
    </>
  )
}

export default Principal
