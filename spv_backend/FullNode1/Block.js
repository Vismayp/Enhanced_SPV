import crypto from 'crypto';
import BlockHeader1 from './BlockHeader.js';

class Block1 {
    constructor(previousHash, transactions, blockNumber) {
        // console.log(`DEBUG: Creating new block with ${transactions.length} transactions`); // Debug print
        this.transactions = transactions;
        this.merkleTree = this.buildMerkleTree(transactions);
        this.timestamp = Date.now();
        this.header = new BlockHeader1(previousHash, this.merkleTree[this.merkleTree.length - 1][0], this.timestamp, blockNumber);
        this.blockNumber = blockNumber
        // console.log(`DEBUG: Block created with ${this.transactions.length} transactions`); // Debug print
    }

    getTransactions() {
        // console.log(`DEBUG: Retrieving ${this.transactions.length} transactions from block`); // Debug print
        return this.transactions;
    }

    buildMerkleTree(transactions) {
        if (!transactions.length) {
            return [[crypto.createHash('sha256').update('empty').digest('hex')]];
        }

        // Create leaf nodes from transaction strings
        const leafLayer = transactions.map(tx => crypto.createHash('sha256').update(JSON.stringify(tx)).digest('hex'));
        if (leafLayer.length === 1) return [leafLayer];

        const merkleTree = [leafLayer];
        let currentLayer = leafLayer;

        while (currentLayer.length > 1) {
            let nextLayer = [];

            // Duplicate last element if odd number of elements
            if (currentLayer.length % 2 !== 0) {
                currentLayer.push(currentLayer[currentLayer.length - 1]);
            }

            for (let i = 0; i < currentLayer.length; i += 2) {
                let combined = currentLayer[i] + currentLayer[i + 1];
                let parentHash = crypto.createHash('sha256').update(combined).digest('hex');
                nextLayer.push(parentHash);
            }

            merkleTree.push(nextLayer);
            currentLayer = nextLayer;
        }

        return merkleTree;
    }
}

export default Block1;
