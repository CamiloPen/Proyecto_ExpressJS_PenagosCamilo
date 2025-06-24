import { useEffect, useState } from 'react';
import { getStudents } from '../api/routes';

function Students() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const studentRequest = await getStudents()
                if (studentRequest.status === 200) {
                    setStudents(studentRequest.data);
                } else {
                    console.error('Error en el registro:', studentRequest.data || studentRequest);
                }
            } catch (err) {
                console.error('Error al obtener los estudintes:', err);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div>
            <h2>Lista de Estudiantes</h2>
            {students.length === 0 && <p>No Hay estudiantes disponibles</p>}
            {students.map(student => (
                <div key={student._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                    <h3>{student.code}</h3>
                    <p>
                        Nombre: {student.firstName} {student.lastName}<br />
                        Email: {student.email}<br />
                        Tipo y Numero de identificación: {student.identification.code}. {student.identification.number}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Students