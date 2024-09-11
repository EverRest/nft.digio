import mongoose from 'mongoose';

const BidSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bid || mongoose.model('Bid', BidSchema);