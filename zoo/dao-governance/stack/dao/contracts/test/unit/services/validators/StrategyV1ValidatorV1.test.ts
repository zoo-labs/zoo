import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  IDeploymentBlock__factory,
  IERC165__factory,
  IFunctionValidator__factory,
  IVersion__factory,
  MockVotingStrategy,
  MockVotingStrategy__factory,
  StrategyV1ValidatorV1,
  StrategyV1ValidatorV1__factory,
} from '../../../../typechain-types';
import { IVotingTypes } from '../../../../typechain-types/contracts/interfaces/dao/deployables/IStrategyV1';
import { runDeploymentBlockTests } from '../../shared/deploymentBlockTests';
import { runSupportsInterfaceTests } from '../../shared/supportsInterfaceTests';

describe('StrategyV1ValidatorV1', function () {
  // contracts
  let validator: StrategyV1ValidatorV1;
  let mockStrategy: MockVotingStrategy;

  // signers
  let deployer: SignerWithAddress;
  let voter: SignerWithAddress;

  // test data
  const proposalId = 1;
  const voteType = 1; // YES

  beforeEach(async function () {
    [deployer, voter] = await ethers.getSigners();

    // Deploy mock strategy contract
    mockStrategy = await new MockVotingStrategy__factory(deployer).deploy(deployer.address);

    // Deploy validator
    validator = await new StrategyV1ValidatorV1__factory(deployer).deploy();
  });

  describe('validateOperation', function () {
    let votingConfigsData: IVotingTypes.VotingConfigVoteDataStruct[];

    beforeEach(async () => {
      votingConfigsData = [
        {
          configIndex: 0,
          voteData: ethers.ZeroHash,
        },
      ];
    });

    it('Should return false for incorrect function selector', async function () {
      const wrongCalldata = '0x12345678';
      const isValid = await validator.validateOperation(
        ethers.ZeroAddress,
        voter.address,
        await mockStrategy.getAddress(),
        wrongCalldata,
      );
      expect(isValid).to.be.false;
    });

    it('Should return true when the underlying strategy vote is valid', async function () {
      await mockStrategy.setValidStrategyVoteResult(true);

      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        proposalId,
        voteType,
        votingConfigsData,
        0, // lightAccountIndex
      ]);

      const isValid = await validator.validateOperation(
        ethers.ZeroAddress,
        voter.address,
        await mockStrategy.getAddress(),
        calldata,
      );

      expect(isValid).to.be.true;
    });

    it('Should return false when the underlying strategy vote is invalid', async function () {
      await mockStrategy.setValidStrategyVoteResult(false);

      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        proposalId,
        voteType,
        votingConfigsData,
        0, // lightAccountIndex
      ]);

      const isValid = await validator.validateOperation(
        ethers.ZeroAddress,
        voter.address,
        await mockStrategy.getAddress(),
        calldata,
      );

      expect(isValid).to.be.false;
    });

    it('should correctly decode and pass parameters to the strategy', async function () {
      await mockStrategy.setValidStrategyVoteResult(true);
      await mockStrategy.setExpectedValidStrategyVoteParams(
        proposalId,
        voteType,
        votingConfigsData,
      );

      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        proposalId,
        voteType,
        votingConfigsData,
        0, // lightAccountIndex
      ]);

      await expect(
        validator.validateOperation(
          ethers.ZeroAddress,
          voter.address,
          await mockStrategy.getAddress(),
          calldata,
        ),
      ).to.not.be.reverted;

      const isValid = await validator.validateOperation(
        ethers.ZeroAddress,
        voter.address,
        await mockStrategy.getAddress(),
        calldata,
      );
      expect(isValid).to.be.true;
    });

    it('should cause a revert if the validator decodes and passes the wrong params', async function () {
      const wrongProposalId = 999;
      await mockStrategy.setValidStrategyVoteResult(true);
      // Set the mock to expect the *correct* proposalId
      await mockStrategy.setExpectedValidStrategyVoteParams(
        proposalId, // expecting 1
        voteType,
        votingConfigsData,
      );

      // But create calldata with the *wrong* proposalId
      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        wrongProposalId, // encoded with 999
        voteType,
        votingConfigsData,
        0, // lightAccountIndex
      ]);

      // The validator should decode 999 and pass it to the mock.
      // The mock will see that 999 !== 1 and will revert.
      await expect(
        validator.validateOperation(
          ethers.ZeroAddress,
          voter.address,
          await mockStrategy.getAddress(),
          calldata,
        ),
      ).to.be.revertedWith('Mismatched proposalId');
    });

    it('should cause a revert if the validator passes the wrong voteType', async function () {
      const wrongVoteType = 0; // NO, while the mock expects YES (1)
      await mockStrategy.setValidStrategyVoteResult(true);
      await mockStrategy.setExpectedValidStrategyVoteParams(
        proposalId,
        voteType, // Expecting YES (1)
        votingConfigsData,
      );

      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        proposalId,
        wrongVoteType, // But encoded with NO (0)
        votingConfigsData,
        0, // lightAccountIndex
      ]);

      await expect(
        validator.validateOperation(
          ethers.ZeroAddress,
          voter.address,
          await mockStrategy.getAddress(),
          calldata,
        ),
      ).to.be.revertedWith('Mismatched voteType');
    });

    it('should cause a revert if the validator passes the wrong votingConfigsData', async function () {
      const wrongVotingConfigsData = [
        {
          configIndex: 0,
          voteData: '0x1234', // Different data
        },
      ];
      await mockStrategy.setValidStrategyVoteResult(true);
      await mockStrategy.setExpectedValidStrategyVoteParams(
        proposalId,
        voteType,
        votingConfigsData, // Expecting original data
      );

      const calldata = mockStrategy.interface.encodeFunctionData('castVote', [
        proposalId,
        voteType,
        wrongVotingConfigsData, // But encoded with different data
        0, // lightAccountIndex
      ]);

      await expect(
        validator.validateOperation(
          ethers.ZeroAddress,
          voter.address,
          await mockStrategy.getAddress(),
          calldata,
        ),
      ).to.be.revertedWith('Mismatched votingConfigsData');
    });
  });

  describe('ERC165 supportsInterface', function () {
    runSupportsInterfaceTests({
      getContract: () => validator,
      supportedInterfaceFactories: [
        IFunctionValidator__factory,
        IVersion__factory,
        IDeploymentBlock__factory,
        IERC165__factory,
      ],
    });
  });

  describe('Version', function () {
    it('should return the correct version', async function () {
      expect(await validator.version()).to.equal(1);
    });
  });

  describe('Deployment Block', function () {
    runDeploymentBlockTests({
      getContract: () => validator,
      isNonUpgradeable: true,
    });
  });
});
