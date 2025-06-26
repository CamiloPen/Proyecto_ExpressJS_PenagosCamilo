import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/navbar';
import { addTopic, getTopics, deleteTopic, updateTopic } from '../api/routes';
import { useForm } from 'react-hook-form';

function Topics() {
    const [topics, setTopics] = useState([]);
    const { register, handleSubmit, reset } = useForm()
    const [isEditing, setIsEditing] = useState(false);
    const [editingCourseId, setEditingCourseId] = useState(null);

    const fetchTopics = async () => {
        try {
            const topicRequest = await getTopics();
            if (topicRequest.status === 200) {
                setTopics(topicRequest.data);
            } else {
                console.error('Error en el registro:', topicRequest.data || topicRequest);
            }
        } catch (err) {
            console.error('Error al obtener los temas:', err);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return (<>
        <Navbar />
        <div className='container'>
            <h2>Lista de Temas</h2>
            <div className='box'>
                {topics.length === 0 && <p>No hay Temas disponibles</p>}
                {topics.map(topic => (
                    <div className='box-card' key={topic._id}>
                        <h3>{topic.code}</h3>
                        <p>
                            Titulo: {topic.title}<br />
                            Descripción: {topic.description}<br />
                        </p>
                        <button onClick={() => {
                            deleteTopic(topic._id)
                            setTopics(prev => prev.filter(c => c._id !== topic._id));
                        }}>Eliminar</button>
                        <button onClick={() => {
                            setIsEditing(true);
                            setEditingCourseId(topic._id);
                            reset({
                                code: topic.code,
                                description: topic.description,
                                title: topic.title
                            })
                        }}>
                            Editar
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                try {
                    let response;
                    if (isEditing && editingCourseId) {
                        response = await updateTopic(editingCourseId, values);
                    } else {
                        response = await addTopic(values);
                    }
                    if (response.status === 200) {
                        reset({
                            code: '',
                            description: '',
                            title: ''
                        });
                        fetchTopics()
                        setIsEditing(false);
                        setEditingCourseId(null)
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
                <h3>{isEditing ? ("Actualizar tema") : ("Agregar nuevo tema")}</h3>
                <div>
                    <label htmlFor="code">Codigo del Tema</label>
                    <input type="text" id='code' placeholder='TPC001' {...register('code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="title">Titulo del tema</label>
                    <input type="text" id='title' placeholder='Listas y Pilas' {...register('title', { required: true })} />
                </div>
                <div>
                    <label htmlFor="description">Descripción del tema</label>
                    <textarea id='description' placeholder='Estudio de estructuras de datos como listas enlazadas, pilas y colas.' {...register('description', { required: true })} />
                </div>
                <button type="submit">{isEditing ? ("Editar") : ("Agregar")}</button>
                {isEditing && (
                    <button type="button" onClick={() => {
                        setIsEditing(false);
                        setEditingCourseId(null);
                        reset({
                            code: '',
                            description: '',
                            title: ''
                        });
                    }}>
                        Cancelar edición
                    </button>
                )}
            </form>
        </div></>
    )
}

export default Topics