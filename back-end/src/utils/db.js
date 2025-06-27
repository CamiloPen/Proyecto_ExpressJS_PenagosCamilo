import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_LOCAL);
        console.log('>> database conectada');
    } catch (error) {
        console.log(error);
    }
}