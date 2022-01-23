import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import Web3Status from "components/Web3Status";
import React, { FC } from "react";
import { ChevronLeft } from "react-feather";
interface BidModalHeaderProps {
  className?: string;
  onBack: () => void;
  showAccount?: boolean;
}

const BidModalHeader: FC<BidModalHeaderProps> = ({
  className = "",
  onBack = undefined,
  showAccount,
}) => {
  const { account } = useWeb3React();

  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div
        onClick={onBack}
        className="z-10 flex items-center justify-center bg-black rounded-full shadow-2xl cursor-pointer h-14 w-14"
      >
        <ChevronLeft
          width={30}
          height={30}
          className="text-white "
          fill="#f2f2f2"
        />
      </div>
      {showAccount && <Web3Status title={i18n._(t`Connect Wallet`)} />}
    </div>
  );
};

export default BidModalHeader;
