import { Link} from "react-router-dom";
import '../styles/App.css'
import Header from "../components/Header";

function Testing(){
    return (
        <div className="text-white">
            <Header/>
            
            <h1>Prueba</h1>
            <Link to="/SubirImg">
            <button>Prueba subir imagen</button>
            </Link><br />
            <Link to="/RegisterTesting" className='text-white'>
                <button>Register Testing</button>
            </Link>
        </div>
    )
}
export default Testing
