import '@nomicfoundation/hardhat-ignition-ethers';
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-ethers';
import { HardhatUserConfig } from 'hardhat/config';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.30',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.22',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.SEPOLIA_PROVIDER || 'https://ethereum-sepolia-rpc.publicnode.com',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    mainnet: {
      chainId: 1,
      url: process.env.MAINNET_PROVIDER || 'https://rpc.ankr.com/eth',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    polygon: {
      chainId: 137,
      url: process.env.POLYGON_PROVIDER || 'https://rpc.ankr.com/polygon',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    base: {
      chainId: 8453,
      url: process.env.BASE_PROVIDER || 'https://mainnet.base.org',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    optimism: {
      chainId: 10,
      url: process.env.OPTIMISM_PROVIDER || 'https://mainnet.optimism.io',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    lux_mainnet: {
      chainId: 96369,
      url: process.env.LUX_MAINNET_PROVIDER || 'https://api.lux.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    lux_testnet: {
      chainId: 96368,
      url: process.env.LUX_TESTNET_PROVIDER || 'https://testnet.api.lux.network',
      accounts: {
        mnemonic: process.env.MNEMONIC || 'light light light light light light light light light light light energy',
      },
      type: 'http',
    },
    localhost: {
      chainId: 1337, // Anvil default chain ID
      url: process.env.RPC_URL || 'http://127.0.0.1:8545',
      accounts: process.env.PRIVATE_KEY 
        ? [process.env.PRIVATE_KEY]
        : [
          // Anvil default accounts
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
          '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
          '0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a',
        ],
      type: 'http',
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  },
  sourcify: {
    enabled: false,
  },
  ignition: {
    strategyConfig: {
      create2: {
        salt:
          process.env.DAO_CREATE2_SALT ||
          '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
    },
  },
};

export default config;
