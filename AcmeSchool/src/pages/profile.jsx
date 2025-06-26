import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/routes';
import Navbar from '../components/navbar';


function Profile() {
    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue, watch } = useForm();

    const identificationCode = watch('identification.code');
    const placeCityCode = watch('place.cityCode');

    const idNames = {
        CE: 'Cédula de Extranjería',
        CC: 'Cédula de Ciudadanía',
        TI: 'Tarjeta de Identidad',
        PAS: 'Pasaporte'
    };

    const cityNames = {
        BAR: 'Barranquilla',
        BOG: 'Bogotá',
        BGA: 'Bucaramanga',
        CAL: 'Cali',
        CAR: 'Cartagena',
        MAN: 'Manizales',
        MED: 'Medellin',
        OTR: 'Otro',
    };

    useEffect(() => {   
        if (identificationCode) {
            setValue('identification.name', idNames[identificationCode]);
        }
        if (placeCityCode) {
            setValue('place.cityName', cityNames[placeCityCode])
        }
    }, [identificationCode, setValue, placeCityCode]);

    return (<>
        <Navbar />
        <div className='container'>
            <form onSubmit={handleSubmit(async (values) => {
                try {
                    const response = await registerRequest(values);
                    if (response.status === 200) {
                        setIsEditing(false);
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
                <h3>Perfil de usuario</h3>
                <div>
                    <label htmlFor="firstName">Nombre:</label>
                    <input
                        type="text"
                        id='firstName'
                        disabled={!isEditing}
                        defaultValue={user.firstName}
                        {...register('firstName', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Apellido:</label>
                    <input
                        type="text"
                        id='lastName'
                        disabled={!isEditing}
                        defaultValue={user.lastName}
                        {...register('lastName', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="identification.code">Tipo de Identificación</label>
                    <select
                        id='identification.code'
                        disabled={!isEditing}
                        defaultValue={user.identification.code}
                        {...register('identification.code', { required: true })}
                    >
                        <option value="CE">Cedula de Extranjeria</option>
                        <option value="CC">Cedula de Ciudadania</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PAS">Pasaporte</option>
                    </select>
                    <input
                        type="hidden"
                        id='identification.name'
                        {...register('identification.name')}
                    />
                </div>
                <div>
                    <label htmlFor="identification.number">Número de Identificación</label>
                    <input
                        type="number"
                        id='identification.number'
                        disabled={!isEditing}
                        defaultValue={user.identification.number}
                        {...register('identification.number', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Género</label>
                    <select
                        id='gender'
                        disabled={!isEditing}
                        defaultValue={user.gender}
                        {...register('gender', { required: true })}
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input
                        type="date"
                        id='birthDate'
                        disabled={!isEditing}
                        defaultValue={user.birthDate.split('T')[0]}
                        {...register('birthDate', { required: true })}
                    />
                </div>
                <div>
                    <label htmlFor="place.cityCode">Ciudad de residencia:</label>
                    <select
                        id='place.cityCode'
                        defaultValue={user.place.cityCode}
                        disabled={!isEditing}
                        {...register('place.cityCode', { required: true })}
                    >
                        <option value="BAR">Barranquilla</option>
                        <option value="BOG">Bogotá</option>
                        <option value="BGA">Bucaramanga</option>
                        <option value="CAL">Cali</option>
                        <option value="CAR">Cartagena</option>
                        <option value="MAN">Manizales</option>
                        <option value="MED">Medellín</option>
                        <option value="OTR">Otro</option>
                    </select>
                    <input
                        type='hidden'
                        id='place.cityName'
                        value={user.place.cityName}
                        {...register('place.cityName')}
                    />
                </div>
                <div>
                    <label htmlFor="place.address">Dirección:</label>
                    <input
                        type="text"
                        id='place.address'
                        disabled={!isEditing}
                        defaultValue={user.place.address}
                        {...register('place.address', { required: true })}
                    />
                </div>
                {isEditing ? <button
                    type="submit"
                >
                    Actualizar
                </button> : <></>}
                <button
                    type="button"
                    onClick={() => setIsEditing(prev => !prev)}
                >
                    {isEditing ? 'Cancelar edición' : 'Actualizar información'}
                </button>
            </form>
        </div></>
    );
}

export default Profile;
