class Transaction1 {
    constructor(sender, receiver, amount, timestamp) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.timestamp = timestamp;
        this.txid = this.generateTxid();
    }

    generateTxid() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }

    toString() {
        return `${this.sender}${this.receiver}${this.amount}${this.timestamp}`;
    }
}

export default Transaction1;
