import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { getSchedulesByStudents, getSchedulesByTeachers } from '../api/routes';
import { useAuth } from '../context/AuthContext';

function MySchedules() {
    const {user} = useAuth()
    const [schedules, setSchedules] = useState([]);

    const fetchTopics = async () => {
        try {
            let scheduleRequest
            if (user.rol == 'ST') {
                scheduleRequest = await getSchedulesByStudents();
            } else if (user.rol == 'TE' ){
                scheduleRequest = await getSchedulesByTeachers();
            }

            if (scheduleRequest.status === 200) {
                setSchedules(scheduleRequest.data);
            } else {
                console.error('Error en el registro:', scheduleRequest.data || scheduleRequest);
            }
        } catch (err) {
            console.error('Error al obtener los temas:', err);
        }
    };

    console.log(schedules[0])
    useEffect(() => {
        fetchTopics();
    }, []);

    return (<>
        <Navbar />
        <div className='container'>
            <h2>Lista de cursos programados</h2>
            <div className='box'>
                {schedules.length === 0 && <p>No hay cursos disponibles</p>}
                {schedules.map(schedule => (
                    <div className='box-card' key={schedule._id}>
                        <h3>{schedule.code}</h3>
                        <p>
                            Fecha de inicio: {schedule.schedule.start.split('T')[0]}<br />
                            Fecha final: {schedule.schedule.end.split('T')[0]}<br />
                            Curso: {schedule.course.description}<br />
                            Profesor: {schedule.teacher.firstName} {schedule.teacher.lastName}<br />
                        </p>
                        <h4>TEMAS:</h4>
                        <ul>
                        {schedule.topics.map(topic => (
                            <li key={topic._id}>{topic.title}</li>
                    ))}
                    </ul>
                    <h4>Aula: {schedule.classroom.code}</h4>
                    <p>
                        {schedule.classroom.description}
                    </p>
                    </div>
                ))}
            </div>
        </div></>
    )
}

export default MySchedules