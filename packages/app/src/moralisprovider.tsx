import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MoralisProvider } from "react-moralis";

const MoralisProviderCustom: React.FC = ({ children }) => {
   const { chainId } = useWeb3React();
   const [mID, setMID] = useState("cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy")
   const [mURL, setURL] = useState("https://j0ixlvmwc1kz.usemoralis.com:2053/server")

   useEffect(() => {
      const moralisId =
         chainId === 97
            ? "16weSJXK4RD3aYAuwiP46Cgzjm4Bng1Torxz5qiy"
            : "cIGUkzL7pyhM8aC8gIcDiH46QGpsEutO5SAQzTgy";

      const moralisUrl =
         chainId === 97
            ? "https://dblpeaqbqk32.usemoralis.com:2053/server"
            : "https://j0ixlvmwc1kz.usemoralis.com:2053/server";
      setMID(moralisId)
      setURL(moralisUrl)
   }, [chainId])

   console.log("IN CUSTOM",mID, mURL)

   return (
        <MoralisProvider appId={mID} serverUrl={mURL}>
              {children}
        </MoralisProvider>

   );
};

export default MoralisProviderCustom;