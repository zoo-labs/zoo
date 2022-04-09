import React, { useState } from "react";
import Image from "next/image";

import Alert from "../../components/Alert";

const data = [
  {
    type: "bought egg",
    block: "12051484",
    tokenId: 6,
    hash: "0xd8e1c294da833a8db",
  },
  {
    type: "bought egg",
    block: "12051484",
    tokenId: 6,
    hash: "0xd8e1c294da833a8db",
  },
  {
    type: "bought egg",
    block: "12051484",
    tokenId: 6,
    hash: "0xd8e1c294da833a8db",
  },
];

const TransactionHistory = () => {
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
    <div className="max-w-7xl px-4 py-12">
      <h2 className="text-center text-4xl lg:text-5xl mb-12 font-bold">
        Transaction History
      </h2>
      {copied && (
        <Alert
          message={`copied!`}
          className="mb-4 bg-black100 text-white w-48 border border-grey mx-auto"
          show={copied}
          setShow={setCopied}
        />
      )}

      <table className="border-collapse w-full">
        <thead>
          <tr className="bg-black200 text-left">
            <th className="p-3 font-bold uppercase  text-white hidden lg:table-cell">
              ACTIONS
            </th>
            <th className="p-3 font-bold uppercase  text-white hidden lg:table-cell">
              BLOCK
            </th>
            <th className="p-3 font-bold uppercase  text-white hidden lg:table-cell">
              TOKEN ID
            </th>
            <th className="p-3 font-bold uppercase  text-white hidden lg:table-cell">
              HASH
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-black100 lg:hover:bg-black200 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                >
                  <td className="w-full  flex lg:w-auto p-3 uppercase text-left text-white items-center lg:table-cell relative lg:static">
                    <span className="lg:hidden bg-blue  rounded mr-4 px-2 py-1 text-xs font-bold uppercase">
                      ACTIONS:
                    </span>
                    <span className="flex items-center">
                      <Image
                        src="/img/check.svg"
                        width={24}
                        height={24}
                        alt=""
                        className=""
                      />
                      <span className="ml-1 uppercase">{item.type}</span>
                    </span>
                  </td>
                  <td className="w-full lg:w-auto p-3 text-white text-left block lg:table-cell relative lg:static">
                    <span className="lg:hidden   bg-blue  rounded mr-4 px-2 py-1 text-xs font-bold uppercase">
                      BLOCK:
                    </span>
                    {item.block}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-white text-left block lg:table-cell relative lg:static">
                    <span className="lg:hidden bg-blue  rounded mr-4 px-2 py-1 text-xs font-bold uppercase">
                      TOKEN ID:
                    </span>
                    {item.tokenId}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-white text-left block lg:table-cell relative lg:static">
                    <span className="lg:hidden bg-blue  rounded mr-4 px-2 py-1 text-xs font-bold uppercase">
                      HASH:
                    </span>
                    {item.hash}
                  </td>
                  <td className="w-full lg:w-auto p-3 text-white text-left block lg:table-cell relative lg:static">
                    <span className="lg:hidden bg-blue  rounded mr-4 px-2 py-1 text-xs font-bold uppercase">
                      Copy
                    </span>
                    <Image
                      src="/img/copy-icon.svg"
                      width={24}
                      height={24}
                      alt=""
                      onClick={() => copyToClipboard(item.hash)}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <p className="text-center font-bold  text-xl">
              No Transaction History
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
