import express from "express";
import { lightCuckoo, nodeCuckoo, initiateTransactionCuckoo } from "../FullnodeAndClientManager.js";
import { clientTransactionsHistory_Cuckoo } from "../utils/clientsManager.js";

const router = express.Router();

router.get("/headers", (req, res) => {
    res.json({ headers: lightCuckoo.getBlockHeaders(nodeCuckoo) });
});

router.post("/transferCurrency", (req, res) => {
    const { sender, receiver, amount } = req.body;

    if (!sender || !receiver || !amount) {
        return res.status(400).json({ message: "Sender, receiver, and amount are required" });
    }

    try {
        const transaction = initiateTransactionCuckoo(sender, receiver, amount);
        res.json({ message: "Transaction added to pool for mining", transaction });
    } catch (error) {
        res.status(500).json({ message: "Transaction failed", error: error.message });
    }
});

router.get("/getMerkleProof", (req, res) => {
    const { txid, blockNumber } = req.body;
    try {
        const start = performance.now();
        const [proof, transactionHash, rootHash] = lightCuckoo.provideMerkleProof(txid, blockNumber, nodeCuckoo);
        const end = performance.now();
        const timeTaken = end - start;
        if (!proof) {
            return res.status(404).json({ message: "Merkle proof not found", timeTaken });
        }
        res.json({ proof, transactionHash, rootHash, timeTaken });
    } catch (error) {
        res.status(404).json({ message: "Failed to provide Merkle proof", error: error.message });
    }
});

router.get("/completedTransactions", (req, res) => {
    const { name } = req.body; // Extract client name from request body
    if (!name) {
        return res.status(400).json({ message: "Client name is required" });
    }

    const transactions = clientTransactionsHistory_Cuckoo.get(name);
    if (!transactions) {
        return res.status(404).json({ message: "No transactions found for this client" });
    }

    res.json({ name, transactions });
});



export default router;
