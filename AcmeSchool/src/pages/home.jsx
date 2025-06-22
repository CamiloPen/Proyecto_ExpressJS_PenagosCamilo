import { loginRequest } from '../api/auth';

function Home() {
    return(
        <div>
            <button onClick={()=> loginRequest()}>login</button>
        </div>
    )
}

export default Home