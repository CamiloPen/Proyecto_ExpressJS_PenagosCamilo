export default class UserRegister {
    constructor(data) {
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.identification = data.identification
        this.rol = data.rol
        this.gender = data.gender
        this.birthDate = data.birthDate
        this.place = data.place
    }
}