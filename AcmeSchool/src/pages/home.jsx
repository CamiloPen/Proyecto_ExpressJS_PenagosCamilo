import { loginRequest } from '../api/routes';
import '../styles/home.css';
import logo from '../assets/acmeSchoollogo.jpeg';
import mision from '../assets/mision.jpg';
import vision from '../assets/vision.jpg';
function Home() {
    return (
        <div className="container-home">
            <img src={logo} alt="Logo Acme School" className="logo" />

            <p className="slogan">
                “Construyendo el futuro línea por línea, formamos desarrolladores web con visión, pasión y propósito.”
            </p>

            <div className="section">
                <h2><span className="icon">🎯</span> Misión</h2>
                <img src={mision} alt="mision" className='section-img' />
                <p>
                    Capacitar a nuevas generaciones de desarrolladores web mediante una formación práctica, actualizada y centrada en el aprendizaje activo,
                    impulsando el pensamiento lógico, la creatividad digital y el trabajo colaborativo en entornos reales de desarrollo.
                </p>
            </div>

            <div className="section">
                <h2><span className="icon">🚀</span> Visión</h2>
                <img src={vision} alt="vision" className='section-img' />
                <p>
                    Ser una escuela líder en educación tecnológica, especializada en desarrollo web, reconocida por transformar talento en innovación digital
                    y por preparar profesionales capaces de impactar positivamente en la industria tecnológica a nivel global.
                </p>
            </div>
            <button onClick={() => loginRequest()}>login</button>
        </div>
    );
}

export default Home