import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getSchedules, getCourses, getTeachers, addSchedule } from '../api/routes';

function Schedules() {
    const { register, handleSubmit, reset } = useForm()
    const [schedules, setSchedules] = useState([]);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const fetchTopics = async () => {
        try {
            const scheduleRequest = await getSchedules();
            const courseRequest = await getCourses();
            const teacherRequest = await getTeachers();

            if (teacherRequest.status === 200) {
                setTeachers(teacherRequest.data);
            } else {
                console.error('Error en el registro:', teacherRequest.data || teacherRequest);
            }

            if (courseRequest.status === 200) {
                setCourses(courseRequest.data);
            } else {
                console.error('Error en el registro:', courseRequest.data || courseRequest);
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
    useEffect(() => {
        fetchTopics();
    }, []);

    return (
        <div>
            <div>
                <h2>Lista de cursos</h2>
                {schedules.length === 0 && <p>No hay cursos disponibles</p>}
                {schedules.map(schedule => (
                    <div key={schedule._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                        <h3>{schedule.code}</h3>
                        <p>
                            Curso: {schedule.course.description}<br />
                            Profesor: {schedule.teacher.firstName} {schedule.teacher.lastName}<br />
                        </p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                try {
                    const response = await addSchedule(values);
                    if (response.status === 200) {
                        reset();
                        fetchTopics()
                    } else {
                        console.log('Error en el registro:', response.data);
                    }
                } catch (error) {
                    if (error.response) {
                        console.log('Error del servidor:', error.response.data);
                    } else {
                        console.log('Error de red:', error.message);
                    }
                }
            })}>
                <div>
                    <label htmlFor="code">Codigo del curso</label>
                    <input type="text" id='code' {...register('code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="course">Selecciona un curso:</label>
                    <select id='course'{...register('course', { required: true })}>
                        {courses.map(course => (
                            <option key={course._id} value={course._id}>
                                {course.description}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="schedule.start">Fecha de inicio</label>
                    <input type="date" id='schedule.start' {...register('schedule.start', { required: true })} />
                </div>
                <div>
                    <label htmlFor="schedule.end">Fecha final</label>
                    <input type="date" id='schedule.end' {...register('schedule.end', { required: true })} />
                </div>
                <div>
                    <label htmlFor="teacher">Selecciona un profesor:</label>
                    <select id='teacher'{...register('teacher', { required: true })}>
                        {teachers.map(teacher => (
                            <option key={teacher._id} value={teacher._id}>
                                {teacher.firstName} {teacher.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="classroom.code">Codigo del aula</label>
                    <input type="text" id='classroom.code' {...register('classroom.code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="classroom.description">Descripción del aula</label>
                    <input type="text" id='classroom.description' {...register('classroom.description', { required: true })} />
                </div>
                <div>
                    <label htmlFor="classroom.capacity">Capacidad del aula</label>
                    <input type="number" id='classroom.capacity' {...register('classroom.capacity', { required: true })} />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Schedules