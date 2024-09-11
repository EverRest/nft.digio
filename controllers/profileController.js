import User from '../models/User';
import STATUS_CODES from "@/constants/statusCodes";

export const getProfile = async (req, res) => {
    res.status(STATUS_CODES.OK).json(req.user);
};

export const updateProfile = async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { username, email }, { new: true });
    res.status(STATUS_CODES.OK).json(user);
};