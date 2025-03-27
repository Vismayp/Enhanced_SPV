import express from "express";
import { nodeBloom } from "../FullnodeAndClientManager.js";
import { transactionLogs_Bloom, updateTransactionsHistoryBloom } from "../utils/clientsManager.js"
const router = express.Router();

router.get("/", (req, res) => {
    const last10Transactions = transactionLogs_Bloom.slice(-10);
    res.json({ transactions: last10Transactions });
});

router.get("/pooledTransactions", (req, res) => {
    const pooledTransactions = nodeBloom.getTransactionsInPool();
    const last10PooledTransactions = pooledTransactions.slice(-10);
    res.json({ transactions: last10PooledTransactions });
});


router.post("/addBlock", (req, res) => {
    const newBlock = nodeBloom.createBlockFromPool();
    
    
    if(!newBlock) {
        return res.json({ message: "No transactions to mine"});
    }
    updateTransactionsHistoryBloom(newBlock);
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
