import { loadFixture, mine, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  ClockModeLibTester,
  ClockModeLibTester__factory,
  MockBlockNumberToken,
  MockBlockNumberToken__factory,
  MockNonIERC6372Token,
  MockNonIERC6372Token__factory,
  MockRevertingToken,
  MockRevertingToken__factory,
  MockTimestampToken,
  MockTimestampToken__factory,
} from '../../../typechain-types';

// Define ClockMode enum to match Solidity for convenience
enum ClockMode {
  Timestamp,
  BlockNumber,
}

describe('ClockModeLib', () => {
  async function deployFixtures() {
    const [deployer] = await ethers.getSigners();

    const timestampToken: MockTimestampToken = await new MockTimestampToken__factory(
      deployer,
    ).deploy();

    const blockNumberToken: MockBlockNumberToken = await new MockBlockNumberToken__factory(
      deployer,
    ).deploy();

    const revertingToken: MockRevertingToken = await new MockRevertingToken__factory(
      deployer,
    ).deploy();

    const nonIERC6372Token: MockNonIERC6372Token = await new MockNonIERC6372Token__factory(
      deployer,
    ).deploy();

    const clockModeLibTester: ClockModeLibTester = await new ClockModeLibTester__factory(
      deployer,
    ).deploy();

    return {
      timestampToken,
      blockNumberToken,
      revertingToken,
      nonIERC6372Token,
      clockModeLibTester,
      deployer,
    };
  }

  describe('getClockMode(address)', () => {
    it('should return Timestamp for a token returning "mode=timestamp"', async () => {
      const { clockModeLibTester, timestampToken } = await loadFixture(deployFixtures);
      expect(
        await clockModeLibTester.getClockModeFromLib(await timestampToken.getAddress()),
      ).to.equal(ClockMode.Timestamp);
    });

    it('should return BlockNumber for a token returning a different mode string', async () => {
      const { clockModeLibTester, blockNumberToken } = await loadFixture(deployFixtures);
      expect(
        await clockModeLibTester.getClockModeFromLib(await blockNumberToken.getAddress()),
      ).to.equal(ClockMode.BlockNumber);
    });

    it('should return BlockNumber if CLOCK_MODE() reverts', async () => {
      const { clockModeLibTester, revertingToken } = await loadFixture(deployFixtures);
      expect(
        await clockModeLibTester.getClockModeFromLib(await revertingToken.getAddress()),
      ).to.equal(ClockMode.BlockNumber);
    });

    it('should return BlockNumber for a token not implementing IERC6372 (call reverts)', async () => {
      const { clockModeLibTester, nonIERC6372Token } = await loadFixture(deployFixtures);
      expect(
        await clockModeLibTester.getClockModeFromLib(await nonIERC6372Token.getAddress()),
      ).to.equal(ClockMode.BlockNumber);
    });
  });

  describe('getCurrentPoint(ClockMode)', () => {
    it('should return block.timestamp for Timestamp mode', async () => {
      const { clockModeLibTester } = await loadFixture(deployFixtures);
      // Advance time a bit to ensure it's not 0
      await time.increase(60);
      const currentBlockTimestamp = await time.latest();
      const point = await clockModeLibTester.getCurrentPointFromLib(ClockMode.Timestamp);
      expect(point).to.equal(currentBlockTimestamp);
    });

    it('should return block.number for BlockNumber mode', async () => {
      const { clockModeLibTester } = await loadFixture(deployFixtures);
      // Mine a few blocks to ensure it's not 0 or 1
      await mine(5);
      const currentBlockNumber = await time.latestBlock();
      expect(await clockModeLibTester.getCurrentPointFromLib(ClockMode.BlockNumber)).to.equal(
        currentBlockNumber,
      );
    });
  });
});
