import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { addCourse, getCourses, getTopics } from '../api/routes';

function Courses() {
    const { register, handleSubmit, reset } = useForm()
    const [topics, setTopics] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);

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
        <div>
            <div>
                <h2>Lista de cursos</h2>
                {courses.length === 0 && <p>No hay cursos disponibles</p>}
                {courses.map(course => (
                    <div key={course._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
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
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                let newCourse = { ...values, "topic": selectedTopics }
                newCourse.intensity = Number(newCourse.intensity)
                newCourse.weight = Number(newCourse.weight)
                try {
                    const response = await addCourse({ ...newCourse });
                    if (response.status === 200) {
                        reset();
                        setSelectedTopics([]);
                        const updatedCourses = await getCourses();
                        if (updatedCourses.status === 200) {
                            setCourses(updatedCourses.data);
                        }
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
                    <label htmlFor="description">Descripcion del curso</label>
                    <input type="text" id='description' {...register('description', { required: true })} />
                </div>
                <div>
                    <label htmlFor="intencity">Intencidad horria</label>
                    <input type="number" id='intensity' {...register('intensity', { required: true })} />
                </div>
                <div>
                    <label htmlFor="weight">Peso Aritmetico</label>
                    <input type="number" id='weight' {...register('weight', { required: true })} />
                </div>
                <div>
                    <label htmlFor="topic">Selecciona los temas:</label>
                    <select id='topic' multiple value={selectedTopics} onChange={handleChange}>
                        {topics.map(topic => (
                            <option key={topic._id} value={topic._id}>
                                {topic.title}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Courses