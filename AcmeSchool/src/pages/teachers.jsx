import { useEffect, useState } from 'react';
import { getTeachers } from '../api/routes';

function Teachers() {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const teacherRequest =await getTeachers()
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

    return (
        <div>
            <h2>Lista de Profesores</h2>
            {teachers.length === 0 && <p>No hay cursos disponibles</p>}
            {teachers.map(teacher => (
                <div key={teacher._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <h3>{teacher.code}</h3>
                    <p>
                        Nombre: {teacher.firstName} {teacher.lastName}<br />
                        Email: {teacher.email}<br />
                        Tipo y Numero de identificación: {teacher.identification.code}. {teacher.identification.number}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Teachers