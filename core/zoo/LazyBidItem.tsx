import { EyeIcon, PencilIcon } from "@heroicons/react/solid";
import { BigintIsh, Currency, Token, ZERO_ADDRESS } from "@zoolabs/zdk";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import { getCurrencyTokenLowerCase } from "../config/currencies";
import { formatCurrencyAmountWithCommas, shortenAddress } from "../functions";
import { useActiveWeb3React } from "../hooks";
import { getContent, usePrice } from "./state";
import { GraphLazyBid } from "./types";

export type LazyBidItemProps = {
  bid: GraphLazyBid;
  getUsdAmount?: (tokenAddress: string, tokenAmount: BigintIsh) => {};
  showToken?: boolean;
  label?: string;
  summary?: string;
  onClick?: (bid: GraphLazyBid) => void;
};

const LazyBidItem = ({
  bid,
  showToken,
  summary,
  onClick,
}: LazyBidItemProps) => {
  const { chainId, account } = useActiveWeb3React();
  const [formattedAmount, setFormattedAmount] = useState(null);
  const [currencyToken, setCurrencyToken] = useState(
    new Token(chainId, ZERO_ADDRESS, 18) as Currency
  );

  // const [type, setType] = useState(null)
  const { getUsdAmount } = usePrice();
  // const { type, given_name } = getContent(bid?.media?.contentURI)
  // const dropId = bid?.media?.id
  const { type, given_name } = getContent("");

  useEffect(() => {
    const token = getCurrencyTokenLowerCase(bid.currency.id, chainId);
    if (token) {
      setCurrencyToken(token);
      setFormattedAmount(formatCurrencyAmountWithCommas(token, bid.amount));
    }
  }, [chainId]);

  const usdAmount = getUsdAmount && getUsdAmount(bid.currency.id, bid.amount);

  return (
    <div className="py-2 LazyBidItem">
      <div className="grid grid-cols-2">
        {showToken ? (
          <div>
            <div>Bid for {given_name || type}</div>
            <small className="text-gray-500">
              By {shortenAddress(bid?.bidder?.id)}{" "}
              <TimeAgo
                date={new Date(parseInt(bid.createdAtTimestamp) * 1000)}
              />
            </small>
          </div>
        ) : (
          <div>
            <div>
              Bidder {shortenAddress(bid?.bidder?.id)} {summary}
            </div>
            <small className="text-gray-500">
              <TimeAgo
                date={new Date(parseInt(bid.createdAtTimestamp) * 1000)}
              />
            </small>
          </div>
        )}
        <div className="flex justify-end">
          <div className="text-right">
            <div>
              {formattedAmount} {currencyToken?.symbol}
            </div>
            {/* {usdAmount && <small className="text-gray-500">${usdAmount}</small>} */}
          </div>
          {onClick && (
            <div onClick={() => onClick(bid)}>
              <EyeIcon
                className="p-2 ml-3 bg-gray-700 rounded-full cursor-pointer"
                width={32}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LazyBidItem;
