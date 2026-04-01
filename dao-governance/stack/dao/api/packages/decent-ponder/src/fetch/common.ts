import { Context } from 'ponder:registry';
import { Address, zeroAddress } from 'viem';
import { abis } from '@fractal-framework/fractal-contracts';
import { GnosisSafeL2Abi } from '../../abis/GnosisSafeL2';

export const SENTINEL_ADDRESS: Address = '0x0000000000000000000000000000000000000001';

// keccak256("guard_manager.guard.address")
// https://github.com/safe-global/safe-smart-account/blob/1c8b24a0a438e8c2cd089a9d830d1688a47a28d5/contracts/base/GuardManager.sol#L66
export const GUARD_STORAGE_SLOT = '0x4a204f620c8c5ccdca3fd54d003badd85ba500436a431f0cbda4f558c93c34c8';

export const PAGE_SIZE = 10n;

export async function getPages(
  context: Context,
  address: Address,
  contract: 'Azorius' | 'GnosisSafeL2',
  functionName: 'getStrategies' | 'getModulesPaginated',
): Promise<Address[]> {
  const abi = contract === 'Azorius' ? abis.Azorius : GnosisSafeL2Abi;
  let startAddress: Address = SENTINEL_ADDRESS;
  let nextAddress: Address = zeroAddress;
  let results: Address[] = [];

  while (nextAddress !== SENTINEL_ADDRESS) {
    const response = await context.client.readContract({
      address,
      abi,
      functionName,
      args: [startAddress, PAGE_SIZE],
    });
    results.push(...response[0]);
    nextAddress = response[1];
    startAddress = nextAddress;
  }

  return results;
}
