import React, { useState } from "react";
import Image from "next/image";

import Alert from "../../components/Alert";

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
      <h2 className="mb-12 text-4xl font-bold text-center lg:text-5xl">
        Transaction History
      </h2>
      {copied && (
        <Alert
          message={`copied!`}
          className="w-48 mx-auto mb-4 text-white border bg-black100 border-grey"
          show={copied}
          setShow={setCopied}
        />
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left bg-black200">
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
        </thead>
        <tbody>
          {nftTransfers?.length > 0 ? (
            nftTransfers?.map((item, index) => {
              const { block_number, transaction_hash, token_id, value } = item;
              return (
                <tr
                  key={index}
                  className="flex flex-row flex-wrap mb-10 bg-black100 lg:hover:bg-black200 lg:table-row lg:flex-row lg:flex-no-wrap lg:mb-0"
                >
                  <td className="relative flex items-center w-full p-3 text-left text-white uppercase lg:w-auto lg:table-cell lg:static">
                    <span className="flex items-center">
                      <Image
                        src="/img/check.svg"
                        width={24}
                        height={24}
                        alt=""
                        className=""
                      />
                      {/* <span className="ml-1 uppercase">
                        {value == "0" ? "Bought Egg" : "Animal"}
                      </span> */}
                    </span>
                  </td>
                  <td className="relative block w-full p-3 text-left text-white lg:w-auto lg:table-cell lg:static">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      BLOCK:
                    </span>
                    {block_number}
                  </td>
                  <td className="relative block w-full p-3 text-left text-white lg:w-auto lg:table-cell lg:static">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      TOKEN ID:
                    </span>
                    {token_id}
                  </td>
                  <td className="relative block w-full p-3 text-left text-white lg:w-auto lg:table-cell lg:static">
                    <span className="px-2 py-1 mr-4 text-xs font-bold uppercase rounded lg:hidden bg-blue">
                      HASH:
                    </span>
                    {transaction_hash}
                  </td>
                  <td className="relative block w-full p-3 text-left text-white lg:w-auto lg:table-cell lg:static">
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
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
