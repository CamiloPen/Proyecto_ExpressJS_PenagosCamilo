import { loginRequest } from '../api/routes';
import Navbar from '../components/navbar';

function Home() {
    return(<>
        <Navbar />
        <div className='container'>
            <button onClick={() => loginRequest()}>login</button>
        </div></>
    )
}

export default Home