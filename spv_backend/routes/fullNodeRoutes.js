import express from "express";
import { node } from "../FullnodeAndClientManager.js";
import { transactionLogs, updateTransactionsHistory } from "../utils/clientsManager.js"
const router = express.Router();

router.get("/", (req, res) => {
    const last10Transactions = transactionLogs.slice(-10);
    res.json({ transactions: last10Transactions });
});

router.get("/pooledTransactions", (req, res) => {
    const pooledTransactions = node.getTransactionsInPool();
    const last10PooledTransactions = pooledTransactions.slice(-10);
    res.json({ transactions: last10PooledTransactions });
});


router.post("/addBlock", (req, res) => {
    const newBlock = node.createBlockFromPool();
    
    if(!newBlock) {
        return res.json({ message: "No transactions to mine"});
    }
    
    updateTransactionsHistory(newBlock);
    const blockNumber = newBlock.blockNumber;
    const blockHash = newBlock.hash;
    const transactionsSize = newBlock.transactions.length;
    const timestamp = newBlock.timestamp;
    const header = newBlock.header;

    res.json({
        message: "Block added successfully",
        blockDetails: {
            blockNumber,
            blockHash,
            transactionsSize,
            timestamp,
            header
        }
    });
});

export default router;
