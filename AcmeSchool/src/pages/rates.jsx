import { useEffect, useState } from 'react';
import { getSchedules } from '../api/routes';


function Rates() {
    const [schedules, setSchedules] = useState([]);

    const fetchTopics = async () => {
        try {
            const scheduleRequest = await getSchedules();
            if (scheduleRequest.status === 200) {
                setSchedules(scheduleRequest.data);
            } else {
                console.error('Error en el registro:', scheduleRequest.data || scheduleRequest);
            }
        } catch (err) {
            console.error('Error al obtener los temas:', err);
        }
    };
    useEffect(() => {
        fetchTopics();
    }, []);
    return (
        <div className='container'>
            <h2>Lista de cursos programados</h2>
            <div className='box'>
                {schedules.length === 0 && <p>No hay cursos disponibles</p>}
                {schedules.map(schedule => (
                    <div className='box-card' key={schedule._id}>
                        <h3>{schedule.code}</h3>
                        <p>
                            Curso: {schedule.course.description}<br />
                            Profesor: {schedule.teacher.firstName} {schedule.teacher.lastName}<br />
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Rates