import { useEffect, useState } from 'react';
import { getTeachers } from '../api/routes';
import Navbar from '../components/navbar';

function Teachers() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const teacherRequest = await getTeachers()
                if (teacherRequest.status === 200) {
                    setTeachers(teacherRequest.data);
                } else {
                    console.error('Error en el registro:', teacherRequest.data || teacherRequest);
                }
            } catch (err) {
                console.error('Error al obtener los temas:', err);
            }
        };

        fetchTopics();
    }, []);

    return (<>
        <Navbar />
        <div className='container'>
            <h2>Lista de Profesores</h2>
            <div className='box'>
                {teachers.length === 0 && <p>No hay cursos disponibles</p>}
                {teachers.map(teacher => (
                    <div className='box-card' key={teacher._id}>
                        <h3>{teacher.code}</h3>
                        <p>
                            Nombre: {teacher.firstName} {teacher.lastName}<br />
                            Email: {teacher.email}<br />
                            Tipo y Numero de identificación: {teacher.identification.code}. {teacher.identification.number}
                        </p>
                    </div>
                ))}
            </div>
        </div></>
    )
}

export default Teachers