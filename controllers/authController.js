import User from '@/models/User';
import {comparePassword, hashPassword} from '@/utils/auth';
import STATUS_CODES from '@/constants/statusCodes';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(STATUS_CODES.CREATED).json({ message: 'User created', user });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    res.status(STATUS_CODES.OK).json({ message: 'Login successful', token });
};