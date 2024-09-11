import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);