import mongoose from "mongoose";

const topicSchema = mongoose.Schema({
    code: {
        type: String,
        trim: true
    },
    title: {
        trim: true,
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean
    }
})

const topicModel = mongoose.model('topics', topicSchema);

export default topicModel;