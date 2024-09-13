import Bid from '@/models/Bid';
import STATUS_CODES from '@/constants/statusCodes';
import connectDB from '@/utils/db';

export const getBid = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Bid ID is required' });
        }
        const bid = await Bid.findById(req.query.id).populate('item user');
        if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
        res.status(STATUS_CODES.OK).json(bid);
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getBids = async (req, res) => {
    try {
        await connectDB();
        const bids = await Bid.find().populate('item user');
        res.status(STATUS_CODES.OK).json({
            message: "Bids retrieved",
            bids: bids
        });
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const createBid = async (req, res) => {
    try {
        await connectDB();
        const bid = new Bid(req.body);
        await bid.save();
        res.status(STATUS_CODES.CREATED).json({ message: 'Bid created', bid });
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateBid = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Bid ID is required' });
        }
        const bid = await Bid.findByIdAndUpdate(req.query.id, req.body, { new: true }).populate('item user');
        if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
        res.status(STATUS_CODES.OK).json(bid);
    } catch (error) {
        console.error('Error updating bid:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteBid = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Bid ID is required' });
        }
        const bid = await Bid.findByIdAndDelete(req.query.id);
        if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
        res.status(STATUS_CODES.OK).json({ message: 'Bid deleted' });
    } catch (error) {
        console.error('Error deleting bid:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};