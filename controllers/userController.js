import User from '@/models/User';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getUsers = async (req, res) => {
    try {
        await connectDB();
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    try {
        await connectDB();
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        await connectDB();
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await connectDB();
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};