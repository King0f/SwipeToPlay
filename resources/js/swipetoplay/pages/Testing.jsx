import { Link} from "react-router-dom";
import '../styles/App.css'
import Header from "../components/Header";

function Testing(){
    return (
        <div className="text-white mt-10">
            <Header/>
            <h1 className="text-black">Prueba</h1>
            <Link to="/SubirImg">
            <button className="text-black">Prueba subir imagen</button>
            </Link><br />
            <Link to="/Register" className='text-black'>
                <button className="text-black">Register Testing</button>
            </Link>
        </div>
    )
}
export default Testing
