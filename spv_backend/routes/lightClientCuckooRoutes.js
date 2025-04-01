import express from "express";
import { lightCuckoo, nodeCuckoo, initiateTransactionCuckoo } from "../FullnodeAndClientManager.js";
import { clientTransactionsHistory_Cuckoo, getClientNames } from "../utils/clientsManager.js";
import crypto from "crypto";
const router = express.Router();

router.get("/headers", (req, res) => {
    res.json({ headers: lightCuckoo.getBlockHeaders(nodeCuckoo) });
});

router.get("/clientNames", (req, res) => {
    const clientNames = getClientNames();
    res.json({ clients: clientNames });
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

router.post("/getMerkleProof", (req, res) => {
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

router.post("/completedTransactions", (req, res) => {
    const { name } = req.body; // Extract client name from request body
    if (!name) {
        return res.status(400).json({ message: "Client name is required" });
    }

    const transactions = clientTransactionsHistory_Cuckoo.get(name);
    const sortedTransactions = transactions.transactions
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20);

    const limitedTransactions = {
        name,
        transactions: { transactions: sortedTransactions }
    };

    res.json(limitedTransactions);
});


router.post("/verifyMerkleProof", (req, res) => {
    const { rootHash, transactionHash, proof } = req.body;
    const merkleProof = proof;
    if (!rootHash || !transactionHash || !merkleProof) {
        return res.status(400).json({ message: "Merkle root, transaction hash, and Merkle proof are required" });
    }

    try {
        const isValid = validateMerkleProof(rootHash, transactionHash, merkleProof);
        res.json({ isValid });
    } catch (error) {
        res.status(500).json({ message: "Failed to verify Merkle proof", error: error.message });
    }
});

function validateMerkleProof(rootHash, transactionHash, merkleProof) {
    let currentHash = transactionHash;

    for (const [direction, sibling] of merkleProof) {
        if (direction === 'right') {
            currentHash = crypto.createHash('sha256').update(currentHash + sibling).digest('hex');
        } else {
            currentHash = crypto.createHash('sha256').update(sibling + currentHash).digest('hex');
        }
    }

    return currentHash === rootHash;
}


export default router;
