import { Address, getAddress } from 'viem';
import { abis } from '@fractal-framework/fractal-contracts';
import { Context } from 'ponder:registry';
import { getPages, PAGE_SIZE, SENTINEL_ADDRESS } from './common';

export type Module = {
  type: 'Azorius' | 'FractalModule';
  address: Address;
  strategies?: Address[]; // Only Azorius modules have strategies
};

export async function checkModule(
  context: Context,
  _address: Address,
): Promise<Module | null> {
  const address = getAddress(_address);

  const [
    domainSeparatorTypeHash,
    transactionTypeHash,
    strategiesResponse,
    fractalModuleAddress,
    controllers,
  ] = await context.client.multicall({
    contracts: [
      {
        abi: abis.Azorius,
        address,
        functionName: 'DOMAIN_SEPARATOR_TYPEHASH',
      },
      {
        abi: abis.Azorius,
        address,
        functionName: 'TRANSACTION_TYPEHASH',
      },
      {
        abi: abis.Azorius,
        address,
        functionName: 'getStrategies',
        args: [SENTINEL_ADDRESS, PAGE_SIZE],
      },
      {
        abi: abis.FractalModule,
        address,
        functionName: 'avatar',
      },
      {
        abi: abis.FractalModule,
        address,
        functionName: 'controllers',
        // don't care about the address, just want the controllers
        // call to be successful to determine if it's a Fractal module
        args: [SENTINEL_ADDRESS],
      },
    ],
    allowFailure: true,
  });

  // Azorius module
  if (
    domainSeparatorTypeHash.status === 'success' &&
    transactionTypeHash.status === 'success' &&
    strategiesResponse.status === 'success'
  ) {
    const strategies = [...strategiesResponse.result[0]];
    if (strategies.length === Number(PAGE_SIZE)) {
      const moreStrategies = await getPages(context, address, 'Azorius', 'getStrategies');
      strategies.push(...moreStrategies);
    }
    return {
      type: 'Azorius',
      address,
      strategies,
    };
  }

  // Fractal module
  if (
    fractalModuleAddress.status === 'success' &&
    controllers.status === 'success'
  ) {
    return {
      type: 'FractalModule',
      address,
    };
  }

  // Other module, ignore it
  return null;
}
