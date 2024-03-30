import { Link} from "react-router-dom";
import '../styles/App.css'

function Testing(){
    return ( 
        <div className="text-white text-2xl">
            <Link to="/RegisterTesting" className='text-white'>
                <button>Register Testing</button>
            </Link>
        </div>
    )
}
export default Testing