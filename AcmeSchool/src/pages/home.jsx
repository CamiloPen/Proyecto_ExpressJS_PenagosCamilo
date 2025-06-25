import { loginRequest } from '../api/routes';
import { useAuth } from '../context/AuthContext';

function Home() {
    return(
        <div>
            <button onClick={() => loginRequest()}>login</button>
        </div>
    )
}

export default Home