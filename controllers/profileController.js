import User from '../models/User';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getProfile = async (req, res) => {
    try {
        await connectDB();
        res.status(STATUS_CODES.OK).json(req.user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        await connectDB();
        const { username, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, { username, email }, { new: true });
        res.status(STATUS_CODES.OK).json(user);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};