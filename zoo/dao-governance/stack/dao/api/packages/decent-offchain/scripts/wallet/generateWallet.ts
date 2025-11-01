// useful for generating a wallet for testing
// save the private key to .env
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);

console.log('Private Key:\n', privateKey);
console.log('Wallet Address:\n', account.address);
