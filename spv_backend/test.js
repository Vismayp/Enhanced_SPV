import faker from 'faker';
import FullNode1 from './FullNode1/FullNode.js';
import LightClient1 from "./LightClient1/lightWeightClient.js";

const node = new FullNode1();
const light = new LightClient1();

function generateRandomTransactions(minCount = 10, maxCount = 20) {
    const numTransactions = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    const transactions = [];

    for (let i = 0; i < numTransactions; i++) {
        let sender = faker.name.findName();
        let receiver = faker.name.findName();
        while (receiver === sender) {
            receiver = faker.name.findName();
        }

        const amount = (Math.random() * 999 + 1).toFixed(2); // Random amount between 1 and 1000
        const timestamp = Date.now();

        const transaction = { sender, receiver, amount, timestamp };
        transactions.push(transaction);
    }

    return transactions;
}

function testBlockchain() {
    for (let i = 0; i < 10; i++) {
        const randomTransactions = generateRandomTransactions();
        for (const tx of randomTransactions) {
            node.addTransactionToPool(tx);
        }
        node.createBlockFromPool();
    }

    return node.getLatestBlock();
}

// const lastBlock = testBlockchain();
// console.log(`Latest block transactions: ${lastBlock.transactions.length}`);

// const data = {
//     "proof": [
//         [
//             "left",
//             "06e5ca553b2728788a8f28e6529492a20f9927d61581e37de6eae1eaaa30ee9e"
//         ],
//         [
//             "right",
//             "47ce31b668da7e0702603da3b1c26245608683231a383063f7ebadbaa398a278"
//         ],
//         [
//             "left",
//             "cb2bcc2ca3b15875200f9fa836cbe919322467837485d89f666377d9533eb2e8"
//         ],
//         [
//             "right",
//             "868546e8650c257c563db411ea793ac485bdf2711c92281767a9e33e9ca4aab7"
//         ],
//         [
//             "right",
//             "6f754b57b47cad65ea311b9b02370a90710792c1eb351741e43a0bad04a25aec"
//         ],
//         [
//             "right",
//             "f0e477047be13e571849522fb3334b63da9d129b2483d9f79fea1f03dbb9cea9"
//         ],
//         [
//             "right",
//             "72f53dbb0b3100319853795a65dd1eb95116a14b0607f869ff7949a8cf4d9f7c"
//         ]
//     ],
//         "transactionHash": "c5c55cfbf51c18640fb18834a171e92d02c8e1099e364371f27f9620417f1e49",
//             "rootHash": "9667d2d863fcf4cbab8d4aa2108b896a6064d8d63d7e5a70e20d398ff4f5f5dc"
// }

// const merkleProof = data.proof;
// const transactionHash = data.transactionHash;
// const rootHash = data.rootHash;

// const isValid = light.validateMerkleProof(rootHash, transactionHash, merkleProof);
// console.log(`Is Merkle proof valid? ${isValid}`);