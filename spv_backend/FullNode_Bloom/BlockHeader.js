import crypto from 'crypto';

class BlockHeader1 {
    constructor(previousHash, merkleRoot, timestamp, blockNumber) {
        this.previousHash = previousHash;
        this.merkleRoot = merkleRoot;
        this.timestamp = timestamp;
        this.blockNumber = blockNumber;
    }

    calculateHash() {
        // Calculate the SHA-256 hash of the block header
        const headerString = `${this.previousHash}${this.merkleRoot}${this.timestamp}`;
        return crypto.createHash('sha256').update(headerString).digest('hex');
    }

    toString() {
        return `BlockHeader(Previous Hash: ${this.previousHash}, Merkle Root: ${this.merkleRoot}, Timestamp: ${this.timestamp})`;
    }
}

export default BlockHeader1;
