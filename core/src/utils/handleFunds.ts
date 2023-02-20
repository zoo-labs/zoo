
  export const handleFunds = (chainId, buyZoo) => {
    // if (userEthBalance?.toFixed(3) == 0)
    //   return console.log(`You do not have sufficient ${NETWORK_LABEL[chainId]} to get Zoo`);
    switch (chainId) {
      case 1338:
        buyZoo();
        break;
      case 1337:
        buyZoo();
        break;
      case 97:
        buyZoo();
        break;
      case 4:
        buyZoo();
        break;
      default:
        window.open(
          "https://pancakeswap.info/token/0x09e2b83fe5485a7c8beaa5dffd1d324a2b2d5c13",
          "_blank"
        );
    }
  };