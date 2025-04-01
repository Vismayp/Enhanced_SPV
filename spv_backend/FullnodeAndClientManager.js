import FullNode1 from './FullNode1/FullNode.js';
import LightClient1 from "./LightClient1/lightWeightClient.js";
import FullNodeBloom from './FullNode_Bloom/FullNode.js';
import LightClientBloom from './LightClient_Bloom/lightWeightClient.js';
import FullNodeCuckoo from './FullNode_Cuckoo/FullNode.js';
import LightClientCuckoo from './LightClient_Cuckoo/lightWeightClient.js';
import {
    generateClientsList, generateTransactions, updateTransactionsHistory, performTransaction,
    updateTransactionsHistoryBloom, updateTransactionsHistoryCuckoo
} from './utils/clientsManager.js';


export const node = new FullNode1();
export const light = new LightClient1();
export const transactionLogs = [];

export const lightBloom = new LightClientBloom();
export const nodeBloom = new FullNodeBloom();
export const transactionLogs_Bloom = [];

export const lightCuckoo = new LightClientCuckoo();
export const nodeCuckoo= new FullNodeCuckoo();
export const transactionLogs_Cuckoo = [];

export function generateBlockahin() {
    generateClientsList();
    for (let i = 0; i < 10; i++) {
        const transactions = generateTransactions().transactions;
        for (const tx of transactions) {
            node.addTransactionToPool(tx);
            nodeBloom.addTransactionToPool(tx);
            nodeCuckoo.addTransactionToPool(tx);
            transactionLogs.push(tx);
            transactionLogs_Bloom.push(tx);
            transactionLogs_Cuckoo.push(tx);
        }
        const newBlock = node.createBlockFromPool();
        const newBlockBloom = nodeBloom.createBlockFromPool();
        const newBlockCuckoo = nodeCuckoo.createBlockFromPool();
        updateTransactionsHistory(newBlock);
        updateTransactionsHistoryBloom(newBlockBloom);
        updateTransactionsHistoryCuckoo(newBlockCuckoo);
    }

    console.log(node.getLatestBlock().transactions.length);
    console.log(nodeBloom.getLatestBlock().transactions.length);
    console.log(nodeCuckoo.getLatestBlock().transactions.length);
    return node.getLatestBlock();
}

export function initiateTransaction(sender, receiver, amount) {
    const transaction =
        performTransaction(sender, receiver, amount);

    node.addTransactionToPool(transaction);
    return transaction;

}

export function initiateTransactionBloom(sender, receiver, amount) {
    const transaction =
        performTransaction(sender, receiver, amount);

    nodeBloom.addTransactionToPool(transaction);
    return transaction;
}

export function initiateTransactionCuckoo(sender, receiver, amount) {
    const transaction =
        performTransaction(sender, receiver, amount);

    nodeCuckoo.addTransactionToPool(transaction);
    return transaction;
}






