import { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import './App.css'

function Reservas() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div>
      </div>
      <h1>Reservas</h1>
      <div className="card">
          <Link to='/restaurante'>Restaurante</Link>
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

export default Reservas
