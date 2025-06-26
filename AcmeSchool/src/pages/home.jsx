import { loginRequest } from '../api/routes';

function Home() {
    return(
        <div className='container'>
            <button onClick={() => loginRequest()}>login</button>
        </div>
    )
}

export default Home