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
      <header className="App-header text-2xl text-white mt-20">
        <h1>Swipe to Play</h1>
        <p>Click on the button to start the game</p>
      </header>
      <Link to={`/Testing`} className='text-white'>
        <button>Paginas de testeo</button>
      </Link>
    </div>
    </>
  )
}

export default Principal
