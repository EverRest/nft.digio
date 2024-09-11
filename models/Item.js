import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' },
    createdAt: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);