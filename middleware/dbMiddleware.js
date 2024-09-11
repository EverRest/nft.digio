import mongoose from 'mongoose';

const dbMiddleware = async (req, res, next) => {
    if (mongoose.connections[0].readyState) {
        return next();
    }
    await mongoose.connect(process.env.MONGO_URI);
    return next();
};

export default dbMiddleware;