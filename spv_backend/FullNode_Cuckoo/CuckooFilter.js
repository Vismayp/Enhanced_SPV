import { randomBytes } from 'crypto';
import crypto from 'crypto';
class CuckooFilter {
    constructor(transactions, capacity = null, bucketSize = 2, maxKicks = 500) {
        // Calculate capacity if not provided
        this.capacity = capacity || transactions.length * 2;
        this.bucketSize = bucketSize;
        this.maxKicks = maxKicks;
        this.table = Array.from({ length: this.capacity }, () => []);

        // Automatically insert txids from transaction objects
        transactions.forEach(tx => {
            if (tx.txid) {
                this.add(tx.txid);
            }
        });
    }

    _hash(str) {
        const hash = crypto.createHash('sha256').update(String(str)).digest('hex');
        return parseInt(hash.slice(0, 8), 16) % this.capacity;
    }

    _fingerprint(txid) {
        return (txid).toString(16).slice(0, 4);
    }

    _getIndex(txid, fp) {
        let i1 = this._hash(txid);
        let i2 = (i1 ^ this._hash(fp)) % this.capacity;
        return [i1, i2];
    }

    add(txid) {
        const fp = this._fingerprint(txid);
        const [i1, i2] = this._getIndex(txid, fp);

        if (this.table[i1].length < this.bucketSize) {
            this.table[i1].push(fp);
            return true;
        }
        if (this.table[i2].length < this.bucketSize) {
            this.table[i2].push(fp);
            return true;
        }

        let i = Math.random() < 0.5 ? i1 : i2;
        let fpToEvict = fp;

        for (let n = 0; n < this.maxKicks; n++) {
            const randIndex = Math.floor(Math.random() * this.table[i].length);
            [this.table[i][randIndex], fpToEvict] = [fpToEvict, this.table[i][randIndex]];
            i = (i ^ this._hash(fpToEvict)) % this.capacity;

            if (this.table[i].length < this.bucketSize) {
                this.table[i].push(fpToEvict);
                return true;
            }
        }

        return false; // Could not insert (filter likely full)
    }

    check(txid) {
        const fp = this._fingerprint(txid);
        const [i1, i2] = this._getIndex(txid, fp);
        return this.table[i1].includes(fp) || this.table[i2].includes(fp);
    }

    delete(txid) {
        const fp = this._fingerprint(txid);
        const [i1, i2] = this._getIndex(txid, fp);

        let i1Idx = this.table[i1].indexOf(fp);
        let i2Idx = this.table[i2].indexOf(fp);

        if (i1Idx !== -1) {
            this.table[i1].splice(i1Idx, 1);
            return true;
        }
        if (i2Idx !== -1) {
            this.table[i2].splice(i2Idx, 1);
            return true;
        }
        return false;
    }
}


export default CuckooFilter;


// Generate 500 random transactions
// const transactions = Array.from({ length: 500 }, () => ({
//     txid: randomBytes(16).toString('hex'),
// }));

// const filter = new CuckooFilter(transactions);

// // Test all transactions
// let fn = 0;
// transactions.forEach(tx => {

//     if(filter.check(tx.txid)) {
//         fn++;
//     }
// });

// console.log(fn);

