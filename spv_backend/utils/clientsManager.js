import generateClients from './generateClients.js';

export const clientTransactionsHistory = new Map();
export const clientTransactionsHistory_Bloom = new Map();
export const clientTransactionsHistory_Cuckoo = new Map();
let clientBalancesMap = null;

export const transactionLogs = [];
export const transactionLogs_Bloom = [];
export const transactionLogs_Cuckoo = [];

export function generateClientsList(count = 100, initialBalance = 10000) {
    clientBalancesMap = generateClients(count, initialBalance);
}

export function updateTransactionsHistory(block) {
    const { blockNumber, transactions } = block;

    transactions.forEach((transaction) => {
        const { sender, receiver, amount, timestamp, txid } = transaction;
        
        // Update sender's transaction history
        if (!clientTransactionsHistory.has(sender)) {
            clientTransactionsHistory.set(sender, { transactions: [] });
        }
        clientTransactionsHistory.get(sender).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });

        // Update receiver's transaction history
        if (!clientTransactionsHistory.has(receiver)) {
            clientTransactionsHistory.set(receiver, { transactions: [] });
        }
        clientTransactionsHistory.get(receiver).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });
        
        transactionLogs.push({ ...transaction, blockNumber });
    });
}

export function updateTransactionsHistoryBloom(block) {
    const { blockNumber, transactions } = block;

    transactions.forEach((transaction) => {
        const { sender, receiver, amount, timestamp, txid } = transaction;

        // Update sender's transaction history
        if (!clientTransactionsHistory_Bloom.has(sender)) {
            clientTransactionsHistory_Bloom.set(sender, { transactions: [] });
        }
        clientTransactionsHistory_Bloom.get(sender).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });

        // Update receiver's transaction history
        if (!clientTransactionsHistory_Bloom.has(receiver)) {
            clientTransactionsHistory_Bloom.set(receiver, { transactions: [] });
        }
        clientTransactionsHistory_Bloom.get(receiver).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });

        transactionLogs_Bloom.push({ ...transaction, blockNumber });
    });
}

export function updateTransactionsHistoryCuckoo(block) {
    const { blockNumber, transactions } = block;

    transactions.forEach((transaction) => {
        const { sender, receiver, amount, timestamp, txid } = transaction;

        // Update sender's transaction history
        if (!clientTransactionsHistory_Cuckoo.has(sender)) {
            clientTransactionsHistory_Cuckoo.set(sender, { transactions: [] });
        }
        clientTransactionsHistory_Cuckoo.get(sender).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });

        // Update receiver's transaction history
        if (!clientTransactionsHistory_Cuckoo.has(receiver)) {
            clientTransactionsHistory_Cuckoo.set(receiver, { transactions: [] });
        }
        clientTransactionsHistory_Cuckoo.get(receiver).transactions.push({
            txid,
            blockNumber,
            sender,
            receiver,
            amount,
            timestamp
        });

        transactionLogs_Cuckoo.push({ ...transaction, blockNumber });
    });
}


// export function generateTransactions(numTransactions = 10000) {
//     const transactions = [];
//     const clientNames = Array.from(clientBalancesMap.keys());

//     for (let i = 0; i < numTransactions; i++) {
//         const sender = clientNames[Math.floor(Math.random() * clientNames.length)];
//         let receiver = clientNames[Math.floor(Math.random() * clientNames.length)];

//         // Ensure sender ≠ receiver
//         while (receiver === sender) {
//             receiver = clientNames[Math.floor(Math.random() * clientNames.length)];
//         }

//         const maxAmount = clientBalancesMap.get(sender).balance; // Get sender's balance
//         if (maxAmount <= 0) continue;

//         const amount = parseFloat((Math.random() * Math.min(maxAmount, 50) + 1).toFixed(2)); // Random amount (1 - 50 or sender's balance)

//         // Create transaction
//         const transaction = {
//             sender,
//             receiver,
//             amount,
//             timestamp: Date.now(),
//             txid: generateTxid()
//         };

//         transactions.push(transaction);

//         // Update sender balance
//         clientBalancesMap.get(sender).balance -= amount;
//         // Update receiver balance
//         clientBalancesMap.get(receiver).balance += amount;
//     }

//     return { transactions };
// }

export function generateTransactions(numTransactions = 20000) {
    const transactions = [];
    const clientNames = Array.from(clientBalancesMap.keys());

    for (let i = 0; i < numTransactions; i++) {
        const sender = clientNames[0];
        let receiver = clientNames[1];

        // Ensure sender ≠ receiver
        while (receiver === sender) {
            receiver = clientNames[Math.floor(Math.random() * clientNames.length)];
        }

        const maxAmount = clientBalancesMap.get(sender).balance; // Get sender's balance
        if (maxAmount <= 0) continue;

        const amount = 0.001; // Random amount (1 - 50 or sender's balance)

        // Create transaction
        const transaction = {
            sender,
            receiver,
            amount,
            timestamp: Date.now(),
            txid: generateTxid()
        };

        transactions.push(transaction);

        // Update sender balance
        clientBalancesMap.get(sender).balance -= amount;
        // Update receiver balance
        clientBalancesMap.get(receiver).balance += amount;
    }

    return { transactions };
}


// function common for all type of blocks
export function performTransaction(sender, receiver, amount) {
    if (!clientBalancesMap.has(sender) || !clientBalancesMap.has(receiver)) {
        throw new Error('Sender or receiver does not exist.');
    }

    const senderBalance = clientBalancesMap.get(sender).balance;

    if (senderBalance < amount) {
        throw new Error('Insufficient balance');
    }

    clientBalancesMap.get(sender).balance -= amount;
    clientBalancesMap.get(receiver).balance += amount;

    // Create transaction object
    const transaction = {
        sender,
        receiver,
        amount,
        timestamp: Date.now(),
        txid: generateTxid()
    };

    return transaction;
}

function generateTxid() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

