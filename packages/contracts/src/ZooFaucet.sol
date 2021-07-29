// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

abstract contract Token {
    function transfer(address to, uint256 amount) public virtual returns (bool);
    function balanceOf(address addr) public view virtual returns (uint256);
}

contract ZooFaucet {
    Token zooToken;
    address payable public owner;
    uint256 public rate = 1000; // 1 ETH = 1000 ZAP
    event BUYZOO(
        address indexed _buyer,
        uint256 indexed _amount,
        uint256 indexed _rate
    );

    // 1: 1000 ratio

    modifier ownerOnly {
        require(msg.sender == owner);
        _;
    }

    constructor(address _zooToken) {
        owner = payable(msg.sender);
        zooToken = Token(_zooToken);
    }

    event Log(uint256 n1, uint256 n2);

    function buyZoo(address to, uint256 amt) public payable {
        require(amt > 0);
        amt = amt * rate;
        require(amt <= zooToken.balanceOf(address(this)));
        zooToken.transfer(to, amt);
        emit BUYZOO(msg.sender, amt, rate);
    }

    function withdrawTok() public ownerOnly {
        zooToken.transfer(owner, zooToken.balanceOf(address(this)));
    }

    function withdrawEther() public ownerOnly {
        owner.transfer(address(this).balance);
    }
}
