import User from '@/models/User';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getUsers = async (req, res) => {
    try {
        await connectDB();
        const users = await User.find().select('-password');
        res.status(STATUS_CODES.OK).json({ message: 'Users retrieved', users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getUser = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'User ID is required' });
        }
        const user = await User.findById(req.query.id);
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.status(STATUS_CODES.OK).json({ message: 'User retrieved', user: user });
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'User ID is required' });
        }
        const user = await User.findByIdAndUpdate(req.query.id, req.body, { new: true }).select('-password');
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.status(STATUS_CODES.OK).json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'User ID is required' });
        }
        const user = await User.findByIdAndDelete(req.query.id);
        if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
        res.status(STATUS_CODES.OK).json({ message: 'User deleted' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};