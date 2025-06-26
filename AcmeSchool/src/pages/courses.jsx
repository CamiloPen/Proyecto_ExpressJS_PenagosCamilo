import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { addCourse, getCourses, getTopics, deleteCourse, updateCourse } from '../api/routes';

function Courses() {
    const { register, handleSubmit, reset } = useForm()
    const [topics, setTopics] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const topicRequest = await getTopics();
                const courseRequest = await getCourses();

                if (courseRequest.status === 200) {
                    setCourses(courseRequest.data);
                } else {
                    console.error('Error en el registro:', courseRequest.data || courseRequest);
                }

                if (topicRequest.status === 200) {
                    setTopics(topicRequest.data);
                } else {
                    console.error('Error en el registro:', topicRequest.data || topicRequest);
                }
            } catch (err) {
                console.error('Error al obtener los temas:', err);
            }
        };

        fetchTopics();
    }, []);

    const handleChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedTopics(selected);
    };
    return (
        <div className='container'>
            <h2>Lista de cursos</h2>
            <div className='box'>
                {courses.length === 0 && <p>No hay cursos disponibles</p>}
                {courses.map(course => (
                    <div className='box-card' key={course._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                        <h3>{course.code}</h3>
                        <p>
                            Descripción: {course.description}<br />
                            Intensidad Horaria: {course.intensity}<br />
                            Peso: {course.weight}
                        </p>
                        <strong>Temas:</strong>
                        <ul>
                            {course.topics?.map(topic => (
                                <li key={topic._id}>{topic.title}</li>
                            ))}
                        </ul>
                        <button onClick={() => {
                            deleteCourse(course._id)
                            setCourses(prev => prev.filter(c => c._id !== course._id));
                        }}>Eliminar</button>
                        <button onClick={() => {
                            setIsEditing(true);
                            setEditingId(course._id);
                            reset({
                                code: course.code,
                                description: course.description,
                                intensity: course.intensity,
                                weight: course.weight
                            });
                            setSelectedTopics(course.topics.map(topic => topic._id));
                        }}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                const newCourse = {
                    ...values,
                    topic: selectedTopics,
                    intensity: Number(values.intensity),
                    weight: Number(values.weight)
                };

                try {
                    let response;
                    if (isEditing && editingId) {
                        response = await updateCourse(editingId, newCourse);
                    } else {
                        response = await addCourse(newCourse);
                    }

                    if (response.status === 200) {
                        reset({
                            code: '',
                            description: '',
                            intensity: '',
                            weight: ''
                        });
                        setSelectedTopics([]);
                        setIsEditing(false);
                        setEditingCourseId(null);
                        const updatedCourses = await getCourses();
                        if (updatedCourses.status === 200) {
                            setCourses(updatedCourses.data);
                        }
                    } else {
                        console.log('Error:', response.data);
                    }
                } catch (error) {
                    if (error.response) {
                        console.log('Error del servidor:', error.response.data);
                    } else {
                        console.log('Error de red:', error.message);
                    }
                }
            })}>
                <h3>{isEditing ? ("Editar un courso") : ("Agregar nuevo curso")}</h3>
                <div>
                    <label htmlFor="code">Codigo del curso:</label>
                    <input type="text" id='code' placeholder='COU001' {...register('code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="description">Descripcion del curso:</label>
                    <input type="text" id='description' placeholder='Programación orientada a objetos' {...register('description', { required: true })} />
                </div>
                <div>
                    <label htmlFor="intencity">Intensidad horaria:</label>
                    <input type="number" id='intensity' placeholder='4' {...register('intensity', { required: true })} />
                </div>
                <div>
                    <label htmlFor="weight">Peso Aritmetico:</label>
                    <input type="number" id='weight' placeholder='1 - 10' {...register('weight', { required: true })} />
                </div>
                <div>
                    <label htmlFor="topic">Selecciona los temas: <br /> <span>*Si desea agregar mas de un tema mantenga precionada la tecla Ctrl + click en otro tema*</span></label>
                    <select id='topic' multiple value={selectedTopics} onChange={handleChange}>
                        {topics.map(topic => (
                            <option key={topic._id} value={topic._id}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{isEditing ? ("Editar") : ("Agregar")}</button>
                {isEditing && (
                    <button type="button" onClick={() => {
                        setSelectedTopics([]);
                        setIsEditing(false);
                        setEditingId(null);
                        reset({
                            code: '',
                            description: '',
                            intensity: '',
                            weight: ''
                        });
                    }}>
                        Cancelar edición
                    </button>
                )}
            </form>
        </div>
    )
}

export default Courses