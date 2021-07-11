module.exports = {
  contract: {
    "_format": "hh-sol-artifact-1",
    "contractName": "CryptoAnimal",
    "sourceName": "contracts/CryptoAnimal/CryptoAnimal.sol",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name_",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol_",
            "type": "string"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "AuctionCancelled",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "winner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "AuctionEnded",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "HighestBidIncreased",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "breedMarketStatusUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "breedPriceUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "coolDownUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "feePercentageUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "hatchPriceUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "hatchReadyTimeUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "hatched",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "marketStatusUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "mktsqWalletUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "sireId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "matronId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "newEgg",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "priceUpdated",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "seller",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenSold",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "animals",
        "outputs": [
          {
            "internalType": "bool",
            "name": "inBreedMarket",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "matronId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "sireId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "breedPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "generation",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "breedCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "dna",
            "type": "uint256"
          },
          {
            "internalType": "enum MarketStatus",
            "name": "inMarket",
            "type": "uint8"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "eggTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "hatchTime",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "lastBreedTime",
                "type": "uint256"
              }
            ],
            "internalType": "struct AnimalTime",
            "name": "time",
            "type": "tuple"
          },
          {
            "internalType": "enum Specie",
            "name": "specie",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "auctions",
        "outputs": [
          {
            "internalType": "address",
            "name": "highestBidder",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "highestBid",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "ended",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "bid",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_partnerId",
            "type": "uint256"
          }
        ],
        "name": "breed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "buy",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "cancelAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "coolDowns",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "didHatch",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "endAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "feePercentage",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          }
        ],
        "name": "getFeeOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "hatch",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hatchPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "hatchReadyTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "inBreedMarket",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "matronId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "sireId",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "breedPrice",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "generation",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "breedCount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "dna",
                "type": "uint256"
              },
              {
                "internalType": "enum MarketStatus",
                "name": "inMarket",
                "type": "uint8"
              },
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "eggTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "hatchTime",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "lastBreedTime",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct AnimalTime",
                "name": "time",
                "type": "tuple"
              },
              {
                "internalType": "enum Specie",
                "name": "specie",
                "type": "uint8"
              }
            ],
            "internalType": "struct Animal",
            "name": "_value",
            "type": "tuple"
          }
        ],
        "name": "mintToken",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "mktsqWallet",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "_value",
            "type": "bool"
          }
        ],
        "name": "setBreedMarketStatus",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "setBreedPriceUpdated",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "_value",
            "type": "uint256[]"
          }
        ],
        "name": "setCoolDowns",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint8",
            "name": "_value",
            "type": "uint8"
          }
        ],
        "name": "setFeePercentage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "setHatchPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "setHatchReadyTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "enum MarketStatus",
            "name": "_value",
            "type": "uint8"
          }
        ],
        "name": "setMarketStatus",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_value",
            "type": "address"
          }
        ],
        "name": "setMktsqWallet",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
          }
        ],
        "name": "setPrice",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_initialPrice",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_biddingTime",
            "type": "uint256"
          }
        ],
        "name": "startAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "withdraw",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
    "bytecode": "0x61012060405261384060809081526201518060a0526203f48060c05262093a8060e05262278d00610100526200003a9060079060056200015c565b506201fa4060085567016345785d8a0000600955600a80546001600160a81b03191660031790553480156200006e57600080fd5b506040516200467a3803806200467a8339810160408190526200009191620002fa565b8181818181818181818181818160009080519060200190620000b5929190620001b3565b508051620000cb906001906020840190620001b3565b5050506000620000e06200015860201b60201c565b600680546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35050600a8054610100600160a81b031916336101000217905550620003b49950505050505050505050565b3390565b828054828255906000526020600020908101928215620001a1579160200282015b82811115620001a1578251829062ffffff169055916020019190600101906200017d565b50620001af92915062000230565b5090565b828054620001c19062000361565b90600052602060002090601f016020900481019282620001e55760008555620001a1565b82601f106200020057805160ff1916838001178555620001a1565b82800160010185558215620001a1579182015b82811115620001a157825182559160200191906001019062000213565b5b80821115620001af576000815560010162000231565b600082601f83011262000258578081fd5b81516001600160401b03808211156200027557620002756200039e565b604051601f8301601f19908116603f01168101908282118183101715620002a057620002a06200039e565b81604052838152602092508683858801011115620002bc578485fd5b8491505b83821015620002df5785820183015181830184015290820190620002c0565b83821115620002f057848385830101525b9695505050505050565b600080604083850312156200030d578182fd5b82516001600160401b038082111562000324578384fd5b620003328683870162000247565b9350602085015191508082111562000348578283fd5b50620003578582860162000247565b9150509250929050565b600181811c908216806200037657607f821691505b602082108114156200039857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6142b680620003c46000396000f3fe60806040526004361061025f5760003560e01c806395d89b4111610144578063c2ed0130116100b6578063d96a094a1161007a578063d96a094a14610787578063d9ecad7b1461079a578063e985e9c5146107ad578063f2fde38b146107f6578063f7d9757714610816578063fab47b161461083657600080fd5b8063c2ed0130146106ef578063c818c4c11461070f578063c87b56dd1461072f578063c8c188421461074f578063d55a5a401461076257600080fd5b8063a5766aa611610108578063a5766aa61461062f578063adc0dbbf1461064f578063b701e1011461066f578063b88d4fde1461068f578063b9a2de3a146106af578063bc260004146106cf57600080fd5b806395d89b411461057757806396b5a7551461058c578063998dd3ca146105ac578063a001ecdd146105e3578063a22cb4651461060f57600080fd5b8063454a2ab3116101dd57806369074dfa116101a157806369074dfa146104c45780636e8b787c146104e457806370a0823114610504578063715018a6146105245780638da5cb5b1461053957806391e078bb1461055757600080fd5b8063454a2ab3146103e05780635424cd6b146103f3578063571a26a0146104095780635940c40a146104845780636352211e146104a457600080fd5b806318ecf3651161022457806318ecf3651461033c57806323b872dd146103605780632d515f1a146103805780632e1a7d4d146103a057806342842e0e146103c057600080fd5b8062d4d5161461026b57806301ffc9a71461028d57806306fdde03146102c2578063081812fc146102e4578063095ea7b31461031c57600080fd5b3661026657005b600080fd5b34801561027757600080fd5b5061028b610286366004613c0e565b610856565b005b34801561029957600080fd5b506102ad6102a8366004613c7e565b6108cd565b60405190151581526020015b60405180910390f35b3480156102ce57600080fd5b506102d761091f565b6040516102b99190613eb6565b3480156102f057600080fd5b506103046102ff366004613cb6565b6109b1565b6040516001600160a01b0390911681526020016102b9565b34801561032857600080fd5b5061028b610337366004613be5565b610a39565b34801561034857600080fd5b5061035260095481565b6040519081526020016102b9565b34801561036c57600080fd5b5061028b61037b3660046139f5565b610b4f565b34801561038c57600080fd5b5061035261039b366004613b11565b610b80565b3480156103ac57600080fd5b506102ad6103bb366004613cb6565b610bbe565b3480156103cc57600080fd5b5061028b6103db3660046139f5565b610cba565b61028b6103ee366004613cb6565b610cd5565b3480156103ff57600080fd5b5061035260085481565b34801561041557600080fd5b50610458610424366004613cb6565b600c6020526000908152604090208054600182015460028301546003909301546001600160a01b0390921692909160ff1684565b604080516001600160a01b039095168552602085019390935291830152151560608201526080016102b9565b34801561049057600080fd5b5061028b61049f366004613cb6565b610f66565b3480156104b057600080fd5b506103046104bf366004613cb6565b610fcc565b3480156104d057600080fd5b5061028b6104df366004613cb6565b611043565b3480156104f057600080fd5b506102ad6104ff366004613cb6565b6110a2565b34801561051057600080fd5b5061035261051f3660046139a9565b611137565b34801561053057600080fd5b5061028b6111be565b34801561054557600080fd5b506006546001600160a01b0316610304565b34801561056357600080fd5b5061028b610572366004613d33565b611232565b34801561058357600080fd5b506102d7611416565b34801561059857600080fd5b5061028b6105a7366004613cb6565b611425565b3480156105b857600080fd5b506105cc6105c7366004613cb6565b611631565b6040516102b99b9a99989796959493929190613e2b565b3480156105ef57600080fd5b50600a546105fd9060ff1681565b60405160ff90911681526020016102b9565b34801561061b57600080fd5b5061028b61062a366004613ae8565b6116c5565b34801561063b57600080fd5b5061028b61064a366004613d5e565b61178a565b34801561065b57600080fd5b5061035261066a366004613cb6565b6117f3565b34801561067b57600080fd5b506102ad61068a366004613cf0565b611814565b34801561069b57600080fd5b5061028b6106aa366004613a30565b611a07565b3480156106bb57600080fd5b5061028b6106ca366004613cb6565b611a3f565b3480156106db57600080fd5b506102ad6106ea366004613d12565b611c90565b3480156106fb57600080fd5b5061035261070a366004613cb6565b611d30565b34801561071b57600080fd5b506102ad61072a366004613cce565b611d50565b34801561073b57600080fd5b506102d761074a366004613cb6565b611df4565b6102ad61075d366004613cb6565b611ecb565b34801561076e57600080fd5b50600a546103049061010090046001600160a01b031681565b6102ad610795366004613cb6565b61208e565b6102ad6107a8366004613d12565b6122c6565b3480156107b957600080fd5b506102ad6107c83660046139c3565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b34801561080257600080fd5b5061028b6108113660046139a9565b61266b565b34801561082257600080fd5b506102ad610831366004613d12565b612756565b34801561084257600080fd5b5061028b6108513660046139a9565b6127f6565b6006546001600160a01b031633146108895760405162461bcd60e51b815260040161088090613fce565b60405180910390fd5b61089560078383613808565b506040513381527f6e60dce03379ce27400d4c63c2746725405f5925983b0a8a28e1d9ecb8101f119060200160405180910390a15050565b60006001600160e01b031982166380ac58cd60e01b14806108fe57506001600160e01b03198216635b5e139f60e01b145b8061091957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461092e906141ab565b80601f016020809104026020016040519081016040528092919081815260200182805461095a906141ab565b80156109a75780601f1061097c576101008083540402835291602001916109a7565b820191906000526020600020905b81548152906001019060200180831161098a57829003601f168201915b5050505050905090565b60006109bc82612870565b610a1d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610880565b506000908152600460205260409020546001600160a01b031690565b6000610a4482610fcc565b9050806001600160a01b0316836001600160a01b03161415610ab25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610880565b336001600160a01b0382161480610ace5750610ace81336107c8565b610b405760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610880565b610b4a838361288d565b505050565b610b5933826128fb565b610b755760405162461bcd60e51b815260040161088090614071565b610b4a8383836129e5565b6006546000906001600160a01b03163314610bad5760405162461bcd60e51b815260040161088090613fce565b610bb78383612b85565b9392505050565b600081610bca81612870565b610be65760405162461bcd60e51b815260040161088090614003565b610bf181600161411d565b600b541015610c125760405162461bcd60e51b815260040161088090614003565b6000838152600c6020908152604080832033845260048101909252909120548015610cad57604051600090339083908381818185875af1925050503d8060008114610c79576040519150601f19603f3d011682016040523d82523d6000602084013e610c7e565b606091505b505090508015610c9f57336000908152600484016020526040812055610cab565b60009450505050610cb4565b505b6001935050505b50919050565b610b4a83838360405180602001604052806000815250611a07565b80610cdf81612870565b610cfb5760405162461bcd60e51b815260040161088090614003565b610d0681600161411d565b600b541015610d275760405162461bcd60e51b815260040161088090614003565b816002600b8281548110610d4b57634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff166002811115610d8157634e487b7160e01b600052602160045260246000fd5b14610d9e5760405162461bcd60e51b815260040161088090613f52565b6000838152600c6020526040902060030154839060ff1615610dd25760405162461bcd60e51b815260040161088090613f1b565b6000848152600c60205260409020600101548490421115610e055760405162461bcd60e51b815260040161088090613f1b565b610e0e85610fcc565b6001600160a01b0316336001600160a01b03161415610e7d5760405162461bcd60e51b815260206004820152602560248201527f416e696d616c3a2063616e277420626964206f6e206f6e6573656c66277320616044820152641b9a5b585b60da1b6064820152608401610880565b6000858152600c6020526040902060028101543411610ede5760405162461bcd60e51b815260206004820152601b60248201527f416e696d616c3a20626964206e6f74206869676820656e6f75676800000000006044820152606401610880565b33600090815260048201602052604081208054349290610eff90849061411d565b909155505080546001600160a01b0319163317815534600282018190556040517f423b106cc331b76a44d76fcdae14ad07cbf45962e79c06fc97f386cfc3a8881091610f5691899190918252602082015260400190565b60405180910390a1505050505050565b6006546001600160a01b03163314610f905760405162461bcd60e51b815260040161088090613fce565b60088190556040513381527f345fca9f47646f63defd2ecd171b711f1a000b379070e9a85608912b48cfd424906020015b60405180910390a150565b6000818152600260205260408120546001600160a01b0316806109195760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610880565b6006546001600160a01b0316331461106d5760405162461bcd60e51b815260040161088090613fce565b60098190556040513381527fec62ce711373978703a1a51246d349fa3234137e046d235667234c72e243666590602001610fc1565b6000816110ae81612870565b6110ca5760405162461bcd60e51b815260040161088090614003565b6110d581600161411d565b600b5410156110f65760405162461bcd60e51b815260040161088090614003565b6000600b848154811061111957634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d90910201600a01541515949350505050565b60006001600160a01b0382166111a25760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610880565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b031633146111e85760405162461bcd60e51b815260040161088090613fce565b6006546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600680546001600160a01b0319169055565b823361123d82610fcc565b6001600160a01b0316146112635760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061128657634e487b7160e01b600052603260045260246000fd5b60009182526020808320888452600c9091526040909220600d90910290910191506002600883015460ff1660028111156112d057634e487b7160e01b600052602160045260246000fd5b141561131e5760405162461bcd60e51b815260206004820152601a60248201527f416e696d616c3a20616c726561647920696e2061756374696f6e0000000000006044820152606401610880565b600381015460ff16151560011461136f5760405162461bcd60e51b8152602060048201526015602482015274105b9a5b585b0e881b9bdd081e595d08195b991959605a1b6044820152606401610880565b600085116113d65760405162461bcd60e51b815260206004820152602e60248201527f416e696d616c3a20696e697469616c2070726963652073686f756c642062652060448201526d067726561746572207468616e20360941b6064820152608401610880565b6008820180546002919060ff191660018302179055506002810185905560038101805460ff19169055611409844261411d565b6001909101555050505050565b60606001805461092e906141ab565b806002600b828154811061144957634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff16600281111561147f57634e487b7160e01b600052602160045260246000fd5b1461149c5760405162461bcd60e51b815260040161088090613f52565b81336114a782610fcc565b6001600160a01b0316146114cd5760405162461bcd60e51b815260040161088090613f89565b6000838152600c6020526040902060030154839060ff16156115015760405162461bcd60e51b815260040161088090613f1b565b6000848152600c602052604090206001015484904211156115345760405162461bcd60e51b815260040161088090613f1b565b6000600b868154811061155757634e487b7160e01b600052603260045260246000fd5b60009182526020808320898452600c90915260409092206003810154600d909202909201925060ff16156115d85760405162461bcd60e51b815260206004820152602260248201527f41756374696f6e20616c72656164792063616e63656c6c6564206f7220656e64604482015261195960f21b6064820152608401610880565b60038101805460ff1990811660011790915560088301805490911690556040518781527f2809c7e17bf978fbc7194c0a694b638c4215e9140cacc6c38ca36010b45697df9060200160405180910390a150505050505050565b600b818154811061164157600080fd5b6000918252602091829020600d909102018054600182015460028301546003840154600485015460058601546006870154600788015460088901546040805160608101825260098c01548152600a8c01549c81019c909c52600b8b0154908c0152600c9099015460ff9889169b50969995989497939692959194909390811692168b565b6001600160a01b03821633141561171e5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610880565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6006546001600160a01b031633146117b45760405162461bcd60e51b815260040161088090613fce565b600a805460ff191660ff83161790556040513381527f51683cc311a496dfc9279cc0e2151357b984511ebed721095ea20ab60ea84cba90602001610fc1565b6007818154811061180357600080fd5b600091825260209091200154905081565b6000823361182182610fcc565b6001600160a01b0316146118475760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061186a57634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d909102019050600284600281111561189e57634e487b7160e01b600052602160045260246000fd5b14156118ec5760405162461bcd60e51b815260206004820152601f60248201527f506c6561736520696e6974696174652061756374696f6e20696e7374656164006044820152606401610880565b6002600882015460ff16600281111561191557634e487b7160e01b600052602160045260246000fd5b14156119945760405162461bcd60e51b815260206004820152604260248201527f54686520616e696d616c20697320696e2061756374696f6e2073616c65206e6f60448201527f772e20506c656173652063616e63656c2f656e642061756374696f6e206669726064820152611cdd60f21b608482015260a401610880565b60088101805485919060ff191660018360028111156119c357634e487b7160e01b600052602160045260246000fd5b02179055506040513381527ff67f99050506c4c585fea303397672840f36131024c0df2b2740d1ebd43f063e906020015b60405180910390a1506001949350505050565b611a1133836128fb565b611a2d5760405162461bcd60e51b815260040161088090614071565b611a3984848484612e11565b50505050565b806002600b8281548110611a6357634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff166002811115611a9957634e487b7160e01b600052602160045260246000fd5b14611ab65760405162461bcd60e51b815260040161088090613f52565b8133611ac182610fcc565b6001600160a01b031614611ae75760405162461bcd60e51b815260040161088090613f89565b6000838152600c6020526040902060030154839060ff1615611b1b5760405162461bcd60e51b815260040161088090613f1b565b6000848152600c602052604090206001015484904211611b755760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb881b9bdd081e595d08195b991959605a1b6044820152606401610880565b6000858152600c60205260409020600381015460ff1615611bd05760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b6044820152606401610880565b6000611bdb87610fcc565b825460028401546001600160a01b03909116600081815260048601602052604081208054949550919383929190611c13908490614168565b90915550611c25905089848484612e44565b60038401805460ff19166001179055604080518a81526001600160a01b0385811660208301528416818301526060810183905290517f1569802994a84674f75331b5081a75eefaac9d79eb336ae1544ed0aae49cb938916080908290030190a1505050505050505050565b60008233611c9d82610fcc565b6001600160a01b031614611cc35760405162461bcd60e51b815260040161088090613f89565b6000600b8581548110611ce657634e487b7160e01b600052603260045260246000fd5b60009182526020918290206003600d909202019081018690556040513381529092507f0b9fe6ec5c0ff683073d36448ebfd9eb90fb482c34bc84ee609cf7517e2c117291016119f4565b600a54600090606490611d469060ff1684614149565b6109199190614135565b60008233611d5d82610fcc565b6001600160a01b031614611d835760405162461bcd60e51b815260040161088090613f89565b6000600b8581548110611da657634e487b7160e01b600052603260045260246000fd5b6000918252602091829020600d90910201805460ff19168615151781556040513381529092507f82aa02e14b784ca57ba79a8ecad00e80ca55c994c2a4de5e0afa6e337c9083cd91016119f4565b6060611dff82612870565b611e635760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610880565b6000611e7a60408051602081019091526000815290565b90506000815111611e9a5760405180602001604052806000815250610bb7565b80611ea484613051565b604051602001611eb5929190613dbf565b6040516020818303038152906040529392505050565b60008133611ed882610fcc565b6001600160a01b031614611efe5760405162461bcd60e51b815260040161088090613f89565b6000600b8481548110611f2157634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d02019050426008548260090160000154611f47919061411d565b10611f895760405162461bcd60e51b815260206004820152601260248201527109cdee840e4cac2c8f240e8de40d0c2e8c6d60731b6044820152606401610880565b3460095414611fd05760405162461bcd60e51b8152602060048201526013602482015272496e636f72726563742068617463682066656560681b6044820152606401610880565b42600a828101919091555460405160009161010090046001600160a01b03169034908381818185875af1925050503d806000811461202a576040519150601f19603f3d011682016040523d82523d6000602084013e61202f565b606091505b50509050806120505760405162461bcd60e51b81526004016108809061403a565b6040518581527f81842d8fdba1351a5b982074d42ef136030e7ff9ed40300bca7ce69b258634a29060200160405180910390a1506001949350505050565b60008161209a81612870565b6120b65760405162461bcd60e51b815260040161088090614003565b6120c181600161411d565b600b5410156120e25760405162461bcd60e51b815260040161088090614003565b6000600b848154811061210557634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d9091020190506001600882015460ff16600281111561214057634e487b7160e01b600052602160045260246000fd5b1461218d5760405162461bcd60e51b815260206004820152601760248201527f416e696d616c3a206e6f7420696e2073616c65206e6f770000000000000000006044820152606401610880565b806004015434146121e05760405162461bcd60e51b815260206004820152601760248201527f416e696d616c3a20696e636f72726563742070726963650000000000000000006044820152606401610880565b6121e984610fcc565b6001600160a01b0316336001600160a01b031614156122555760405162461bcd60e51b815260206004820152602260248201527f416e696d616c3a2063616e277420627579206f6e6573656c66277320616e696d604482015261185b60f21b6064820152608401610880565b600061226085610fcc565b90503361226f86838334612e44565b604080516001600160a01b038085168252831660208201529081018790527f35db386d36c4fbdfefbd90851cd5e19bec6f86c8f37e6b379b02dcc5f3204ffc9060600160405180910390a150600195945050505050565b6000816122d281612870565b6122ee5760405162461bcd60e51b815260040161088090614003565b6122f981600161411d565b600b54101561231a5760405162461bcd60e51b815260040161088090614003565b833361232582610fcc565b6001600160a01b03161461234b5760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061236e57634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d90910201805490915060ff166123e05760405162461bcd60e51b815260206004820152602560248201527f506172746e657220616e696d616c206973206e6f7420696e206272656564206d604482015264185c9ad95d60da1b6064820152608401610880565b3481600301541461242a5760405162461bcd60e51b8152602060048201526014602482015273125b98dbdc9c9958dd08189c9959590818dbdcdd60621b6044820152606401610880565b6124338661316b565b6124745760405162461bcd60e51b815260206004820152601260248201527113585d1c9bdb8818d85b89dd08189c99595960721b6044820152606401610880565b61247d8561316b565b6124bc5760405162461bcd60e51b815260206004820152601060248201526f14da5c994818d85b89dd08189c99595960821b6044820152606401610880565b60006124c887876132d8565b905060006124d63383612b85565b905060006124e334611d30565b905060006124f089610fcc565b6001600160a01b03166125038334614168565b604051600081818185875af1925050503d806000811461253f576040519150601f19603f3d011682016040523d82523d6000602084013e612544565b606091505b50509050806125a15760405162461bcd60e51b8152602060048201526024808201527f4661696c656420746f2073656e6420657468657220746f20616e696d616c206f6044820152633bb732b960e11b6064820152608401610880565b600a5460405160009161010090046001600160a01b03169084908381818185875af1925050503d80600081146125f3576040519150601f19603f3d011682016040523d82523d6000602084013e6125f8565b606091505b50509050806126195760405162461bcd60e51b81526004016108809061403a565b604080518c8152602081018c90529081018590527f6bb1901bb0855f0819eeebf5b05737a03c406ac98d141d85f90083e146a4707c9060600160405180910390a15060019a9950505050505050505050565b6006546001600160a01b031633146126955760405162461bcd60e51b815260040161088090613fce565b6001600160a01b0381166126fa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610880565b6006546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600680546001600160a01b0319166001600160a01b0392909216919091179055565b6000823361276382610fcc565b6001600160a01b0316146127895760405162461bcd60e51b815260040161088090613f89565b6000600b85815481106127ac57634e487b7160e01b600052603260045260246000fd5b60009182526020918290206004600d909202019081018690556040513381529092507f83fc307c8fc48fdc208c847d235b2027c81540015cc3dcc3653182680281f68691016119f4565b6006546001600160a01b031633146128205760405162461bcd60e51b815260040161088090613fce565b600a8054610100600160a81b0319166101006001600160a01b038416021790556040513381527f457f75c866b449ef038ad514b29135364547714475963a0111a5f1d6560cd8c890602001610fc1565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906128c282610fcc565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061290682612870565b6129675760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610880565b600061297283610fcc565b9050806001600160a01b0316846001600160a01b031614806129ad5750836001600160a01b03166129a2846109b1565b6001600160a01b0316145b806129dd57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166129f882610fcc565b6001600160a01b031614612a605760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610880565b6001600160a01b038216612ac25760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610880565b612acd60008261288d565b6001600160a01b0383166000908152600360205260408120805460019290612af6908490614168565b90915550506001600160a01b0382166000908152600360205260408120805460019290612b2490849061411d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b80546001818101835560009283528351600d9092027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db98101805493151560ff1994851617815560208601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba83015560408601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb83015560608601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbc83015560808601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbd83015560a08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbe83015560c08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbf83015560e08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dc08301556101008601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dc190920180548795929491921690836002811115612d4057634e487b7160e01b600052602160045260246000fd5b0217905550610120820151805160098301556020810151600a83015560400151600b820155610140820151600c8201805460ff19166001836010811115612d9757634e487b7160e01b600052602160045260246000fd5b021790555050600b5460009150612db090600190614168565b6000818152600c6020526040812080546001600160a01b03191681556001808201839055600282019290925560038101805460ff1916909217909155909150612df98583613554565b600b54612e0890600190614168565b95945050505050565b612e1c8484846129e5565b612e2884848484613572565b611a395760405162461bcd60e51b815260040161088090613ec9565b826001600160a01b0316612e5785610fcc565b6001600160a01b031614612ead5760405162461bcd60e51b815260206004820152601860248201527f546f6b656e206964206973206e6f742073656c6c6572277300000000000000006044820152606401610880565b612eb88383866129e5565b6000612ec382611d30565b905060006001600160a01b038516612edb8385614168565b604051600081818185875af1925050503d8060008114612f17576040519150601f19603f3d011682016040523d82523d6000602084013e612f1c565b606091505b5050905080612f6d5760405162461bcd60e51b815260206004820152601e60248201527f4661696c656420746f2073656e6420657468657220746f2073656c6c657200006044820152606401610880565b600a5460405160009161010090046001600160a01b03169084908381818185875af1925050503d8060008114612fbf576040519150601f19603f3d011682016040523d82523d6000602084013e612fc4565b606091505b5050905080612fe55760405162461bcd60e51b81526004016108809061403a565b6000600b888154811061300857634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d9092020101805460ff1916600183600281111561304357634e487b7160e01b600052602160045260246000fd5b021790555050505050505050565b6060816130755750506040805180820190915260018152600360fc1b602082015290565b8160005b811561309f5780613089816141e0565b91506130989050600a83614135565b9150613079565b60008167ffffffffffffffff8111156130c857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156130f2576020820181803683370190505b5090505b84156129dd57613107600183614168565b9150613114600a866141fb565b61311f90603061411d565b60f81b81838151811061314257634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613164600a86614135565b94506130f6565b60008161317781612870565b6131935760405162461bcd60e51b815260040161088090614003565b61319e81600161411d565b600b5410156131bf5760405162461bcd60e51b815260040161088090614003565b6000600b84815481106131e257634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d0201905080600901600101546000141561320c576000925050610cb4565b6000600c82015460ff16601081111561323557634e487b7160e01b600052602160045260246000fd5b1415613245576000925050610cb4565b6006810154613258576001925050610cb4565b60075460068201546000911061327e57600182600601546132799190614168565b61328d565b60075461328d90600190614168565b905042600782815481106132b157634e487b7160e01b600052603260045260246000fd5b906000526020600020015483600901600201546132ce919061411d565b1093505050610cb4565b6132e0613853565b826132ea81612870565b6133065760405162461bcd60e51b815260040161088090614003565b61331181600161411d565b600b5410156133325760405162461bcd60e51b815260040161088090614003565b8261333c81612870565b6133585760405162461bcd60e51b815260040161088090614003565b61336381600161411d565b600b5410156133845760405162461bcd60e51b815260040161088090614003565b6000600b86815481106133a757634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d020190506000600b86815481106133da57634e487b7160e01b600052603260045260246000fd5b60009182526020822042600b808701829055600d90930290910191820155600684018054919350909161340c836141e0565b9091555050600681018054906000613423836141e0565b919050555060006040518060600160405280428152602001600081526020016000815250905060006040518061016001604052806000151581526020018a8152602001898152602001600081526020016000815260200161348c8660050154866005015461367f565b60ff168152602001600081526020016134ad86600701548660070154613696565b81526020016000815260208101849052600c85015460409091019060ff1660108111156134ea57634e487b7160e01b600052602160045260246000fd5b600c87015460ff16601081111561351157634e487b7160e01b600052602160045260246000fd5b1461351d576000613526565b600c86015460ff165b601081111561354557634e487b7160e01b600052602160045260246000fd5b90529998505050505050505050565b61356e8282604051806020016040528060008152506136a2565b5050565b60006001600160a01b0384163b1561367457604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906135b6903390899088908890600401613dee565b602060405180830381600087803b1580156135d057600080fd5b505af1925050508015613600575060408051601f3d908101601f191682019092526135fd91810190613c9a565b60015b61365a573d80801561362e576040519150601f19603f3d011682016040523d82523d6000602084013e613633565b606091505b5080516136525760405162461bcd60e51b815260040161088090613ec9565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506129dd565b506001949350505050565b60008183101561368f5781610bb7565b5090919050565b6000610bb7828461411d565b6136ac83836136d5565b6136b96000848484613572565b610b4a5760405162461bcd60e51b815260040161088090613ec9565b6001600160a01b03821661372b5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610880565b61373481612870565b156137815760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610880565b6001600160a01b03821660009081526003602052604081208054600192906137aa90849061411d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b828054828255906000526020600020908101928215613843579160200282015b82811115613843578235825591602001919060010190613828565b5061384f9291506138ef565b5090565b60405180610160016040528060001515815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600060028111156138ba57634e487b7160e01b600052602160045260246000fd5b81526020016138e360405180606001604052806000815260200160008152602001600081525090565b81526020016000905290565b5b8082111561384f57600081556001016138f0565b80356001600160a01b038116811461391b57600080fd5b919050565b8035801515811461391b57600080fd5b80356003811061391b57600080fd5b80356011811061391b57600080fd5b60006060828403121561395f578081fd5b6040516060810181811067ffffffffffffffff8211171561398257613982614251565b80604052508091508235815260208301356020820152604083013560408201525092915050565b6000602082840312156139ba578081fd5b610bb782613904565b600080604083850312156139d5578081fd5b6139de83613904565b91506139ec60208401613904565b90509250929050565b600080600060608486031215613a09578081fd5b613a1284613904565b9250613a2060208501613904565b9150604084013590509250925092565b60008060008060808587031215613a45578081fd5b613a4e85613904565b93506020613a5d818701613904565b935060408601359250606086013567ffffffffffffffff80821115613a80578384fd5b818801915088601f830112613a93578384fd5b813581811115613aa557613aa5614251565b613ab7601f8201601f191685016140ec565b91508082528984828501011115613acc578485fd5b8084840185840137810190920192909252939692955090935050565b60008060408385031215613afa578182fd5b613b0383613904565b91506139ec60208401613920565b6000808284036101c0811215613b25578283fd5b613b2e84613904565b92506101a080601f1983011215613b43578283fd5b613b4b6140c2565b9150613b5960208601613920565b825260408501356020830152606085013560408301526080850135606083015260a0850135608083015260c085013560a083015260e085013560c08301526101008086013560e0840152610120613bb1818801613930565b828501526101409150613bc68883890161394e565b90840152613bd586830161393f565b9083015250919491935090915050565b60008060408385031215613bf7578182fd5b613c0083613904565b946020939093013593505050565b60008060208385031215613c20578182fd5b823567ffffffffffffffff80821115613c37578384fd5b818501915085601f830112613c4a578384fd5b813581811115613c58578485fd5b8660208260051b8501011115613c6c578485fd5b60209290920196919550909350505050565b600060208284031215613c8f578081fd5b8135610bb781614267565b600060208284031215613cab578081fd5b8151610bb781614267565b600060208284031215613cc7578081fd5b5035919050565b60008060408385031215613ce0578182fd5b823591506139ec60208401613920565b60008060408385031215613d02578182fd5b823591506139ec60208401613930565b60008060408385031215613d24578182fd5b50508035926020909101359150565b600080600060608486031215613d47578081fd5b505081359360208301359350604090920135919050565b600060208284031215613d6f578081fd5b813560ff81168114610bb7578182fd5b60008151808452613d9781602086016020860161417f565b601f01601f19169290920160200192915050565b60118110613dbb57613dbb61423b565b9052565b60008351613dd181846020880161417f565b835190830190613de581836020880161417f565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613e2190830184613d7f565b9695505050505050565b60006101a0820190508c151582528b60208301528a60408301528960608301528860808301528760a08301528660c08301528560e083015260038510613e7357613e7361423b565b84610100830152835161012083015260208401516101408301526040840151610160830152613ea6610180830184613dab565b9c9b505050505050505050505050565b602081526000610bb76020830184613d7f565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252601d908201527f416e696d616c3a2061756374696f6e20616c726561647920656e646564000000604082015260600190565b6020808252601b908201527f416e696d616c3a206e6f7420696e2061756374696f6e2073616c650000000000604082015260600190565b60208082526025908201527f416e696d616c3a2063616c6c6572206973206e6f742074686520746f6b656e2060408201526437bbb732b960d91b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526018908201527f416e696d616c3a20696e76616c696420746f6b656e2069640000000000000000604082015260600190565b6020808252601d908201527f4661696c656420746f2073656e6420657468657220746f206d6b747371000000604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051610160810167ffffffffffffffff811182821017156140e6576140e6614251565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561411557614115614251565b604052919050565b600082198211156141305761413061420f565b500190565b60008261414457614144614225565b500490565b60008160001904831182151516156141635761416361420f565b500290565b60008282101561417a5761417a61420f565b500390565b60005b8381101561419a578181015183820152602001614182565b83811115611a395750506000910152565b600181811c908216806141bf57607f821691505b60208210811415610cb457634e487b7160e01b600052602260045260246000fd5b60006000198214156141f4576141f461420f565b5060010190565b60008261420a5761420a614225565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461427d57600080fd5b5056fea2646970667358221220ff7a012f46a9224a3126567c9abeafa784046e39e31db2e989ddfbacef52a64564736f6c63430008040033",
    "deployedBytecode": "0x60806040526004361061025f5760003560e01c806395d89b4111610144578063c2ed0130116100b6578063d96a094a1161007a578063d96a094a14610787578063d9ecad7b1461079a578063e985e9c5146107ad578063f2fde38b146107f6578063f7d9757714610816578063fab47b161461083657600080fd5b8063c2ed0130146106ef578063c818c4c11461070f578063c87b56dd1461072f578063c8c188421461074f578063d55a5a401461076257600080fd5b8063a5766aa611610108578063a5766aa61461062f578063adc0dbbf1461064f578063b701e1011461066f578063b88d4fde1461068f578063b9a2de3a146106af578063bc260004146106cf57600080fd5b806395d89b411461057757806396b5a7551461058c578063998dd3ca146105ac578063a001ecdd146105e3578063a22cb4651461060f57600080fd5b8063454a2ab3116101dd57806369074dfa116101a157806369074dfa146104c45780636e8b787c146104e457806370a0823114610504578063715018a6146105245780638da5cb5b1461053957806391e078bb1461055757600080fd5b8063454a2ab3146103e05780635424cd6b146103f3578063571a26a0146104095780635940c40a146104845780636352211e146104a457600080fd5b806318ecf3651161022457806318ecf3651461033c57806323b872dd146103605780632d515f1a146103805780632e1a7d4d146103a057806342842e0e146103c057600080fd5b8062d4d5161461026b57806301ffc9a71461028d57806306fdde03146102c2578063081812fc146102e4578063095ea7b31461031c57600080fd5b3661026657005b600080fd5b34801561027757600080fd5b5061028b610286366004613c0e565b610856565b005b34801561029957600080fd5b506102ad6102a8366004613c7e565b6108cd565b60405190151581526020015b60405180910390f35b3480156102ce57600080fd5b506102d761091f565b6040516102b99190613eb6565b3480156102f057600080fd5b506103046102ff366004613cb6565b6109b1565b6040516001600160a01b0390911681526020016102b9565b34801561032857600080fd5b5061028b610337366004613be5565b610a39565b34801561034857600080fd5b5061035260095481565b6040519081526020016102b9565b34801561036c57600080fd5b5061028b61037b3660046139f5565b610b4f565b34801561038c57600080fd5b5061035261039b366004613b11565b610b80565b3480156103ac57600080fd5b506102ad6103bb366004613cb6565b610bbe565b3480156103cc57600080fd5b5061028b6103db3660046139f5565b610cba565b61028b6103ee366004613cb6565b610cd5565b3480156103ff57600080fd5b5061035260085481565b34801561041557600080fd5b50610458610424366004613cb6565b600c6020526000908152604090208054600182015460028301546003909301546001600160a01b0390921692909160ff1684565b604080516001600160a01b039095168552602085019390935291830152151560608201526080016102b9565b34801561049057600080fd5b5061028b61049f366004613cb6565b610f66565b3480156104b057600080fd5b506103046104bf366004613cb6565b610fcc565b3480156104d057600080fd5b5061028b6104df366004613cb6565b611043565b3480156104f057600080fd5b506102ad6104ff366004613cb6565b6110a2565b34801561051057600080fd5b5061035261051f3660046139a9565b611137565b34801561053057600080fd5b5061028b6111be565b34801561054557600080fd5b506006546001600160a01b0316610304565b34801561056357600080fd5b5061028b610572366004613d33565b611232565b34801561058357600080fd5b506102d7611416565b34801561059857600080fd5b5061028b6105a7366004613cb6565b611425565b3480156105b857600080fd5b506105cc6105c7366004613cb6565b611631565b6040516102b99b9a99989796959493929190613e2b565b3480156105ef57600080fd5b50600a546105fd9060ff1681565b60405160ff90911681526020016102b9565b34801561061b57600080fd5b5061028b61062a366004613ae8565b6116c5565b34801561063b57600080fd5b5061028b61064a366004613d5e565b61178a565b34801561065b57600080fd5b5061035261066a366004613cb6565b6117f3565b34801561067b57600080fd5b506102ad61068a366004613cf0565b611814565b34801561069b57600080fd5b5061028b6106aa366004613a30565b611a07565b3480156106bb57600080fd5b5061028b6106ca366004613cb6565b611a3f565b3480156106db57600080fd5b506102ad6106ea366004613d12565b611c90565b3480156106fb57600080fd5b5061035261070a366004613cb6565b611d30565b34801561071b57600080fd5b506102ad61072a366004613cce565b611d50565b34801561073b57600080fd5b506102d761074a366004613cb6565b611df4565b6102ad61075d366004613cb6565b611ecb565b34801561076e57600080fd5b50600a546103049061010090046001600160a01b031681565b6102ad610795366004613cb6565b61208e565b6102ad6107a8366004613d12565b6122c6565b3480156107b957600080fd5b506102ad6107c83660046139c3565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b34801561080257600080fd5b5061028b6108113660046139a9565b61266b565b34801561082257600080fd5b506102ad610831366004613d12565b612756565b34801561084257600080fd5b5061028b6108513660046139a9565b6127f6565b6006546001600160a01b031633146108895760405162461bcd60e51b815260040161088090613fce565b60405180910390fd5b61089560078383613808565b506040513381527f6e60dce03379ce27400d4c63c2746725405f5925983b0a8a28e1d9ecb8101f119060200160405180910390a15050565b60006001600160e01b031982166380ac58cd60e01b14806108fe57506001600160e01b03198216635b5e139f60e01b145b8061091957506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461092e906141ab565b80601f016020809104026020016040519081016040528092919081815260200182805461095a906141ab565b80156109a75780601f1061097c576101008083540402835291602001916109a7565b820191906000526020600020905b81548152906001019060200180831161098a57829003601f168201915b5050505050905090565b60006109bc82612870565b610a1d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610880565b506000908152600460205260409020546001600160a01b031690565b6000610a4482610fcc565b9050806001600160a01b0316836001600160a01b03161415610ab25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610880565b336001600160a01b0382161480610ace5750610ace81336107c8565b610b405760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610880565b610b4a838361288d565b505050565b610b5933826128fb565b610b755760405162461bcd60e51b815260040161088090614071565b610b4a8383836129e5565b6006546000906001600160a01b03163314610bad5760405162461bcd60e51b815260040161088090613fce565b610bb78383612b85565b9392505050565b600081610bca81612870565b610be65760405162461bcd60e51b815260040161088090614003565b610bf181600161411d565b600b541015610c125760405162461bcd60e51b815260040161088090614003565b6000838152600c6020908152604080832033845260048101909252909120548015610cad57604051600090339083908381818185875af1925050503d8060008114610c79576040519150601f19603f3d011682016040523d82523d6000602084013e610c7e565b606091505b505090508015610c9f57336000908152600484016020526040812055610cab565b60009450505050610cb4565b505b6001935050505b50919050565b610b4a83838360405180602001604052806000815250611a07565b80610cdf81612870565b610cfb5760405162461bcd60e51b815260040161088090614003565b610d0681600161411d565b600b541015610d275760405162461bcd60e51b815260040161088090614003565b816002600b8281548110610d4b57634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff166002811115610d8157634e487b7160e01b600052602160045260246000fd5b14610d9e5760405162461bcd60e51b815260040161088090613f52565b6000838152600c6020526040902060030154839060ff1615610dd25760405162461bcd60e51b815260040161088090613f1b565b6000848152600c60205260409020600101548490421115610e055760405162461bcd60e51b815260040161088090613f1b565b610e0e85610fcc565b6001600160a01b0316336001600160a01b03161415610e7d5760405162461bcd60e51b815260206004820152602560248201527f416e696d616c3a2063616e277420626964206f6e206f6e6573656c66277320616044820152641b9a5b585b60da1b6064820152608401610880565b6000858152600c6020526040902060028101543411610ede5760405162461bcd60e51b815260206004820152601b60248201527f416e696d616c3a20626964206e6f74206869676820656e6f75676800000000006044820152606401610880565b33600090815260048201602052604081208054349290610eff90849061411d565b909155505080546001600160a01b0319163317815534600282018190556040517f423b106cc331b76a44d76fcdae14ad07cbf45962e79c06fc97f386cfc3a8881091610f5691899190918252602082015260400190565b60405180910390a1505050505050565b6006546001600160a01b03163314610f905760405162461bcd60e51b815260040161088090613fce565b60088190556040513381527f345fca9f47646f63defd2ecd171b711f1a000b379070e9a85608912b48cfd424906020015b60405180910390a150565b6000818152600260205260408120546001600160a01b0316806109195760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610880565b6006546001600160a01b0316331461106d5760405162461bcd60e51b815260040161088090613fce565b60098190556040513381527fec62ce711373978703a1a51246d349fa3234137e046d235667234c72e243666590602001610fc1565b6000816110ae81612870565b6110ca5760405162461bcd60e51b815260040161088090614003565b6110d581600161411d565b600b5410156110f65760405162461bcd60e51b815260040161088090614003565b6000600b848154811061111957634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d90910201600a01541515949350505050565b60006001600160a01b0382166111a25760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610880565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b031633146111e85760405162461bcd60e51b815260040161088090613fce565b6006546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600680546001600160a01b0319169055565b823361123d82610fcc565b6001600160a01b0316146112635760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061128657634e487b7160e01b600052603260045260246000fd5b60009182526020808320888452600c9091526040909220600d90910290910191506002600883015460ff1660028111156112d057634e487b7160e01b600052602160045260246000fd5b141561131e5760405162461bcd60e51b815260206004820152601a60248201527f416e696d616c3a20616c726561647920696e2061756374696f6e0000000000006044820152606401610880565b600381015460ff16151560011461136f5760405162461bcd60e51b8152602060048201526015602482015274105b9a5b585b0e881b9bdd081e595d08195b991959605a1b6044820152606401610880565b600085116113d65760405162461bcd60e51b815260206004820152602e60248201527f416e696d616c3a20696e697469616c2070726963652073686f756c642062652060448201526d067726561746572207468616e20360941b6064820152608401610880565b6008820180546002919060ff191660018302179055506002810185905560038101805460ff19169055611409844261411d565b6001909101555050505050565b60606001805461092e906141ab565b806002600b828154811061144957634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff16600281111561147f57634e487b7160e01b600052602160045260246000fd5b1461149c5760405162461bcd60e51b815260040161088090613f52565b81336114a782610fcc565b6001600160a01b0316146114cd5760405162461bcd60e51b815260040161088090613f89565b6000838152600c6020526040902060030154839060ff16156115015760405162461bcd60e51b815260040161088090613f1b565b6000848152600c602052604090206001015484904211156115345760405162461bcd60e51b815260040161088090613f1b565b6000600b868154811061155757634e487b7160e01b600052603260045260246000fd5b60009182526020808320898452600c90915260409092206003810154600d909202909201925060ff16156115d85760405162461bcd60e51b815260206004820152602260248201527f41756374696f6e20616c72656164792063616e63656c6c6564206f7220656e64604482015261195960f21b6064820152608401610880565b60038101805460ff1990811660011790915560088301805490911690556040518781527f2809c7e17bf978fbc7194c0a694b638c4215e9140cacc6c38ca36010b45697df9060200160405180910390a150505050505050565b600b818154811061164157600080fd5b6000918252602091829020600d909102018054600182015460028301546003840154600485015460058601546006870154600788015460088901546040805160608101825260098c01548152600a8c01549c81019c909c52600b8b0154908c0152600c9099015460ff9889169b50969995989497939692959194909390811692168b565b6001600160a01b03821633141561171e5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610880565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b6006546001600160a01b031633146117b45760405162461bcd60e51b815260040161088090613fce565b600a805460ff191660ff83161790556040513381527f51683cc311a496dfc9279cc0e2151357b984511ebed721095ea20ab60ea84cba90602001610fc1565b6007818154811061180357600080fd5b600091825260209091200154905081565b6000823361182182610fcc565b6001600160a01b0316146118475760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061186a57634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d909102019050600284600281111561189e57634e487b7160e01b600052602160045260246000fd5b14156118ec5760405162461bcd60e51b815260206004820152601f60248201527f506c6561736520696e6974696174652061756374696f6e20696e7374656164006044820152606401610880565b6002600882015460ff16600281111561191557634e487b7160e01b600052602160045260246000fd5b14156119945760405162461bcd60e51b815260206004820152604260248201527f54686520616e696d616c20697320696e2061756374696f6e2073616c65206e6f60448201527f772e20506c656173652063616e63656c2f656e642061756374696f6e206669726064820152611cdd60f21b608482015260a401610880565b60088101805485919060ff191660018360028111156119c357634e487b7160e01b600052602160045260246000fd5b02179055506040513381527ff67f99050506c4c585fea303397672840f36131024c0df2b2740d1ebd43f063e906020015b60405180910390a1506001949350505050565b611a1133836128fb565b611a2d5760405162461bcd60e51b815260040161088090614071565b611a3984848484612e11565b50505050565b806002600b8281548110611a6357634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d90920201015460ff166002811115611a9957634e487b7160e01b600052602160045260246000fd5b14611ab65760405162461bcd60e51b815260040161088090613f52565b8133611ac182610fcc565b6001600160a01b031614611ae75760405162461bcd60e51b815260040161088090613f89565b6000838152600c6020526040902060030154839060ff1615611b1b5760405162461bcd60e51b815260040161088090613f1b565b6000848152600c602052604090206001015484904211611b755760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb881b9bdd081e595d08195b991959605a1b6044820152606401610880565b6000858152600c60205260409020600381015460ff1615611bd05760405162461bcd60e51b8152602060048201526015602482015274105d58dd1a5bdb88185b1c9958591e48195b991959605a1b6044820152606401610880565b6000611bdb87610fcc565b825460028401546001600160a01b03909116600081815260048601602052604081208054949550919383929190611c13908490614168565b90915550611c25905089848484612e44565b60038401805460ff19166001179055604080518a81526001600160a01b0385811660208301528416818301526060810183905290517f1569802994a84674f75331b5081a75eefaac9d79eb336ae1544ed0aae49cb938916080908290030190a1505050505050505050565b60008233611c9d82610fcc565b6001600160a01b031614611cc35760405162461bcd60e51b815260040161088090613f89565b6000600b8581548110611ce657634e487b7160e01b600052603260045260246000fd5b60009182526020918290206003600d909202019081018690556040513381529092507f0b9fe6ec5c0ff683073d36448ebfd9eb90fb482c34bc84ee609cf7517e2c117291016119f4565b600a54600090606490611d469060ff1684614149565b6109199190614135565b60008233611d5d82610fcc565b6001600160a01b031614611d835760405162461bcd60e51b815260040161088090613f89565b6000600b8581548110611da657634e487b7160e01b600052603260045260246000fd5b6000918252602091829020600d90910201805460ff19168615151781556040513381529092507f82aa02e14b784ca57ba79a8ecad00e80ca55c994c2a4de5e0afa6e337c9083cd91016119f4565b6060611dff82612870565b611e635760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610880565b6000611e7a60408051602081019091526000815290565b90506000815111611e9a5760405180602001604052806000815250610bb7565b80611ea484613051565b604051602001611eb5929190613dbf565b6040516020818303038152906040529392505050565b60008133611ed882610fcc565b6001600160a01b031614611efe5760405162461bcd60e51b815260040161088090613f89565b6000600b8481548110611f2157634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d02019050426008548260090160000154611f47919061411d565b10611f895760405162461bcd60e51b815260206004820152601260248201527109cdee840e4cac2c8f240e8de40d0c2e8c6d60731b6044820152606401610880565b3460095414611fd05760405162461bcd60e51b8152602060048201526013602482015272496e636f72726563742068617463682066656560681b6044820152606401610880565b42600a828101919091555460405160009161010090046001600160a01b03169034908381818185875af1925050503d806000811461202a576040519150601f19603f3d011682016040523d82523d6000602084013e61202f565b606091505b50509050806120505760405162461bcd60e51b81526004016108809061403a565b6040518581527f81842d8fdba1351a5b982074d42ef136030e7ff9ed40300bca7ce69b258634a29060200160405180910390a1506001949350505050565b60008161209a81612870565b6120b65760405162461bcd60e51b815260040161088090614003565b6120c181600161411d565b600b5410156120e25760405162461bcd60e51b815260040161088090614003565b6000600b848154811061210557634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d9091020190506001600882015460ff16600281111561214057634e487b7160e01b600052602160045260246000fd5b1461218d5760405162461bcd60e51b815260206004820152601760248201527f416e696d616c3a206e6f7420696e2073616c65206e6f770000000000000000006044820152606401610880565b806004015434146121e05760405162461bcd60e51b815260206004820152601760248201527f416e696d616c3a20696e636f72726563742070726963650000000000000000006044820152606401610880565b6121e984610fcc565b6001600160a01b0316336001600160a01b031614156122555760405162461bcd60e51b815260206004820152602260248201527f416e696d616c3a2063616e277420627579206f6e6573656c66277320616e696d604482015261185b60f21b6064820152608401610880565b600061226085610fcc565b90503361226f86838334612e44565b604080516001600160a01b038085168252831660208201529081018790527f35db386d36c4fbdfefbd90851cd5e19bec6f86c8f37e6b379b02dcc5f3204ffc9060600160405180910390a150600195945050505050565b6000816122d281612870565b6122ee5760405162461bcd60e51b815260040161088090614003565b6122f981600161411d565b600b54101561231a5760405162461bcd60e51b815260040161088090614003565b833361232582610fcc565b6001600160a01b03161461234b5760405162461bcd60e51b815260040161088090613f89565b6000600b858154811061236e57634e487b7160e01b600052603260045260246000fd5b60009182526020909120600d90910201805490915060ff166123e05760405162461bcd60e51b815260206004820152602560248201527f506172746e657220616e696d616c206973206e6f7420696e206272656564206d604482015264185c9ad95d60da1b6064820152608401610880565b3481600301541461242a5760405162461bcd60e51b8152602060048201526014602482015273125b98dbdc9c9958dd08189c9959590818dbdcdd60621b6044820152606401610880565b6124338661316b565b6124745760405162461bcd60e51b815260206004820152601260248201527113585d1c9bdb8818d85b89dd08189c99595960721b6044820152606401610880565b61247d8561316b565b6124bc5760405162461bcd60e51b815260206004820152601060248201526f14da5c994818d85b89dd08189c99595960821b6044820152606401610880565b60006124c887876132d8565b905060006124d63383612b85565b905060006124e334611d30565b905060006124f089610fcc565b6001600160a01b03166125038334614168565b604051600081818185875af1925050503d806000811461253f576040519150601f19603f3d011682016040523d82523d6000602084013e612544565b606091505b50509050806125a15760405162461bcd60e51b8152602060048201526024808201527f4661696c656420746f2073656e6420657468657220746f20616e696d616c206f6044820152633bb732b960e11b6064820152608401610880565b600a5460405160009161010090046001600160a01b03169084908381818185875af1925050503d80600081146125f3576040519150601f19603f3d011682016040523d82523d6000602084013e6125f8565b606091505b50509050806126195760405162461bcd60e51b81526004016108809061403a565b604080518c8152602081018c90529081018590527f6bb1901bb0855f0819eeebf5b05737a03c406ac98d141d85f90083e146a4707c9060600160405180910390a15060019a9950505050505050505050565b6006546001600160a01b031633146126955760405162461bcd60e51b815260040161088090613fce565b6001600160a01b0381166126fa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610880565b6006546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600680546001600160a01b0319166001600160a01b0392909216919091179055565b6000823361276382610fcc565b6001600160a01b0316146127895760405162461bcd60e51b815260040161088090613f89565b6000600b85815481106127ac57634e487b7160e01b600052603260045260246000fd5b60009182526020918290206004600d909202019081018690556040513381529092507f83fc307c8fc48fdc208c847d235b2027c81540015cc3dcc3653182680281f68691016119f4565b6006546001600160a01b031633146128205760405162461bcd60e51b815260040161088090613fce565b600a8054610100600160a81b0319166101006001600160a01b038416021790556040513381527f457f75c866b449ef038ad514b29135364547714475963a0111a5f1d6560cd8c890602001610fc1565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906128c282610fcc565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061290682612870565b6129675760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610880565b600061297283610fcc565b9050806001600160a01b0316846001600160a01b031614806129ad5750836001600160a01b03166129a2846109b1565b6001600160a01b0316145b806129dd57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166129f882610fcc565b6001600160a01b031614612a605760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610880565b6001600160a01b038216612ac25760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610880565b612acd60008261288d565b6001600160a01b0383166000908152600360205260408120805460019290612af6908490614168565b90915550506001600160a01b0382166000908152600360205260408120805460019290612b2490849061411d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b80546001818101835560009283528351600d9092027f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01db98101805493151560ff1994851617815560208601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dba83015560408601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbb83015560608601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbc83015560808601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbd83015560a08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbe83015560c08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dbf83015560e08601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dc08301556101008601517f0175b7a638427703f0dbe7bb9bbf987a2551717b34e79f33b5b1008d1fa01dc190920180548795929491921690836002811115612d4057634e487b7160e01b600052602160045260246000fd5b0217905550610120820151805160098301556020810151600a83015560400151600b820155610140820151600c8201805460ff19166001836010811115612d9757634e487b7160e01b600052602160045260246000fd5b021790555050600b5460009150612db090600190614168565b6000818152600c6020526040812080546001600160a01b03191681556001808201839055600282019290925560038101805460ff1916909217909155909150612df98583613554565b600b54612e0890600190614168565b95945050505050565b612e1c8484846129e5565b612e2884848484613572565b611a395760405162461bcd60e51b815260040161088090613ec9565b826001600160a01b0316612e5785610fcc565b6001600160a01b031614612ead5760405162461bcd60e51b815260206004820152601860248201527f546f6b656e206964206973206e6f742073656c6c6572277300000000000000006044820152606401610880565b612eb88383866129e5565b6000612ec382611d30565b905060006001600160a01b038516612edb8385614168565b604051600081818185875af1925050503d8060008114612f17576040519150601f19603f3d011682016040523d82523d6000602084013e612f1c565b606091505b5050905080612f6d5760405162461bcd60e51b815260206004820152601e60248201527f4661696c656420746f2073656e6420657468657220746f2073656c6c657200006044820152606401610880565b600a5460405160009161010090046001600160a01b03169084908381818185875af1925050503d8060008114612fbf576040519150601f19603f3d011682016040523d82523d6000602084013e612fc4565b606091505b5050905080612fe55760405162461bcd60e51b81526004016108809061403a565b6000600b888154811061300857634e487b7160e01b600052603260045260246000fd5b600091825260209091206008600d9092020101805460ff1916600183600281111561304357634e487b7160e01b600052602160045260246000fd5b021790555050505050505050565b6060816130755750506040805180820190915260018152600360fc1b602082015290565b8160005b811561309f5780613089816141e0565b91506130989050600a83614135565b9150613079565b60008167ffffffffffffffff8111156130c857634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156130f2576020820181803683370190505b5090505b84156129dd57613107600183614168565b9150613114600a866141fb565b61311f90603061411d565b60f81b81838151811061314257634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350613164600a86614135565b94506130f6565b60008161317781612870565b6131935760405162461bcd60e51b815260040161088090614003565b61319e81600161411d565b600b5410156131bf5760405162461bcd60e51b815260040161088090614003565b6000600b84815481106131e257634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d0201905080600901600101546000141561320c576000925050610cb4565b6000600c82015460ff16601081111561323557634e487b7160e01b600052602160045260246000fd5b1415613245576000925050610cb4565b6006810154613258576001925050610cb4565b60075460068201546000911061327e57600182600601546132799190614168565b61328d565b60075461328d90600190614168565b905042600782815481106132b157634e487b7160e01b600052603260045260246000fd5b906000526020600020015483600901600201546132ce919061411d565b1093505050610cb4565b6132e0613853565b826132ea81612870565b6133065760405162461bcd60e51b815260040161088090614003565b61331181600161411d565b600b5410156133325760405162461bcd60e51b815260040161088090614003565b8261333c81612870565b6133585760405162461bcd60e51b815260040161088090614003565b61336381600161411d565b600b5410156133845760405162461bcd60e51b815260040161088090614003565b6000600b86815481106133a757634e487b7160e01b600052603260045260246000fd5b90600052602060002090600d020190506000600b86815481106133da57634e487b7160e01b600052603260045260246000fd5b60009182526020822042600b808701829055600d90930290910191820155600684018054919350909161340c836141e0565b9091555050600681018054906000613423836141e0565b919050555060006040518060600160405280428152602001600081526020016000815250905060006040518061016001604052806000151581526020018a8152602001898152602001600081526020016000815260200161348c8660050154866005015461367f565b60ff168152602001600081526020016134ad86600701548660070154613696565b81526020016000815260208101849052600c85015460409091019060ff1660108111156134ea57634e487b7160e01b600052602160045260246000fd5b600c87015460ff16601081111561351157634e487b7160e01b600052602160045260246000fd5b1461351d576000613526565b600c86015460ff165b601081111561354557634e487b7160e01b600052602160045260246000fd5b90529998505050505050505050565b61356e8282604051806020016040528060008152506136a2565b5050565b60006001600160a01b0384163b1561367457604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906135b6903390899088908890600401613dee565b602060405180830381600087803b1580156135d057600080fd5b505af1925050508015613600575060408051601f3d908101601f191682019092526135fd91810190613c9a565b60015b61365a573d80801561362e576040519150601f19603f3d011682016040523d82523d6000602084013e613633565b606091505b5080516136525760405162461bcd60e51b815260040161088090613ec9565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506129dd565b506001949350505050565b60008183101561368f5781610bb7565b5090919050565b6000610bb7828461411d565b6136ac83836136d5565b6136b96000848484613572565b610b4a5760405162461bcd60e51b815260040161088090613ec9565b6001600160a01b03821661372b5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610880565b61373481612870565b156137815760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610880565b6001600160a01b03821660009081526003602052604081208054600192906137aa90849061411d565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b828054828255906000526020600020908101928215613843579160200282015b82811115613843578235825591602001919060010190613828565b5061384f9291506138ef565b5090565b60405180610160016040528060001515815260200160008152602001600081526020016000815260200160008152602001600081526020016000815260200160008152602001600060028111156138ba57634e487b7160e01b600052602160045260246000fd5b81526020016138e360405180606001604052806000815260200160008152602001600081525090565b81526020016000905290565b5b8082111561384f57600081556001016138f0565b80356001600160a01b038116811461391b57600080fd5b919050565b8035801515811461391b57600080fd5b80356003811061391b57600080fd5b80356011811061391b57600080fd5b60006060828403121561395f578081fd5b6040516060810181811067ffffffffffffffff8211171561398257613982614251565b80604052508091508235815260208301356020820152604083013560408201525092915050565b6000602082840312156139ba578081fd5b610bb782613904565b600080604083850312156139d5578081fd5b6139de83613904565b91506139ec60208401613904565b90509250929050565b600080600060608486031215613a09578081fd5b613a1284613904565b9250613a2060208501613904565b9150604084013590509250925092565b60008060008060808587031215613a45578081fd5b613a4e85613904565b93506020613a5d818701613904565b935060408601359250606086013567ffffffffffffffff80821115613a80578384fd5b818801915088601f830112613a93578384fd5b813581811115613aa557613aa5614251565b613ab7601f8201601f191685016140ec565b91508082528984828501011115613acc578485fd5b8084840185840137810190920192909252939692955090935050565b60008060408385031215613afa578182fd5b613b0383613904565b91506139ec60208401613920565b6000808284036101c0811215613b25578283fd5b613b2e84613904565b92506101a080601f1983011215613b43578283fd5b613b4b6140c2565b9150613b5960208601613920565b825260408501356020830152606085013560408301526080850135606083015260a0850135608083015260c085013560a083015260e085013560c08301526101008086013560e0840152610120613bb1818801613930565b828501526101409150613bc68883890161394e565b90840152613bd586830161393f565b9083015250919491935090915050565b60008060408385031215613bf7578182fd5b613c0083613904565b946020939093013593505050565b60008060208385031215613c20578182fd5b823567ffffffffffffffff80821115613c37578384fd5b818501915085601f830112613c4a578384fd5b813581811115613c58578485fd5b8660208260051b8501011115613c6c578485fd5b60209290920196919550909350505050565b600060208284031215613c8f578081fd5b8135610bb781614267565b600060208284031215613cab578081fd5b8151610bb781614267565b600060208284031215613cc7578081fd5b5035919050565b60008060408385031215613ce0578182fd5b823591506139ec60208401613920565b60008060408385031215613d02578182fd5b823591506139ec60208401613930565b60008060408385031215613d24578182fd5b50508035926020909101359150565b600080600060608486031215613d47578081fd5b505081359360208301359350604090920135919050565b600060208284031215613d6f578081fd5b813560ff81168114610bb7578182fd5b60008151808452613d9781602086016020860161417f565b601f01601f19169290920160200192915050565b60118110613dbb57613dbb61423b565b9052565b60008351613dd181846020880161417f565b835190830190613de581836020880161417f565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613e2190830184613d7f565b9695505050505050565b60006101a0820190508c151582528b60208301528a60408301528960608301528860808301528760a08301528660c08301528560e083015260038510613e7357613e7361423b565b84610100830152835161012083015260208401516101408301526040840151610160830152613ea6610180830184613dab565b9c9b505050505050505050505050565b602081526000610bb76020830184613d7f565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252601d908201527f416e696d616c3a2061756374696f6e20616c726561647920656e646564000000604082015260600190565b6020808252601b908201527f416e696d616c3a206e6f7420696e2061756374696f6e2073616c650000000000604082015260600190565b60208082526025908201527f416e696d616c3a2063616c6c6572206973206e6f742074686520746f6b656e2060408201526437bbb732b960d91b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526018908201527f416e696d616c3a20696e76616c696420746f6b656e2069640000000000000000604082015260600190565b6020808252601d908201527f4661696c656420746f2073656e6420657468657220746f206d6b747371000000604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051610160810167ffffffffffffffff811182821017156140e6576140e6614251565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561411557614115614251565b604052919050565b600082198211156141305761413061420f565b500190565b60008261414457614144614225565b500490565b60008160001904831182151516156141635761416361420f565b500290565b60008282101561417a5761417a61420f565b500390565b60005b8381101561419a578181015183820152602001614182565b83811115611a395750506000910152565b600181811c908216806141bf57607f821691505b60208210811415610cb457634e487b7160e01b600052602260045260246000fd5b60006000198214156141f4576141f461420f565b5060010190565b60008261420a5761420a614225565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b03198116811461427d57600080fd5b5056fea2646970667358221220ff7a012f46a9224a3126567c9abeafa784046e39e31db2e989ddfbacef52a64564736f6c63430008040033",
    "linkReferences": {},
    "deployedLinkReferences": {}
  }
}