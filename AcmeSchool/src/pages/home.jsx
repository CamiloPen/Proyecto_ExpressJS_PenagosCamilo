import { loginRequest } from '../api/routes';

function Home() {
    return(
        <div>
            <button onClick={() => loginRequest()}>login</button>
        </div>
    )
}

export default Home