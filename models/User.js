import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    wallets: { type: [String], default: [] },
    profile: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        bio: { type: String, default: '' },
        mood: { type: String, default: '' },
        profileImage: { type: String, default: '' },
        coverImage: { type: String, default: '' },
        socialLinks: {
            twitter: { type: String, default: '' },
            instagram: { type: String, default: '' },
            website: { type: String, default: '' },
            discord: { type: String, default: '' },
            facebook: { type: String, default: '' },
            telegram: { type: String, default: '' },
        },
    },
    verified: { type: Boolean, default: false },
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
    role: { type: String, default: 'user' },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);