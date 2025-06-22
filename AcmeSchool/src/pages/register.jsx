import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth';

function RegisterPage() {
    const { register, watch, handleSubmit, setValue } = useForm()

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

    return (
        <div>
            <form onSubmit={handleSubmit(async values => {
                console.log(values)
                registerRequest(values)
            })}>
                <div>
                    <label htmlFor="firstName">Digite su nombre</label>
                    <input type="text" id='firstName' {...register('firstName', { required: true })} />
                </div>
                <div>
                    <label htmlFor="lastName">Digite su apellido</label>
                    <input type="text" id='lastName' {...register('lastName', { required: true })} />
                </div>
                <div>
                    <label htmlFor="identification.code">Tipo de Identificación</label>
                    <select id='identification.code' {...register('identification.code', { required: true })}>
                        <option value="CE">Cedula de Extranjeria</option>
                        <option value="CC">Cedula de Ciudadania</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PAS">Pasaporte</option>
                    </select>
                    <input type="hidden" id='identification.name' {...register('identification.name')}/>
                </div>
                <div>
                    <label htmlFor="identificatio.number">Número de Identificación</label>
                    <input type="number" id='identification.number' {...register('identification.number', { required: true })} />
                </div>
                <div>
                    <label htmlFor="rol">Rol</label>
                    <select id='rol' {...register('rol', { required: true })}>
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
                    <label htmlFor="place.cityCode">Ciudad</label>
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
                    <input type='hidden' id='place.cityName' {...register('place.cityName')}/>
                </div>
                <div>
                    <label htmlFor="place.address">Dirección</label>
                    <input type="text" id='place.address' {...register('place.address', { required: true })} />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterPage