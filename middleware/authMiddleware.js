import '@/config/envConfig';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/utils/db';
import STATUS_CODES from "@/constants/statusCodes";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        console.log('No token provided');
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        await connectDB();
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' });
    }
};

export default authMiddleware;