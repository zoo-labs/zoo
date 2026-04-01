import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import {
  MockERC20Votes,
  MockERC20Votes__factory,
  MockERC721,
  MockERC721__factory,
  MockVoteTracker,
  MockVoteTracker__factory,
  MockVotingWeight,
  MockVotingWeight__factory,
} from '../../typechain-types';

// ======================================================================
// INTERFACES
// ======================================================================

export interface MockVotingConfigContracts {
  votingWeight: MockVotingWeight;
  voteTracker: MockVoteTracker;
  token: MockERC20Votes | MockERC721;
}

// ======================================================================
// MOCK DEPLOYMENTS (For Unit Tests)
// ======================================================================

/**
 * Deploy a mock ERC20-based voting configuration for unit tests
 * Uses simplified mock contracts without proxies
 */
export async function deployMockERC20VotingConfig(
  strategyAddress: string,
  weightPerToken: bigint = 1n, // 1:1 ratio by default
): Promise<MockVotingConfigContracts> {
  const [signer] = await ethers.getSigners();

  // Deploy mock ERC20 token
  const token = await new MockERC20Votes__factory(signer).deploy();
  await token.waitForDeployment();

  // Deploy mock weight strategy
  const votingWeight = await new MockVotingWeight__factory(signer).deploy();
  await votingWeight.waitForDeployment();
  await votingWeight.initialize(await token.getAddress(), weightPerToken);

  // Deploy mock vote tracker
  const voteTracker = await new MockVoteTracker__factory(signer).deploy();
  await voteTracker.waitForDeployment();
  await voteTracker.initialize([strategyAddress]);

  return {
    votingWeight,
    voteTracker,
    token,
  };
}

/**
 * Deploy a mock ERC721-based voting configuration for unit tests
 * Uses simplified mock contracts without proxies
 */
export async function deployMockERC721VotingConfig(
  strategyAddress: string,
  weightPerToken: bigint = 1n, // 1:1 ratio by default
): Promise<MockVotingConfigContracts> {
  const [signer] = await ethers.getSigners();

  // Deploy mock NFT
  const token = await new MockERC721__factory(signer).deploy();
  await token.waitForDeployment();

  // Deploy mock weight strategy
  const votingWeight = await new MockVotingWeight__factory(signer).deploy();
  await votingWeight.waitForDeployment();
  await votingWeight.initialize(await token.getAddress(), weightPerToken);

  // Deploy mock vote tracker
  const voteTracker = await new MockVoteTracker__factory(signer).deploy();
  await voteTracker.waitForDeployment();
  await voteTracker.initialize([strategyAddress]);

  return {
    votingWeight,
    voteTracker,
    token,
  };
}

// ======================================================================
// TOKEN SETUP HELPERS
// ======================================================================

/**
 * Setup mock ERC20 token with balance and delegation for testing
 */
export async function setupMockERC20Token(
  token: MockERC20Votes,
  voter: SignerWithAddress,
  amount: bigint,
): Promise<void> {
  await token.mint(voter.address, amount);
  await token.connect(voter).delegate(voter.address);
}

/**
 * Setup mock ERC721 tokens for testing
 */
export async function setupMockERC721Tokens(
  token: MockERC721,
  owner: SignerWithAddress,
  tokenIds: number[],
): Promise<void> {
  for (const tokenId of tokenIds) {
    await token.mintToken(owner.address, tokenId);
  }
}

// ======================================================================
// COMMON HELPERS
// ======================================================================

/**
 * Helper to encode ERC721 vote data
 */
export function encodeERC721VoteData(tokenIds: number[]): string {
  return ethers.AbiCoder.defaultAbiCoder().encode(['uint256[]'], [tokenIds]);
}
