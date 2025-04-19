import Blockchain1 from "./Blockchain.js";
import TransactionPool1 from "./TransactionPool.js";
import crypto from 'crypto';

class FullNode1 {
    constructor() {
        console.log("DEBUG: Initializing FullNode");
        this.blockchain = new Blockchain1();
        this.transactionPool = new TransactionPool1();
    }

    getTransactionsInPool() {
        return this.transactionPool.getTransactions();
    }

    addTransactionToPool(transaction) {
        this.transactionPool.addTransaction(transaction);
    }

    createBlockFromPool() {
        const transactions = this.transactionPool.getTransactions();

        if (transactions.length === 0) {
            return false;
        }

        const newBlock = this.blockchain.addBlock(transactions);
        if (newBlock) {
            this.transactionPool.clearPool();
            return newBlock;
        }
        return false;
    }

    getLatestBlock() {
        return this.blockchain.getLatestBlock();
    }

    provideMerkleProof(transactionId, blockHeader) {
        for (const block of this.blockchain.chain) {
            if (block.header.calculateHash() === blockHeader.calculateHash()) {
                // console.log(block.staticAccumulator.check(transactionId.toString()));
                if (!block.staticAccumulator.check(transactionId)) {
                    return [null, null, null];
                }
                const transactionFound = block.transactions.find(tx => tx.txid === transactionId);
                // console.log("TransFound",transactionFound);
                if (transactionFound) {
                    return this.generateMerkleProof(block, transactionFound);
                }
                return [null, null, null];
            }
        }
        return [null, null, null];
    }

    generateMerkleProof(block, transaction) {
        const transactionHash = crypto.createHash('sha256').update(JSON.stringify(transaction)).digest('hex');
        const leafLayer = block.merkleTree[0];
        // console.log(leafLayer);
        // console.log(transactionHash);
        
        const currentIndex = leafLayer.indexOf(transactionHash);
        if (currentIndex === -1) {
            console.log("DEBUG: Transaction hash not found in leaf layer");
            return null;
        }

        let proof = [];
        let index = currentIndex;
        let currentHash = transactionHash;

        for (let layer of block.merkleTree.slice(0, -1)) {
            if (index % 2 === 0) {
                proof.push(["right", layer[index + 1] || layer[index]]);
            } else {
                proof.push(["left", layer[index - 1]]);
            }
            index = Math.floor(index / 2);

            const [direction, sibling] = proof[proof.length - 1];
            currentHash = direction === "right"
                ? crypto.createHash('sha256').update(currentHash + sibling).digest('hex')
                : crypto.createHash('sha256').update(sibling + currentHash).digest('hex');
        }

        
        return [proof, transactionHash, block.merkleTree[block.merkleTree.length - 1][0]];
    }

    getBlockHeaders() {
        return this.blockchain.chain.map(block => block.header);
    }

    toString() {
        return `FullNode(Blocks: ${this.blockchain.chain.length}, Transactions in Pool: ${this.transactionPool.transactionCount()})`;
    }
}


export default FullNode1;