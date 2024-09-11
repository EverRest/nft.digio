import connectDB from '../../../utils/db';
import User from '../../../models/User';
import authMiddleware from '../../../middleware/authMiddleware';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        await authMiddleware(req, res, async () => {
            res.status(200).json(req.user);
        });
    } else if (req.method === 'PUT') {
        await authMiddleware(req, res, async () => {
            const { username, email } = req.body;
            const user = await User.findByIdAndUpdate(req.user._id, { username, email }, { new: true });
            res.status(200).json(user);
        });
    } else {
        res.status(405).end();
    }
}