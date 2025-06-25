import { useEffect, useState } from 'react';
import { addTopic, getTopics, deleteTopic } from '../api/routes';
import { useForm } from 'react-hook-form';

function Topics() {
    const [topics, setTopics] = useState([]);
    const { register, handleSubmit, reset } = useForm()
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

    return (
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
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit(async (values) => {
                try {
                    const response = await addTopic(values);
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
                <h3>Agregar nuevo tema</h3>
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
                <button type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Topics