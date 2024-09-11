import Item from '../models/Item';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getItems = async (req, res) => {
    try {
        await connectDB();
        const items = await Item.find().populate('owner collection bids');
        res.status(STATUS_CODES.OK).json(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getItem = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Item ID is required' });
        }
        const item = await Item.findById(req.query.id).populate('owner collection bids');
        if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
        res.status(STATUS_CODES.OK).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const createItem = async (req, res) => {
    try {
        await connectDB();
        const item = new Item(req.body);
        await item.save();
        res.status(STATUS_CODES.CREATED).json(item);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateItem = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Item ID is required' });
        }
        const item = await Item.findByIdAndUpdate(req.query.id, req.body, { new: true }).populate('owner collection bids');
        if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
        res.status(STATUS_CODES.OK).json(item);
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteItem = async (req, res) => {
    try {
        await connectDB();
        if (!req.query || !req.query.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Item ID is required' });
        }
        const item = await Item.findByIdAndDelete(req.query.id);
        if (!item) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Item not found' });
        res.status(STATUS_CODES.OK).json({ message: 'Item deleted' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};