import { Address, getAddress, zeroAddress } from 'viem';
import { Context } from 'ponder:registry';
import { GnosisSafeL2Abi } from '../../abis/GnosisSafeL2';
import { getPages, GUARD_STORAGE_SLOT, PAGE_SIZE, SENTINEL_ADDRESS } from './common';

export async function safeInfo(context: Context, _address: Address) {
  const address = getAddress(_address);

  const [
    nonce,
    threshold,
    owners,
    version,
    modulesResponse,
  ] = await context.client.multicall({
    contracts: [
      {
        abi: GnosisSafeL2Abi,
        address,
        functionName: 'nonce',
      },
      {
        abi: GnosisSafeL2Abi,
        address,
        functionName: 'getThreshold',
      },
      {
        abi: GnosisSafeL2Abi,
        address,
        functionName: 'getOwners',
      },
      {
        abi: GnosisSafeL2Abi,
        address,
        functionName: 'VERSION',
      },
      {
        abi: GnosisSafeL2Abi,
        address,
        functionName: 'getModulesPaginated',
        args: [SENTINEL_ADDRESS, PAGE_SIZE],
      },
    ],
    allowFailure: false,
  });

  const guardStorageValue = await context.client.getStorageAt({
    address,
    slot: GUARD_STORAGE_SLOT,
  });

  const guard = guardStorageValue ? getAddress(`0x${guardStorageValue.slice(-40)}`) : zeroAddress;

  const modules: Address[] = [];
  if (modulesResponse[0].length < PAGE_SIZE) {
    modules.push(...modulesResponse[0]);
  } else {
    const moreModules = await getPages(context, address, 'GnosisSafeL2', 'getModulesPaginated');
    modules.push(...moreModules);
  }

  return {
    nonce,
    threshold,
    owners,
    modules,
    guard,
    version,
  };
}
