// @ts-ignore
import { ethers } from "hardhat";
import {
  ZooAuction,
  ZooMarket,
  ZooMedia,
  ZooMarket__factory,
  ZooMedia__factory,
  ZooToken__factory,
  ZooKeeper__factory,
  BadBidder,
  BadERC721,
  TestERC721,
  ZooToken,
} from "../types";
import { sha256 } from "ethers/lib/utils";
import Decimal from "../utils/Decimal";
import { BigNumber, BigNumberish } from "ethers";
import { MaxUint256, AddressZero } from '@ethersproject/constants';
import { generatedWallets } from '../utils/generatedWallets';
import { JsonRpcProvider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { Wallet } from '@ethersproject/wallet';
import {
  recoverTypedMessage,
  recoverTypedSignature,
  signTypedData,
} from 'eth-sig-util';
import {
  bufferToHex,
  ecrecover,
  fromRpcSig,
  pubToAddress,
} from 'ethereumjs-util';
import { toUtf8Bytes } from 'ethers/lib/utils';
import { keccak256 } from '@ethersproject/keccak256';

let provider = new JsonRpcProvider();
let [deployerWallet] = generatedWallets(provider);

export async function deployCurrency() {
  const currency = await new ZooToken__factory(deployerWallet).deploy();
  return currency.address;
}

export async function mintCurrency(
  currency: string,
  to: string,
  value: number
) {
  await ZooToken__factory.connect(currency, deployerWallet).mint(to, value);
}

export async function approveCurrency(
  currency: string,
  spender: string,
  owner: Wallet
) {
  await ZooToken__factory.connect(currency, owner).approve(spender, MaxUint256);
}
export async function getBalance(currency: string, owner: string) {
  return ZooToken__factory.connect(currency, deployerWallet).balanceOf(owner);
}

export function toNumWei(val: BigNumber) {
  return parseFloat(formatUnits(val, 'wei'));
}

export type EIP712Sig = {
  deadline: BigNumberish;
  v: any;
  r: any;
  s: any;
};

export async function signPermit(
  owner: Wallet,
  toAddress: string,
  tokenAddress: string,
  tokenId: number,
  chainId: number
) {
  return new Promise<EIP712Sig>(async (res, reject) => {
    let nonce;
    const mediaContract = ZooMedia__factory.connect(tokenAddress, owner);

    try {
      nonce = (
        await mediaContract.permitNonces(owner.address, tokenId)
      ).toNumber();
    } catch (e) {
      console.error('NONCE', e);
      reject(e);
      return;
    }

    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    const name = await mediaContract.name();

    try {
      const sig = signTypedData(Buffer.from(owner.privateKey.slice(2), 'hex'), {
        data: {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            Permit: [
              { name: 'spender', type: 'address' },
              { name: 'tokenId', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          primaryType: 'Permit',
          domain: {
            name,
            version: '1',
            chainId,
            verifyingContract: mediaContract.address,
          },
          message: {
            spender: toAddress,
            tokenId,
            nonce,
            deadline,
          },
        },
      });
      const response = fromRpcSig(sig);
      res({
        r: response.r,
        s: response.s,
        v: response.v,
        deadline: deadline.toString(),
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export async function signMintWithSig(
  owner: Wallet,
  tokenAddress: string,
  creator: string,
  contentHash: string,
  metadataHash: string,
  creatorShare: BigNumberish,
  chainId: number
) {
  return new Promise<EIP712Sig>(async (res, reject) => {
    let nonce;
    const mediaContract = ZooMedia__factory.connect(tokenAddress, owner);

    try {
      nonce = (await mediaContract.mintWithSigNonces(creator)).toNumber();
    } catch (e) {
      console.error('NONCE', e);
      reject(e);
      return;
    }

    const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24; // 24 hours
    const name = await mediaContract.name();

    try {
      const sig = signTypedData(Buffer.from(owner.privateKey.slice(2), 'hex'), {
        data: {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            MintWithSig: [
              { name: 'contentHash', type: 'bytes32' },
              { name: 'metadataHash', type: 'bytes32' },
              { name: 'creatorShare', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          primaryType: 'MintWithSig',
          domain: {
            name,
            version: '1',
            chainId,
            verifyingContract: mediaContract.address,
          },
          message: {
            contentHash,
            metadataHash,
            creatorShare,
            nonce,
            deadline,
          },
        },
      });
      const response = fromRpcSig(sig);
      res({
        r: response.r,
        s: response.s,
        v: response.v,
        deadline: deadline.toString(),
      });
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export const THOUSANDTH_ZOO = ethers.utils.parseUnits(
  "0.001",
  "ether"
) as BigNumber;
export const TENTH_ZOO = ethers.utils.parseUnits("0.1", "ether") as BigNumber;
export const ONE_ZOO = ethers.utils.parseUnits("1", "ether") as BigNumber;
export const TWO_ZOO = ethers.utils.parseUnits("2", "ether") as BigNumber;

export const deployZooToken = async () => {
  return (await (await ethers.getContractFactory("ZooToken")).deploy()) as ZooToken;
}

export const deployOtherNFTs = async () => {
  const bad = (await (
    await ethers.getContractFactory("BadERC721")
  ).deploy()) as BadERC721;
  const test = (await (
    await ethers.getContractFactory("TestERC721")
  ).deploy()) as TestERC721;

  return { bad, test };
};

export const deployZooProtocol = async (tokenAddress) => {
  const [deployer] = await ethers.getSigners();
  const token = await (await new ZooToken__factory(deployer).deploy()).deployed();
  // const drop = await (await new ZooDrop__factory(deployer).deploy()).deployed();
  const market = await (await new ZooMarket__factory(deployer).deploy()).deployed();
  const media = await (await new ZooMedia__factory(deployer).deploy("ANML", "ZooAnimals")).deployed();
  const zookeeper = await (await new ZooKeeper__factory(deployer).deploy()).deployed()
  await market.configure(zookeeper.address, media.address);
  await media.configure(zookeeper.address, market.address);
  // await drop.configure(zookepeer, media);
  return { market, media };
};

export const deployBidder = async (auction: string, nftContract: string) => {
  return (await (
    await (await ethers.getContractFactory("BadBidder")).deploy(
      auction,
      nftContract
    )
  ).deployed()) as BadBidder;
};

export const mint = async (media: ZooMedia) => {
  const metadataHex = ethers.utils.formatBytes32String("{}");
  const metadataHash = await sha256(metadataHex);
  const hash = ethers.utils.arrayify(metadataHash);
  await media.mint(
    {
      tokenURI: "cryptozoo.co",
      metadataURI: "cryptozoo.co",
      contentHash: hash,
      metadataHash: hash,
    },
    {
      prevOwner: Decimal.new(0),
      owner: Decimal.new(85),
      creator: Decimal.new(15),
    }
  );
};

export const approveAuction = async (
  media: ZooMedia,
  auctionHouse: ZooAuction
) => {
  await media.approve(auctionHouse.address, 0);
};

export const revert = (messages: TemplateStringsArray) =>
  `VM Exception while processing transaction: revert ${messages[0]}`;
