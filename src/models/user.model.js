import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    googleId: {
        type: String
    },
    userName:  {
        type: String,
        require: true,
        trim: true
    },
    firstnName: {
        type: String,
        require: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true
    },
    email:  {
        type: String,
        require: true,
        trim: true
    },
    identification: {
        code: String,
        name: String,
        number: String,
        description: String
    },
    rol: {
        type: String,
        enum: ['ST', 'TE', 'AD']
    },
    gender:  {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro']
    },
    birthDate: {
        type: Date,
        require: true,
    },
    place: {
        cityCode: String,
        cityName: String,
        address: String
    },
    courses: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'courseSchedules'
        },
        rate: Number,
        registerDate: Date,
        comment: String
    }],
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