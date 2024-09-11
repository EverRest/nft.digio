import '@/config/envConfig';
import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/utils/db';
import STATUS_CODES from "@/constants/statusCodes";
const roleMiddleware = (requiredRoles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'No token provided' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            await connectDB();
            const user = await User.findById(decoded.id).select('-password');
            if (!user) return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' });

            const hasRole = requiredRoles.some(role => user.roles.includes(role));
            if (!hasRole) return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });

            req.user = user;
            next();
        } catch (error) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
    };
};

export default roleMiddleware;