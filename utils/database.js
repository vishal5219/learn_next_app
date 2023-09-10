import mongoose from 'mongoose';

export const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'learnNext'
        })
        console.log('mongodb connected');
    } catch (error) {
        console.log('mongodb connection error', error);
    }
}