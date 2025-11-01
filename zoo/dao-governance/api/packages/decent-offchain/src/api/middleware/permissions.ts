import { Context, Next } from 'hono';
import { erc20Abi } from 'viem';
import { ApiError } from '@/api/utils/responseFormatter';
import { getPublicClient } from '@/api/utils/publicClient';
import { abis } from '@fractal-framework/fractal-contracts';

export const permissionsCheck = async (c: Context, next: Next) => {
  const dao = c.get('dao');
  const user = c.get('user');
  if (!user) throw new ApiError('User not found', 401);

  const isSigner = Boolean(dao?.safe?.owners.includes(user.address));

  const strategyAddresses =
    dao.governanceModules?.flatMap(module => module.strategies.map(strategy => strategy.address)) ||
    [];
  const tokenAddresses =
    dao.governanceModules?.flatMap(module =>
      module.strategies.flatMap(strategy => strategy.votingTokens.map(token => token.address)),
    ) || [];

  try {
    const publicClient = getPublicClient(dao.chainId);

    // multicall each strategy address to see if the user address has isProposer permissions
    const allIsProposer = await publicClient.multicall({
      contracts: strategyAddresses.map(address => ({
        abi: abis.LinearERC20Voting,
        address,
        functionName: 'isProposer' as const, // ERC20, ERC721, & w/ hats all use this
        args: [user.address],
      })),
      allowFailure: false,
    });
    const isProposer = allIsProposer.some(result => Boolean(result));
    const balances = await publicClient.multicall({
      contracts: tokenAddresses.map(address => ({
        abi: erc20Abi,
        address,
        functionName: 'balanceOf' as const, // ERC20 & ERC721 both use this
        args: [user.address],
      })),
      allowFailure: false,
    });
    const totalBalance = balances.reduce((acc, balance) => acc + balance, 0n);
    const isVoter = totalBalance > 0n;
    const isModerator = false; // TODO: [ENG-554] add moderator permissions
    c.set('user', { ...user, permissions: { isProposer, isSigner, isVoter, isModerator } });
  } catch (e) {
    throw new ApiError(`Error checking permissions: ${e}`, 500);
  }
  await next();
};
