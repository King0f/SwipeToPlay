import { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import '../styles/App.css'
import Header from '../components/Header';

function Principal() {
  const [count, setCount] = useState(0)



  return (
    <>
    <Header />
    <div className="App">
        <h1 className='text-white'>Swipe to Play</h1>
        <p className='text-white'>Click on the button to start the game</p>
        <Link to={`/Testing`} className='text-white'>
        <button>Paginas de testeo</button>
      </Link>
      <br/>
      <Link to={`/Swipe`} className='text-white'>
        <button>Paginas de tinder</button>
      </Link>
    </div>
    </>
  )
}

export default Principal
