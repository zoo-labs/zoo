import { createConfig, factory } from 'ponder';
import { getAbiItem, http } from 'viem';
import { KeyValuePairsAbi } from './abis/KeyValuePairsAbi';
import { FractalRegistryAbi } from './abis/FractalRegistry';
import { AzoriusAbi } from './abis/Azorius';
import { ZodiacModuleProxyFactoryAbi } from './abis/ZodiacModuleProxyFactory';

export default createConfig({
  chains: {
    // sepolia: {
    //   chainId: 11155111,
    //   transport: http(process.env.PONDER_RPC_URL_11155111),
    // },
    mainnet: {
      id: 1,
      rpc: http(process.env.PONDER_RPC_URL_1),
    },
    base: {
      id: 8453,
      rpc: http(process.env.PONDER_RPC_URL_8453),
    },
    optimism: {
      id: 10,
      rpc: http(process.env.PONDER_RPC_URL_10),
    },
    polygon: {
      id: 137,
      rpc: http(process.env.PONDER_RPC_URL_137),
    },
  },
  contracts: {
    KeyValuePairs: {
      abi: KeyValuePairsAbi,
      chain: {
        // sepolia: {
        //   address: "0xC0E08581b70cF745770154f3E9a9A8890198b024",
        //   startBlock: 4916643,
        // },
        mainnet: {
          address: '0x535B64f9Ef529Ac8B34Ac7273033bBE67B34f131',
          startBlock: 17389311,
        },
        base: {
          address: '0x535B64f9Ef529Ac8B34Ac7273033bBE67B34f131',
          startBlock: 12996645,
        },
        optimism: {
          address: '0x535B64f9Ef529Ac8B34Ac7273033bBE67B34f131',
          startBlock: 118640420,
        },
        polygon: {
          address: '0x68e3b985B93eA0a10178c7ae919299699559Aaab',
          startBlock: 43952879,
        },
      },
    },
    FractalRegistry: {
      abi: FractalRegistryAbi,
      chain: {
        // sepolia: {
        //   address: "0x4791FF2a6E84F012402c0679C12Cb1d9260450A6",
        //   startBlock: 4916634,
        // },
        mainnet: {
          address: '0x023BDAEFeDDDdd5B43aF125CAA8007a99A886Fd3',
          startBlock: 17389302,
        },
        base: {
          address: '0x023bdaefeddddd5b43af125caa8007a99a886fd3',
          startBlock: 12996617,
        },
        optimism: {
          address: '0x023BDAEFeDDDdd5B43aF125CAA8007a99A886Fd3',
          startBlock: 118640391,
        },
        polygon: {
          address: '0xfE5950B4975a19679be7c31a0A03D626d237f37C',
          startBlock: 43952847,
        },
      },
    },
    ZodiacModules: {
      abi: AzoriusAbi,
      chain: {
        mainnet: {
          startBlock: 17389302,
          address: factory({
            address: [
              '0x000000000000aDdB49795b0f9bA5BC298cDda236',
              '0x31Bf73048056fe947B827C0Fe159ACcB5Ae30237',
            ],
            event: getAbiItem({ abi: ZodiacModuleProxyFactoryAbi, name: 'ModuleProxyCreation' }),
            parameter: 'proxy',
          }),
        },
        base: {
          startBlock: 12996617,
          address: factory({
            address: [
              '0x000000000000aDdB49795b0f9bA5BC298cDda236',
              '0x31Bf73048056fe947B827C0Fe159ACcB5Ae30237',
            ],
            event: getAbiItem({ abi: ZodiacModuleProxyFactoryAbi, name: 'ModuleProxyCreation' }),
            parameter: 'proxy',
          }),
        },
        optimism: {
          startBlock: 118640391,
          address: factory({
            address: [
              '0x000000000000aDdB49795b0f9bA5BC298cDda236',
              '0x31Bf73048056fe947B827C0Fe159ACcB5Ae30237',
            ],
            event: getAbiItem({ abi: ZodiacModuleProxyFactoryAbi, name: 'ModuleProxyCreation' }),
            parameter: 'proxy',
          }),
        },
        polygon: {
          startBlock: 43952847,
          address: factory({
            address: '0x000000000000aDdB49795b0f9bA5BC298cDda236',
            event: getAbiItem({ abi: ZodiacModuleProxyFactoryAbi, name: 'ModuleProxyCreation' }),
            parameter: 'proxy',
          }),
        },
      },
    }
  },
});
