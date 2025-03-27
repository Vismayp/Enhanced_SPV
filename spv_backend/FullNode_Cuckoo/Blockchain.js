import Block1 from './Block.js';
import Transaction1 from './Transaction.js';

class Blockchain1 {
    constructor() {
        this.chain = [];
        this.createGenesisBlock();
    }

    createGenesisBlock() {
        // console.log("DEBUG: Creating genesis block"); // Debug print
        const genesisTransaction = new Transaction1("Genesis", "Network", 0, Date.now());
        const genesisBlock = new Block1("0", [genesisTransaction], 0);
        this.chain.push(genesisBlock);
        // console.log(`DEBUG: Genesis block created with ${genesisBlock.transactions.length} transactions`); // Debug print
    }

    addBlock(transactions) {
        // console.log(`DEBUG: Adding new block with ${transactions.length} transactions`); // Debug print
        if (!transactions.length) {
            // console.warn("WARNING: Attempting to add block with no transactions");
            return false;
        }

        const previousBlock = this.getLatestBlock();
        const newBlock = new Block1(previousBlock.header.calculateHash(), transactions, previousBlock.header.blockNumber + 1);
        this.chain.push(newBlock);
        // console.log(`DEBUG: Block added. Chain length: ${this.chain.length}`); // Debug print
        return newBlock;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
}

export default Blockchain1;
