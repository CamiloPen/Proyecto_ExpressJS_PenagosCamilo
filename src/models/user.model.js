import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    googleId: {
        type: String
    },
    userName:  {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email:  {
        type: String,
        trim: true
    },
    identification: {
        code: String,
        name: String,
        number: String
    },
    rol: [
        {type: String,
        enum: ['ST', 'TE', 'AD']}
    ],
    gender:  {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro']
    },
    birthDate: {
        type: Date,
    },
    place: {
        cityCode: String,
        cityName: String,
        address: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean
    }
})

const user = mongoose.model('users', userSchema);

export default user;