import Collection from '@/models/Collection';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getCollections = async (req, res) => {
    try {
        await connectDB();
        console.log('Fetching collections');
        const collections = await Collection.find().populate('items');
        res.json(collections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const getCollection = async (req, res) => {
    try {
        await connectDB();
        const collection = await Collection.find().populate('items');
        if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
        res.status(STATUS_CODES.OK).json({
            message: "Collection retrieved",
           collection
        });
    } catch (error) {
        console.error('Error fetching collection:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const createCollection = async (req, res) => {
    try {
        await connectDB();
        const collection = new Collection(req.body);
        await collection.save();
        res.status(STATUS_CODES.CREATED).json(collection);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const updateCollection = async (req, res) => {
    try {
        await connectDB();
        if (!req.params || !req.params.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Collection ID is required' });
        }
        const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('items');
        if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
        res.json(collection);
    } catch (error) {
        console.error('Error updating collection:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        await connectDB();
        if (!req.params || !req.params.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'Collection ID is required' });
        }
        const collection = await Collection.findByIdAndDelete(req.params.id);
        if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
        res.json({ message: 'Collection deleted' });
    } catch (error) {
        console.error('Error deleting collection:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }
};