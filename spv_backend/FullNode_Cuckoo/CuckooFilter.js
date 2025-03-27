import crypto from 'crypto';

class CuckooFilter {
    constructor(transactions, capacity = null, bucketSize = 4, maxKicks = 500) {
        this.capacity = capacity || transactions.length * 2;
        this.bucketSize = bucketSize;
        this.maxKicks = maxKicks;
        this.table = Array.from({ length: this.capacity }, () => []);

        transactions.forEach(tx => this.add(tx.txid));
    }

    _hashes(txid) {
        const txidBuffer = Buffer.from(txid.toString());
        const hash1 = parseInt(crypto.createHash('sha256').update(txidBuffer).digest('hex'), 16) % this.capacity;
        const hash2 = parseInt(crypto.createHash('md5').update(txidBuffer).digest('hex'), 16) % this.capacity;
        return [hash1, hash2];
    }

    _fingerprint(txid) {
        return crypto.createHash('sha256').update(txid.toString()).digest('hex').slice(0, 4);
    }

    add(txid) {
        let fp = this._fingerprint(txid);
        const [index1, index2] = this._hashes(txid);

        if (this.table[index1].length < this.bucketSize) {
            this.table[index1].push(fp);
            return true;
        }
        if (this.table[index2].length < this.bucketSize) {
            this.table[index2].push(fp);
            return true;
        }

        let index = Math.random() < 0.5 ? index1 : index2;
        for (let i = 0; i < this.maxKicks; i++) {
            const evictedIndex = Math.floor(Math.random() * this.table[index].length);
            const evictedFp = this.table[index][evictedIndex];
            this.table[index][evictedIndex] = fp;
            fp = evictedFp;
            const [index1, index2] = this._hashes(fp);
            index = index === index1 ? index2 : index1;

            if (this.table[index].length < this.bucketSize) {
                this.table[index].push(fp);
                return true;
            }
        }

        return false;
    }

    check(txid) {
        const fp = this._fingerprint(txid);
        const [index1, index2] = this._hashes(txid);
        return this.table[index1].includes(fp) || this.table[index2].includes(fp);
    }

    delete(txid) {
        const fp = this._fingerprint(txid);
        const [index1, index2] = this._hashes(txid);

        if (this.table[index1].includes(fp)) {
            this.table[index1] = this.table[index1].filter(f => f !== fp);
            return true;
        }
        if (this.table[index2].includes(fp)) {
            this.table[index2] = this.table[index2].filter(f => f !== fp);
            return true;
        }
        return false;
    }
}

export default CuckooFilter;


// const ids = Array.from({ length: 5000 }, (_, i) => ({ txid: (i + 1).toString() }));
// const filter = new CuckooFilter(ids);

// let falsePositives = 0;

// for (let i = 1100; i <= 1200; i++) {
//     if (filter.check(i.toString())) {
//         falsePositives++;
//     }
// }

// console.log(`False positives: ${falsePositives}`);
