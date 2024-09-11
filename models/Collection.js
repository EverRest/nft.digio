import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);