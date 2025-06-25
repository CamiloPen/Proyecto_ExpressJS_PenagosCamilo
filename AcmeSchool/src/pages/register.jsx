import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { login, registerRequest } from "../api/routes";
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
    const { singup } = useAuth()

    async function find() {
        const res = await login();
        if (res.data.rol.length > 0) {
            await singup(res.data)
            navigate('/courses');
        }
    }

    const { register, watch, handleSubmit, setValue } = useForm()
    const navigate = useNavigate();

    const [selectedRoles, setSelectedRoles] = useState([]);

    const handleChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedRoles(selected);
    };

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
        find()
        if (identificationCode) {
            setValue('identification.name', idNames[identificationCode]);
        }
        if (placeCityCode) {
            setValue('place.cityName', cityNames[placeCityCode])
        }
    }, [identificationCode, setValue, placeCityCode]);

    return (
        <div>
            <form onSubmit={handleSubmit(async values => {
                const updateUser = { ...values, rol: selectedRoles }
                singup(updateUser)
                try {
                    const response = await registerRequest(updateUser);
                    if (response.status === 200) {
                        navigate('/courses');
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
                <h3>Para continuar por favor completa el formulario</h3>
                <div>
                    <label htmlFor="firstName">Digite su nombre:</label>
                    <input type="text" id='firstName' placeholder="Juan" {...register('firstName', { required: true })} />
                </div>
                <div>
                    <label htmlFor="lastName">Digite su apellido:</label>
                    <input type="text" id='lastName' placeholder="lopez" {...register('lastName', { required: true })} />
                </div>
                <div>
                    <label htmlFor="identification.code">Tipo de Identificación</label>
                    <select id='identification.code' {...register('identification.code', { required: true })}>
                        <option value="CE">Cedula de Extranjeria</option>
                        <option value="CC">Cedula de Ciudadania</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PAS">Pasaporte</option>
                    </select>
                    <input type="hidden" id='identification.name' {...register('identification.name')} />
                </div>
                <div>
                    <label htmlFor="identificatio.number">Número de Identificación</label>
                    <input type="number" id='identification.number' placeholder="0123456789" {...register('identification.number', { required: true })} />
                </div>
                <div>
                    <label htmlFor="rol">Rol <span>*Si desea agregar mas de un rol mantenga precionada la tecla Ctrl + click en otro rol*</span></label>
                    <select id='rol' multiple value={selectedRoles} onChange={handleChange}>
                        <option value="AD">Administrador</option>
                        <option value="ST">Estudiante</option>
                        <option value="TE">Profesor</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gender">Genero</label>
                    <select id='gender' {...register('gender', { required: true })}>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input type="date" id='birthDate' {...register('birthDate', { required: true })} />
                </div>
                <div>
                    <label htmlFor="place.cityCode">Ciudad de recidencia:</label>
                    <select id='place.cityCode' {...register('place.cityCode', { required: true })}>
                        <option value="BAR">Barranquilla</option>
                        <option value="BOG">Bogotá</option>
                        <option value="BGA">Bucaramanga</option>
                        <option value="CAL">Cali</option>
                        <option value="CAR">Cartagena</option>
                        <option value="MAN">Manizales</option>
                        <option value="MED">Medellin</option>
                        <option value="OTR">Otro</option>
                    </select>
                    <input type='hidden' id='place.cityName' {...register('place.cityName')} />
                </div>
                <div>
                    <label htmlFor="place.address">Dirección:</label>
                    <input type="text" id='place.address' placeholder="calle #12 - 12" {...register('place.address', { required: true })} />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterPage