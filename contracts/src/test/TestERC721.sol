// SPDX-License-Identifier: GPL-3.0
// FOR TEST PURPOSES ONLY. NOT PRODUCTION SAFE

pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721 {
    constructor() ERC721("TestERC721", "TEST") {}

    function mint(address to, uint256 tokenID) public {
        _safeMint(to, tokenID);
    }
}
