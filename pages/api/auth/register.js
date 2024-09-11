import connectDB from '../../../utils/db';
import User from '../../../models/User';
import { hashPassword } from '../../../utils/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { username, email, password } = req.body;

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'User created', user });
}