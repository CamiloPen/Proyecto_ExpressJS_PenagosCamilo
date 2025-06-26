import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { getSchedules, getCourses, getTeachers, addSchedule, deleteSchedule, updateSchedule, getStudents } from '../api/routes';

function Schedules() {
    const { register, handleSubmit, reset } = useForm()
    const [schedules, setSchedules] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [selectedStudents, setSelectedSselectedStudents] = useState([]);

    const handleChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedSselectedStudents(selected);
    };

    const fetchTopics = async () => {
        try {
            const scheduleRequest = await getSchedules();
            const studentRequest = await getStudents();
            const courseRequest = await getCourses();
            const teacherRequest = await getTeachers();

            if (teacherRequest.status === 200) {
                setTeachers(teacherRequest.data);
            } else {
                console.error('Error en el registro:', teacherRequest.data || teacherRequest);
            }

            if (studentRequest.status === 200) {
                setStudents(studentRequest.data);
            } else {
                console.error('Error en el registro:', studentRequest.data || studentRequest);
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
                        <button onClick={() => {
                            deleteSchedule(schedule._id)
                            setSchedules(prev => prev.filter(c => c._id !== schedule._id));
                        }}>Eliminar</button>
                        <button onClick={() => {
                            setIsEditing(true);
                            setEditingId(schedule._id);
                            reset({
                                code: schedule.code,
                                course: schedule.course._id,
                                teacher: schedule.teacher._id,
                                schedule: {
                                    start: schedule.schedule.start.split('T')[0],
                                    end: schedule.schedule.end.split('T')[0],
                                },
                                classroom: {
                                    code: schedule.classroom.code,
                                    capacity: schedule.classroom.capacity,
                                    description: schedule.classroom.description
                                }
                            });
                        }}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                const submitSchedule = { ...values, students: selectedStudents }
                try {
                    let response;
                    if (isEditing && editingId) {
                        response = await updateSchedule(editingId, submitSchedule);
                    } else {
                        response = await addSchedule(submitSchedule);
                    }
                    if (response.status === 200) {
                        reset({
                            code: "",
                            course: "",
                            teacher: "",
                            schedule: {
                                start: "",
                                end: "",
                            },
                            classroom: {
                                code: "",
                                capacity: "",
                                description: ""
                            }
                        });
                        fetchTopics()
                        setIsEditing(false);
                        setEditingId(null);
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
                <h3>{isEditing ? ("Editar programación") : ("Programar un nuevo curso")}</h3>
                <div>
                    <label htmlFor="code">Codigo del horario</label>
                    <input type="text" id='code' placeholder='SCH001' {...register('code', { required: true })} />
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
                    <input type="text" id='classroom.code' placeholder='CLS001' {...register('classroom.code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="classroom.description">Descripción del aula</label>
                    <input type="text" id='classroom.description' placeholder='Aula con 30 computadoras y proyector' {...register('classroom.description', { required: true })} />
                </div>
                <div>
                    <label htmlFor="classroom.capacity">Capacidad del aula</label>
                    <input type="number" id='classroom.capacity' placeholder='25' {...register('classroom.capacity', { required: true })} />
                </div>
                <div>
                    <label htmlFor="students.id">Selecciona los estudiantes:</label>
                    <select id='students.id' multiple value={selectedStudents} onChange={handleChange}>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{isEditing ? ("Editar") : ("Programar")}</button>
                {isEditing && (
                    <button type="button" onClick={() => {
                        setIsEditing(false);
                        setEditingId(null);
                        reset({
                            code: "",
                            course: "",
                            teacher: "",
                            schedule: {
                                start: "",
                                end: "",
                            },
                            classroom: {
                                code: "",
                                capacity: "",
                                description: ""
                            }
                        });
                    }}>
                        Cancelar edición
                    </button>
                )}
            </form>
        </div>
    )
}

export default Schedules