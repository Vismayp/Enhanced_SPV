import faker from 'faker';
import fs from 'fs';
import path from 'path';

export default function generateClients(count = 100, initialBalance = 10000) {
    const clients = new Map();

    const filePath = path.join('clientNames.txt');

    let clientNames = [];
    if (fs.existsSync(filePath)) {
        clientNames = fs.readFileSync(filePath, 'utf8').split('\n').filter(Boolean);
    }

    if (clientNames.length < count) {
        for (let i = clientNames.length; i < count; i++) {
            const name = faker.name.findName();
            clientNames.push(name);
            clients.set(name, { balance: initialBalance });
        }

        // Update the file with new client names
        fs.writeFileSync(filePath, clientNames.join('\n'), 'utf8');
    } else {
        clientNames.forEach(name => {
            clients.set(name, { balance: initialBalance });
        });
    }

    return clients;
}



