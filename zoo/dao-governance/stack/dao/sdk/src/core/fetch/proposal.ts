import { Proposal } from '../types/Proposal';
import { genericFetchAndThrowIfError } from './common/generic';
import { routes } from './common/routes';
import {
  GetAllProposalsParams,
  CreateProposalParams,
  UpdateProposalParams,
  ProposalParams,
} from './common/params';

/**
 * Fetches all proposals for a specific DAO.
 * @param params - The parameters for fetching proposals.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.apiUrl - Optional API URL override.
 * @returns A promise that resolves to an array of proposals.
 */
export const getAllProposals = async (params: GetAllProposalsParams): Promise<Proposal[]> => {
  const { chainId, address, apiUrl } = params;
  const proposals = await genericFetchAndThrowIfError<Proposal[]>({
    route: routes.proposal(chainId, address),
    apiUrl,
  });
  return proposals;
};

/**
 * Fetches a specific proposal by its slug.
 * @param params - The parameters for fetching a proposal.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal.
 * @param params.apiUrl - Optional API URL override.
 * @returns A promise that resolves to the proposal.
 */
export const getProposal = async (params: ProposalParams): Promise<Proposal> => {
  const { chainId, address, slug, apiUrl } = params;
  const proposal = await genericFetchAndThrowIfError<Proposal>({
    route: `${routes.proposal(chainId, address)}/${slug}`,
    apiUrl,
  });
  return proposal;
};

/**
 * Creates a new proposal for a specific DAO.
 * @param params - The parameters for creating a proposal.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.proposal - The new proposal data.
 * @param params.apiUrl - Optional API URL override.
 * @returns A promise that resolves to the created proposal.
 */
export const createProposal = async (params: CreateProposalParams): Promise<Proposal> => {
  const { chainId, address, proposal, apiUrl } = params;
  const createdProposal = await genericFetchAndThrowIfError<Proposal>({
    route: routes.proposal(chainId, address),
    options: {
      method: 'POST',
      body: JSON.stringify(proposal),
    },
    apiUrl,
  });
  return createdProposal;
};

/**
 * Updates an existing proposal.
 * @param params - The parameters for updating a proposal.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal to update.
 * @param params.proposal - The updated proposal data.
 * @param params.apiUrl - Optional API URL override.
 * @returns A promise that resolves to the updated proposal.
 */
export const updateProposal = async (params: UpdateProposalParams): Promise<Proposal> => {
  const { chainId, address, slug, proposal, apiUrl } = params;
  const updatedProposal = await genericFetchAndThrowIfError<Proposal>({
    route: `${routes.proposal(chainId, address)}/${slug}`,
    options: {
      method: 'PUT',
      body: JSON.stringify(proposal),
    },
    apiUrl,
  });
  return updatedProposal;
};

/**
 * Deletes a proposal.
 * @param params - The parameters for deleting a proposal.
 * @param params.chainId - The ID of the chain.
 * @param params.address - The address of the DAO.
 * @param params.slug - The slug of the proposal to delete.
 * @param params.apiUrl - Optional API URL override.
 * @returns A promise that resolves when the proposal is deleted.
 */
export const deleteProposal = async (params: ProposalParams): Promise<void> => {
  const { chainId, address, slug, apiUrl } = params;
  await genericFetchAndThrowIfError<void>({
    route: `${routes.proposal(chainId, address)}/${slug}`,
    options: {
      method: 'DELETE',
    },
    apiUrl,
  });
};
