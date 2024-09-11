import User from '@/models/User';
import STATUS_CODES from "@/constants/statusCodes";

export const getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
    res.json(user);
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
    res.json(user);
};

export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
};