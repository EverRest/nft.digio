import mongoose from 'mongoose';

const nftSchema = new mongoose.Schema({
    tokenId: { type: Number, required: true },
    owner: { type: String, required: true },
    metadataURI: { type: String, required: true },
    forSale: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const NFT = mongoose.model('NFT', nftSchema);