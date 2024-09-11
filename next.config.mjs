import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env') });

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        MNEMONIC: process.env.MNEMONIC,
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT
    }
};

export default nextConfig;