import Bid from '@/models/Bid';
import STATUS_CODES from '@/constants/statusCodes';

export const getBid = async (req, res) => {
    const bid = await Bid.findById(req.query.id).populate('item user');
    if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
    res.status(STATUS_CODES.OK).json(bid);
};

export const getBids = async (req, res) => {
    const bids = await Bid.find().populate('item user');
    res.status(STATUS_CODES.OK).json(bids);
};

export const createBid = async (req, res) => {
    const bid = new Bid(req.body);
    await bid.save();
    res.status(STATUS_CODES.CREATED).json(bid);
};

export const updateBid = async (req, res) => {
    const bid = await Bid.findByIdAndUpdate(req.query.id, req.body, { new: true }).populate('item user');
    if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
    res.status(STATUS_CODES.OK).json(bid);
};

export const deleteBid = async (req, res) => {
    const bid = await Bid.findByIdAndDelete(req.query.id);
    if (!bid) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Bid not found' });
    res.status(STATUS_CODES.OK).json({ message: 'Bid deleted' });
};