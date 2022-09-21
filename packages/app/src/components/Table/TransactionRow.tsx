import { shortenAddress } from "functions";
import { abbreviateNumber } from "functions/abbreviateNumbers";
import moment from "moment";
import React from "react";

interface TransactionRowProps {
  index: number;
  from_address: string;
  to_address: string;
  value: number;
  block_timestamp: number;
  transaction_hash: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  index,
  from_address,
  to_address,
  value,
  block_timestamp,
  transaction_hash,
}) => {
  return (
    <tr key={index}>
      <td>
        <a
          target={`_blank`}
          rel="noopener noreferrer"
          href={`https://testnet.bscscan.com/address/${from_address}`}
        >
          {shortenAddress(from_address)}
        </a>
      </td>

      <td>
        {to_address && (
          <a
            target={`_blank`}
            rel="noopener noreferrer"
            href={`https://testnet.bscscan.com/address/${to_address}`}
          >
            {shortenAddress(to_address)}
          </a>
        )}
      </td>

      <td>{abbreviateNumber(value)} ZOO</td>
      <td>{moment(block_timestamp).format("DD/MM/YYYY / hh:mm A")}</td>
      <td>
        <a
          target={`_blank`}
          rel="noopener noreferrer"
          href={`https://testnet.bscscan.com/tx/${transaction_hash}`}
        >
          {transaction_hash.slice(0, 10)}...
        </a>
      </td>
    </tr>
  );
};

export default TransactionRow;
