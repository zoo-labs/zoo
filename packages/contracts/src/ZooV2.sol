// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable  } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { AccessControl } from "@openzeppelin/contracts/access/AccessControl.sol";


contract ZooV2 is ERC20, ERC20Burnable, Pausable, Ownable, AccessControl {
    using SafeERC20 for IERC20;

    bytes32 public constant BLACKLIST = keccak256("BLACKLIST");

    /*
     *     bytes4(keccak256('burn(address, uint256)')) == 0x06fdde03
     *     bytes4(keccak256('mint(address, uint256)')) == 0x95d89b41
     *
     *     => 0xc87b56dd ^ 0x157c3df9 == 0x4e222e66
     */
    bytes4 private constant _INTERFACE_ID_ERC20 = 0x4e222e66;
    // bytes4 private constant _INTERFACE_ID_SWAP = 0x4e222e66;

    // supportedInterfaces[this.supportsInterface.selector] = true;

    address public bridge;

    modifier onlyBridge {
        require(msg.sender == address(bridge));
        _;
    }

    constructor () ERC20("ZOO", "ZOO") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function configure(address _bridge) public onlyOwner {
        bridge = _bridge;
    }

    function blacklistAddress(address _addr) public onlyOwner {
        grantRole(BLACKLIST, _addr);
    }

    function isBlacklisted(address _addr) public view returns (bool) {
        return hasRole(BLACKLIST, _addr);
    }

    function _transferAllowed(address _addr) internal view {
        require(hasRole(BLACKLIST, _addr) == false, "Address is on blacklist");
    }

    function transfer(address _to, uint256 _value) public whenNotPaused override returns (bool) {
        _transferAllowed(_to);
        _transferAllowed(msg.sender);
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public  override whenNotPaused returns (bool) {
        _transferAllowed(_to);
        _transferAllowed(_from);
        _transferAllowed(msg.sender);
        return super.transferFrom(_from, _to, _value);
    }

    function mint(address to, uint256 value) public onlyOwner {
        super._mint(to, value);
    }

    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() public onlyOwner whenPaused {
        _unpause();
    }

    function bridgeMint(address to, uint256 value) external whenNotPaused onlyBridge {
        super._mint(to, value);
    }

    function bridgeBurn(address account, uint256 amount) external onlyBridge {
        super._approve(account, msg.sender, amount);
        super._burn(account, amount);
    }

    function airDrop(address[] memory addresses, uint256[] memory amounts) public whenNotPaused onlyOwner {
        require(addresses.length > 0 && addresses.length == amounts.length, "addresses and amounts must be equal in length");
        uint256 i;
        for (i = 0; i < addresses.length; i++) {
            require(addresses[i] != address(0), "An address is equal to 0x0"); // ensure no zero address
            require(amounts[i] > 0, "A zero amount is being transfered");             // cannot assign zero amount
        }

        // Token distribution
        for (i = 0; i < addresses.length; i++) {
            super.transfer(addresses[i], amounts[i]);
        }
    }
}
