import { ethers } from 'ethers';
import STATUS_CODES from "@/constants/statusCodes";
import NFTCollectionABI from '@/contracts/NFTCollection.json';
import { authMiddleware } from '@/middleware/authMiddleware';
import { NFT } from '@/models/NFT';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const mintNFT = async (req, res) => {
    try {
        await authMiddleware(req, res, async () => {
            const { recipient, nftCollectionAddress } = req.body;
            const nftCollection = new ethers.Contract(nftCollectionAddress, NFTCollectionABI, signer);
            const tx = await nftCollection.mintTo(recipient);
            const receipt = await tx.wait();
            const tokenId = receipt.events[0].args.tokenId.toNumber();
            const newNFT = new NFT({
                tokenId,
                owner: recipient,
                metadataURI: `${process.env.BASE_URI}/${tokenId}`
            });
            await newNFT.save();
            res.status(STATUS_CODES.CREATED).json(newNFT);
        });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export default mintNFT;