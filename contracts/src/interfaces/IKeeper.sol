// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

interface IKeeper {

    function dropEggs(uint256 eggId, uint256 dropID,address buyer) external;

}
