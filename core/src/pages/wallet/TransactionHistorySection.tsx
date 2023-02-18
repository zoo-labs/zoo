import React, { useState } from "react";
import Image from "next/image";

import Alert from "../../components/Alert";
import { Table } from "components/Table/styles";

const TransactionHistory = ({ nftTransfers }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (str: any) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection()!.rangeCount > 0
        ? window.getSelection()!.getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection()!.removeAllRanges();
      document.getSelection()!.addRange(selected);
      setCopied(true);
    }
  };

  return (
    <div className="px-4 py-12 max-w-7xl">
      <h1 className="mb-12 text-4xl font-bold text-center lg:text-[44px] leading-[3rem] lg:leading-4">
        Transaction History
      </h1>
      {copied && (
        <Alert
          message={`copied!`}
          className="w-48 mx-auto mb-4 text-white border bg-black100 border-grey"
          show={copied}
          setShow={setCopied}
        />
      )}

      <div className="rounded-lg">
        <Table className="w-full rounded-lg">
          <tr className="text-left bg-black200 ">
            <th className="hidden p-3 font-bold text-white uppercase lg:table-cell">
              ACTIONS
            </th>
            <th className="hidden p-3 font-bold text-white uppercase lg:table-cell">
              BLOCK
            </th>
            <th className="hidden p-3 font-bold text-white uppercase lg:table-cell">
              TOKEN ID
            </th>
            <th className="hidden p-3 font-bold text-white uppercase lg:table-cell">
              HASH
            </th>
            <th />
          </tr>
          {nftTransfers?.length > 0 ? (
            nftTransfers?.slice(0, 10).map((item, index) => {
              const { block_number, transaction_hash, token_id, value } = item;
              return (
                <tr
                  key={index}
                  // className="flex flex-row flex-wrap mb-10 bg-black100 lg:hover:bg-black200 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0"
                >
                  <td className="">
                    <span className="flex items-center">
                      <Image
                        src="/img/check.svg"
                        width={24}
                        height={24}
                        alt=""
                        className=""
                      />
                    </span>
                  </td>
                  <td className="">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      BLOCK:
                    </span>
                    {block_number}
                  </td>
                  <td className="">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      TOKEN ID:
                    </span>
                    {token_id}
                  </td>
                  <td className="">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      HASH:
                    </span>
                    {transaction_hash}
                  </td>
                  <td className="">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      Copy
                    </span>
                    <Image
                      src="/img/copy-icon.svg"
                      width={24}
                      height={24}
                      alt=""
                      onClick={() => copyToClipboard(transaction_hash)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="text-xl font-bold text-center">
              No Transaction History
            </p>
          )}
        </Table>
      </div>
    </div>
  );
};

export default TransactionHistory;
