import crypto from 'crypto';


class BloomFilter {
    constructor(transactions, p = 0.05) {
        const n = transactions.length;
        this.size = Math.ceil(-(n * Math.log(p)) / (Math.log(2) ** 2));
        this.numHashes = Math.ceil((this.size / n) * Math.log(2));
        this.bitArray = new Array(this.size).fill(0);
        transactions.forEach(tx => this.add(tx.txid));
    }

    _hashes(item) {
        const itemBuffer = Buffer.from(item.toString());
        const hash1 = parseInt(crypto.createHash('sha256').update(itemBuffer).digest('hex'), 16);
        const hash2 = parseInt(crypto.createHash('md5').update(itemBuffer).digest('hex'), 16);
        return Array.from({ length: this.numHashes }, (_, i) => (hash1 + i * hash2) % this.size);
    }

    add(txid) {
        this._hashes(txid).forEach(hashVal => this.bitArray[hashVal] = 1);
    }

    check(txid) {
        return this._hashes(txid).every(hashVal => this.bitArray[hashVal]);
    }
}

export default BloomFilter;


// const transactions = Array.from({ length: 10000 }, (_, i) => ({ txid: i + 1 }));

// const bloomFilter = new BloomFilter(transactions);




