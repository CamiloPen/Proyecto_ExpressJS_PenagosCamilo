import { useForm } from 'react-hook-form';
import { registerRequest } from '../api/auth.js'

function RegisterPage() {
    const {register, handleSubmit} = useForm()

    return (
        <div>
            <form onSubmit={handleSubmit( async values =>{
                console.log(values);
                const res = await registerRequest(values)
                console.log(res)
            })}>
                <div>
                    <label htmlFor="username">UserName</label>
                    <input type="text" {...register('username', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" {...register('email', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="firstName">Digite su nombre</label>
                    <input type="text" {...register('firstname', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="lastName">Digite su apellido</label>
                    <input type="text" {...register('lastName', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="identification.code">Tipo de Identificación</label>
                    <select {...register('identification.code', {required: true})}>
                        <option value="CE">Cedula de Extranjeria</option>
                        <option value="CC">Cedula de Ciudadania</option>
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="PAS">Pasaporte</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="identificatio.number">Número de Identificación</label>
                    <input type="number" {...register('identification.number', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="gender">Genero</label>
                    <select {...register('gender', {required: true})}>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="birthDate">Fecha de nacimiento</label>
                    <input type="date" {...register('birthDate', {required: true})}/>
                </div>
                <div>
                    <label htmlFor="city.code">Ciudad</label>
                    <select {...register('city.code', {required: true})}>
                        <option value="BAR">Barranquilla</option>
                        <option value="BOG">Bogotá</option>
                        <option value="BGA">Bucaramanga</option>
                        <option value="CAL">Cali</option>
                        <option value="CAR">Cartagena</option>
                        <option value="MAN">Manizales</option>
                        <option value="MED">Medellin</option>
                        <option value="OTR">Otro</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" {...register('address', {required: true})}/>
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}

export default RegisterPage