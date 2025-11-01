import { createWalletClient, getContract, http, Address } from 'viem';
import { abis } from '@fractal-framework/fractal-contracts';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { signTypedData } from 'viem/actions';

const PRIVATE_KEY = process.env.TEST_PRIVATE_KEY_1 as `0x${string}`;

if (!PRIVATE_KEY) throw new Error('TEST_PRIVATE_KEY_1 is not set');

const tokenAddress = '0x4e885bf7370499074ef59df80be1f97b590066e2';

const walletClient = createWalletClient({
  account: privateKeyToAccount(PRIVATE_KEY),
  chain: base,
  transport: http(process.env.PONDER_RPC_URL_8453),
});

const contract = getContract({
  address: tokenAddress,
  abi: abis.VotesERC20,
  client: walletClient,
});

async function generateDelegationSignature(delegatee: Address, nonce: bigint, expiry: bigint) {
  const account = walletClient.account;
  if (!account) throw new Error('No account configured');

  const chainId = await walletClient.getChainId();

  // Get domain data for EIP-712 signing
  const domain = {
    name: await contract.read.name(),
    version: '1',
    chainId,
    verifyingContract: tokenAddress as Address,
  };

  // Define the types for EIP-712 signing
  const types = {
    Delegation: [
      { name: 'delegatee', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'expiry', type: 'uint256' },
    ],
  };

  // Create the message value
  const message = {
    delegatee,
    nonce,
    expiry,
  };

  // Sign the typed data
  const signature = await signTypedData(walletClient, {
    account,
    domain,
    types,
    primaryType: 'Delegation',
    message,
  });

  // Split signature into v, r, s components
  const r = signature.slice(0, 66) as `0x${string}`;
  const s = `0x${signature.slice(66, 130)}` as `0x${string}`;
  const v = parseInt(signature.slice(130), 16);

  return {
    delegatee,
    nonce,
    expiry,
    v,
    r,
    s,
  };
}

async function main() {
  // Example values - adjust as needed
  const delegatee = walletClient.account?.address;
  const nonce = await contract.read.nonces([walletClient.account?.address]);
  const expiry = BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hour from now

  const sigValues = await generateDelegationSignature(delegatee, nonce, expiry);

  console.log('Delegation Signature Values:');
  console.log({
    delegatee: sigValues.delegatee,
    nonce: sigValues.nonce.toString(),
    expiry: sigValues.expiry.toString(),
    v: sigValues.v,
    r: sigValues.r,
    s: sigValues.s,
  });
}

main().catch(console.error);
