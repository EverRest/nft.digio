import Transaction from '@/models/Transaction';
import STATUS_CODES from "@/constants/statusCodes";

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find().populate('item buyer seller');
    res.json(transactions);
};

export const getTransaction = async (req, res) => {
    const transaction = await Transaction.findById(req.params.id).populate('item buyer seller');
    if (!transaction) return res.status(STATUS_CODES.NOT_FOUND).json({ message: 'Transaction not found' });
    res.json(transaction);
};

export const createTransaction = async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(STATUS_CODES.CREATED).json(transaction);
};