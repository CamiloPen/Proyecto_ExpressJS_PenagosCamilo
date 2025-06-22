export default class UserRegister {
    constructor(data) {
        this.firstnName = data.firstnName
        this.lastName = data.lastName
        this.identification.code = data.identification.code
        this.identification.name = data.identification.name
        this.identification.number = data.identification.number
        this.identification.description = data.identification.description
        this.rol = data.rol
        this.gender = data.gender
        this.birthDate = data.birthDate
        this.place.cityCode = data.place.cityCode
        this.place.cityName = data.place.cityName
        this.place.address = data.place.address
    }
}