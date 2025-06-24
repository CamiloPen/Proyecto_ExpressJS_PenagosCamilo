import { useEffect, useState } from 'react';
import { addTopic, getTopics } from '../api/routes';
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
        <div>
            <div>
                <h2>Lista de Temas</h2>
                {topics.length === 0 && <p>No hay Temas disponibles</p>}
                {topics.map(topic => (
                    <div key={topic._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
                        <h3>{topic.code}</h3>
                        <p>
                            Titulo: {topic.title}<br />
                            Descripción: {topic.description}<br />
                        </p>
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
                <div>
                    <label htmlFor="code">Codigo del Tema</label>
                    <input type="text" id='code' {...register('code', { required: true })} />
                </div>
                <div>
                    <label htmlFor="title">Titulo del tema</label>
                    <input type="text" id='title' {...register('title', { required: true })} />
                </div>
                <div>
                    <label htmlFor="description">Descripción del tema</label>
                    <textarea id='description' {...register('description', { required: true })} />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Topics