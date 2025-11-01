import { Address } from '../../types/Common';
import { SupportedChainId } from '../../types/Chains';

export const routes = {
  meta: '',
  health: 'health',
  chains: 'chains',
  auth: 'auth',
  dao: 'd',
  proposal: (chainId: SupportedChainId, address: Address) => {
    return `${routes.dao}/${chainId}/${address}/proposals`;
  },
  comment: (chainId: SupportedChainId, address: Address, slug: string) => {
    return `${routes.dao}/${chainId}/${address}/proposals/${slug}/comments`;
  },
};
