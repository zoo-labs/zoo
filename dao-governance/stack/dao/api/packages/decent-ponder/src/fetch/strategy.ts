import { abis } from '@fractal-framework/fractal-contracts';
import { Context } from 'ponder:registry';
import { Address } from 'viem';

// we don't need hat ids
// will call `isProposer` to check if the user has the right to make a proposal
export type TokenStrategy = {
  type:
    'ERC20' |
    'ERC721';
  tokenAddress: Address;
  minProposerBalance?: bigint;
};

export async function checkStrategy(
  context: Context,
  strategyAddress: Address,
): Promise<TokenStrategy[] | null> {
  const [
    ERC20Token,
    ERC20MinProposerBalance,
    ERC721Token,
    ERC721MinProposerBalance,
  ] = await context.client.multicall({
    contracts: [
      {
        address: strategyAddress,
        abi: abis.LinearERC20Voting,
        functionName: 'governanceToken',
      },
      {
        address: strategyAddress,
        abi: abis.LinearERC20Voting,
        functionName: 'requiredProposerWeight',
      },
      {
        address: strategyAddress,
        abi: abis.LinearERC721Voting,
        functionName: 'getAllTokenAddresses',
      },
      {
        address: strategyAddress,
        abi: abis.LinearERC721Voting,
        functionName: 'proposerThreshold',
      },
    ],
  });

  // LinearERC20VotingV1
  if (
    ERC20Token.status === 'success' &&
    ERC20MinProposerBalance.status === 'success'
  ) {
    return [{
      type: 'ERC20',
      tokenAddress: ERC20Token.result,
      minProposerBalance: ERC20MinProposerBalance.result,
    }];
  }

  // LinearERC721VotingV1
  if (
    ERC721Token.status === 'success' &&
    ERC721MinProposerBalance.status === 'success'
  ) {
    return ERC721Token.result.map(tokenAddress => ({
      type: 'ERC721',
      tokenAddress,
      minProposerBalance: ERC721MinProposerBalance.result,
    }));
  }

  return null;
}
