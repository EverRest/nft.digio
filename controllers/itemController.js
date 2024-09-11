import Item from '../models/Item';
import STATUS_CODES from "@/constants/statusCodes";

export const getItems = async (req, res) => {
    const items = await Item.find().populate('owner collection bids');
    res.status(STATUS_CODES.OK).json(items);
};

export const getItem = async (req, res) => {
    const item = await Item.findById(req.query.id).populate('owner collection bids');
    if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
    res.status(STATUS_CODES.OK).json(item);
};

export const createItem = async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(STATUS_CODES.CREATED).json(item);
};

export const updateItem = async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.query.id, req.body, { new: true }).populate('owner collection bids');
    if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
    res.status(STATUS_CODES.OK).json(item);
};

export const deleteItem = async (req, res) => {
    const item = await Item.findByIdAndDelete(req.query.id);
    if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
    res.status(STATUS_CODES.OK).json({ message: 'Item deleted' });
};