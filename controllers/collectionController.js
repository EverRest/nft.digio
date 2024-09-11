import Collection from '@/models/Collection';
import STATUS_CODES from "@/constants/statusCodes";

export const getCollections = async (req, res) => {
    const collections = await Collection.find().populate('items');
    res.json(collections);
};

export const getCollection = async (req, res) => {
    const collection = await Collection.findById(req.params.id).populate('items');
    if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
    res.json(collection);
};

export const createCollection = async (req, res) => {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(STATUS_CODES.CREATED).json(collection);
};

export const updateCollection = async (req, res) => {
    const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('items');
    if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
    res.json(collection);
};

export const deleteCollection = async (req, res) => {
    const collection = await Collection.findByIdAndDelete(req.params.id);
    if (!collection) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Collection not found' });
    res.json({ message: 'Collection deleted' });
};