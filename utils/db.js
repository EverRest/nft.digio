import '@/config/envConfig';
import mongoose from 'mongoose';

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is not defined');
    }
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(uri);
};

export default connectDB;