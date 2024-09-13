import '@/config/envConfig';
import STATUS_CODES from "@/constants/statusCodes";

const roleMiddleware = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const user = req.user || {};
            const hasRole = requiredRoles.includes(user.role);
            if (!hasRole) return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Forbidden' });
            req.user = user;
            next();
        } catch (error) {
            res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid token' });
        }
    };
};

export default roleMiddleware;