import Transaction from '@/models/Transaction';
import STATUS_CODES from "@/constants/statusCodes";
import connectDB from '@/utils/db';

export const getTransactions = async (req, res) => {
    try {
        await connectDB();
        const transactions = await Transaction.find().populate('item buyer seller');
        res.status(STATUS_CODES.OK).json(transactions);
        res.status(STATUS_CODES.OK).json({
            message: "Transactions retrieved",
            transactions
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};

export const getTransaction = async (req, res) => {
    try {
        await connectDB();
        if (!req.params || !req.params.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({message: 'Transaction ID is required'});
        }
        const transaction = await Transaction.findById(req.params.id).populate('item buyer seller');
        if (!transaction) return res.status(STATUS_CODES.NOT_FOUND).json({message: 'Transaction not found'});
        res.status(STATUS_CODES.OK).json({
            message: "Transaction retrieved",
            transaction
        });
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};

export const createTransaction = async (req, res) => {
    try {
        await connectDB();
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(STATUS_CODES.CREATED).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};

export const updateTransaction = async (req, res) => {
    try {
        await connectDB();
        if (!req.params || !req.params.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({message: 'Transaction ID is required'});
        }
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('item buyer seller');
        if (!transaction) return res.status(STATUS_CODES.NOT_FOUND).json({message: 'Transaction not found'});
        res.status(STATUS_CODES.OK).json(transaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        await connectDB();
        if (!req.params || !req.params.id) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({message: 'Transaction ID is required'});
        }
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) return res.status(STATUS_CODES.NOT_FOUND).json({message: 'Transaction not found'});
        res.status(STATUS_CODES.OK).json({message: 'Transaction deleted'});
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({message: 'Internal Server Error'});
    }
};