import { Address, getAddress } from 'viem';
import { Context } from 'ponder:registry';
import { safeInfo } from './safe';
import { checkModule } from './modules';
import { checkStrategy } from './strategy';
import {
  GovernanceModuleInsert,
  VotingStrategyInsert,
  VotingTokenInsert,
  SignerInsert,
  SignerToDaoInsert,
} from 'ponder:schema';

export type GovernanceInsert = {
  address: Address;
  threshold: number;
  signers: SignerInsert[];
  signerToDaos: SignerToDaoInsert[];
  governanceModules: GovernanceModuleInsert[];
  votingStrategies: VotingStrategyInsert[];
  votingTokens: VotingTokenInsert[];
  fractalModuleAddress: Address | null;
  guard: Address;
  version: string;
};

export async function fetchGovernance(
  context: Context,
  _safeAddress: Address,
): Promise<GovernanceInsert> {
  try {
    const safeAddress = getAddress(_safeAddress);
    const daoChainId = context.chain.id;
    const { threshold, owners, version, guard, modules } = await safeInfo(context, safeAddress);

    const signers: SignerInsert[] = owners.map(owner => ({
      address: owner,
    }));

    const signerToDaos: SignerToDaoInsert[] = signers.map(signer => ({
      address: signer.address,
      daoChainId,
      daoAddress: safeAddress,
    }));

    let fractalModuleAddress: Address | null = null;
    const governanceModules: GovernanceModuleInsert[] = [];
    const votingStrategies: VotingStrategyInsert[] = [];
    const votingTokens: VotingTokenInsert[] = [];

    await Promise.all(
      modules.map(async m => {
        const module = await checkModule(context, m);
        if (!module) return null;
        if (module.type === 'FractalModule') {
          fractalModuleAddress = module.address;
          return;
        }

        // Not a FractalModule then
        // Format governanceModules for the database
        governanceModules.push({
          address: module.address,
          daoChainId,
          daoAddress: safeAddress,
        });

        const strategyAddresses = module.strategies;
        if (!strategyAddresses) return;

        await Promise.all(strategyAddresses.map(async strategyAddress => {
          const tokenStrategies = await checkStrategy(context, strategyAddress);
          if (!tokenStrategies) return;
          tokenStrategies.forEach(ts => {
            votingStrategies.push({
              address: strategyAddress,
              governanceModuleId: module.address,
              minProposerBalance: ts.minProposerBalance?.toString() || '0',
            });

            votingTokens.push({
              address: ts.tokenAddress,
              votingStrategyId: strategyAddress,
              type: ts.type,
            });
          });
        }));
      })
    );

    return {
      address: safeAddress,
      threshold: Number(threshold ? threshold : 0),
      signers,
      signerToDaos,
      governanceModules,
      votingStrategies,
      votingTokens,
      fractalModuleAddress,
      guard,
      version,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch safe: ${_safeAddress}`);
  }
}
