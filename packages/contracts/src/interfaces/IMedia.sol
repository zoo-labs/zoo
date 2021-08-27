// SPDX-License-Identifier: GPL-3.0
// Forked from https://github.com/ourzora/core @ 450cd154bfbb70f62e94050cc3f1560d58e0506a

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { IMarket } from "./IMarket.sol";
import { IZoo } from "./IZoo.sol";

/**
 * @title Interface for Zoo Protocol's Media
 */
interface IMedia {
    struct EIP712Signature {
        uint256 deadline;
        uint8 v;
        bytes32 r;
        bytes32 s;
    }

    struct MediaData {
        // A valid URI of the content represented by this token
        string tokenURI;
        // A valid URI of the metadata associated with this token
        string metadataURI;
        // A SHA256 hash of the content pointed to by tokenURI
        bytes32 contentHash;
        // A SHA256 hash of the content pointed to by metadataURI
        bytes32 metadataHash;
    }

    event TokenURIUpdated(uint256 indexed _tokenID, address owner, string _uri);
    event TokenMetadataURIUpdated(
        uint256 indexed _tokenID,
        address owner,
        string _uri
    );

    /**
     * @notice Return the metadata URI for a piece of media given the token URI
     */
    function tokenMetadataURI(uint256 tokenID)
        external
        view
        returns (string memory);

    /**
     * @notice Mint new media for msg.sender.
     */
    function mint(MediaData calldata data, IMarket.BidShares calldata bidShares)
        external;

    /**
     * @notice EIP-712 mintWithSig method. Mints new media for a creator given a valid signature.
     */
    function mintWithSig(
        address creator,
        MediaData calldata data,
        IMarket.BidShares calldata bidShares,
        EIP712Signature calldata sig
    ) external;

    /**
     * @notice Transfer the token with the given ID to a given address.
     * Save the previous owner before the transfer, in case there is a sell-on fee.
     * @dev This can only be called by the auction contract specified at deployment
     */
    function auctionTransfer(uint256 tokenID, address recipient) external;

    /**
     * @notice Set the ask on a piece of media
     */
    function setAsk(uint256 tokenID, IMarket.Ask calldata ask) external;

    /**
     * @notice Remove the ask on a piece of media
     */
    function removeAsk(uint256 tokenID) external;

    /**
     * @notice Set the bid on a piece of media
     */
    function setBid(uint256 tokenID, IMarket.Bid calldata bid) external;

    /**
     * @notice Remove the bid on a piece of media
     */
    function removeBid(uint256 tokenID) external;

    function acceptBid(uint256 tokenID, IMarket.Bid calldata bid) external;

    /**
     * @notice Revoke approval for a piece of media
     */
    function revokeApproval(uint256 tokenID) external;

    /**
     * @notice Update the token URI
     */
    function updateTokenURI(uint256 tokenID, string calldata tokenURI) external;

    /**
     * @notice Update the token metadata uri
     */
    function updateTokenMetadataURI(
        uint256 tokenID,
        string calldata metadataURI
    ) external;

    /**
     * @notice EIP-712 permit method. Sets an approved spender given a valid signature.
     */
    function permit(
        address spender,
        uint256 tokenID,
        EIP712Signature calldata sig
    ) external;

    // Added for Zoo
    function mintToken(address owner, IZoo.Token memory tokenID) external returns (IZoo.Token memory);
    function burnToken(address owner, uint256 tokenID) external;
    function tokenExists(uint256 tokenID) external returns (bool);
}
