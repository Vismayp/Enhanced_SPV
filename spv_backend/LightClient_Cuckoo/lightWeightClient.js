import crypto from 'crypto';
class LightClient {
    constructor() {
        this.blockHeaders = [];
    }

    addBlockHeader(blockHeader) {
        this.blockHeaders.push(blockHeader);
    }

    getLatestBlockHeader() {
        return this.blockHeaders.length > 0 ? this.blockHeaders[this.blockHeaders.length - 1] : null;
    }

    provideMerkleProof(transactionId, blockNumber, fullNode) {
        this.updateBlockHeaders(fullNode);
        if (blockNumber >= this.blockHeaders.length) {
            console.log(`Block number ${blockNumber} is not available in the light client.`);
            return null;
        }

        const blockHeader = this.blockHeaders[blockNumber];
        // console.log(blockHeader);
        return fullNode.provideMerkleProof(transactionId, blockHeader);
    }

    verifyTransaction(transactionId, blockNumber, fullNode) {
        if (blockNumber >= this.blockHeaders.length) {
            console.log(`Block number ${blockNumber} is not available in the light client.`);
            return false;
        }

        // Get the block header at the given block number
        const blockHeader = this.blockHeaders[blockNumber];
        
        // Request the full node to provide the Merkle proof for the transaction
        const { merkleProof, transactionHash, rootHash } = fullNode.provideMerkleProof(transactionId, blockHeader);
        if (merkleProof) {
            // Validate the Merkle proof
            return this.validateMerkleProof(rootHash, transactionHash, merkleProof);
        }
        return false;
    }

    getBlockHeaders(node) {
        this.updateBlockHeaders(node);
        return this.blockHeaders;
    }

    updateBlockHeaders(fullNode) {
        this.blockHeaders = fullNode.getBlockHeaders();
    }

    validateMerkleProof(merkleRoot, transactionHash, merkleProof) {
        let currentHash = transactionHash;

        for (const [direction, sibling] of merkleProof) {
            if (direction === 'right') {
                currentHash = crypto.createHash('sha256').update(currentHash + sibling).digest('hex');
            } else {
                currentHash = crypto.createHash('sha256').update(sibling + currentHash).digest('hex');
            }
        }

        return currentHash === merkleRoot;
    }

    toString() {
        return `LightClient(BlockHeaders: ${this.blockHeaders.length})`;
    }
}

export default LightClient;
