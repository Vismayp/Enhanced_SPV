class TransactionPool1 {
    constructor() {
        this.transactions = [];
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getTransactions() {
        return [...this.transactions]; // Return a copy to prevent unintended modifications
    }

    clearPool() {
        // console.log(`DEBUG: Clearing pool. Previous size: ${this.transactions.length}`); // Debug print
        this.transactions = [];
    }
}

export default TransactionPool1;
