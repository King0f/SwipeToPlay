import { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import reactLogo from '../../assets/react.svg'
import './App.css'

function Principal() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api/prueba')
    .then(respuesta => respuesta.json())
    .then(resultado => console.log(resultado))
    .catch(error => console.log(error))
  
  }, [])
  

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Restaurante </h1>
      <div className="card">
          <Link to='reservas'>Reservas</Link>
      </div>

      <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Principal
