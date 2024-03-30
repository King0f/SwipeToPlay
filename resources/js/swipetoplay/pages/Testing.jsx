import { Link} from "react-router-dom";
import '../styles/App.css'

function Testing(){
    return (
        <div className="text-white text-2xl">
            <h1>Prueba</h1>
            <Link to="/LoginTesting" className='text-white'>
                <button>Login Testing</button>
            </Link><br />
            <Link to="/SubirImg">
            <button>Prueba subir imagen</button>
            </Link>
        </div>
    )
}
export default Testing
