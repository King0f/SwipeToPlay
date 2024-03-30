import { Link} from "react-router-dom";
import '../styles/App.css'

function Testing(){
    return ( 
        <div className="text-white text-2xl">
            <Link to="/LoginTesting" className='text-white'>
                <button>Login Testing</button>
            </Link>
        </div>
    )
}
export default Testing