// SPDX-License-Identifier: GPL-3.0
// Forked from https://github.com/ourzora/core @ 450cd154bfbb70f62e94050cc3f1560d58e0506a

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { Decimal } from "../Decimal.sol";

/**
 * @title Interface for Zoo Protocol's Market
 */
interface IMarket {

    struct Bid {
        // Amount of the currency being bid
        uint256 amount;
        // Address to the ERC20 token being used to bid
        address currency;
        // Address of the bidder
        address bidder;
        // Address of the recipient
        address recipient;
        // % of the next sale to award the current owner
        Decimal.D256 sellOnShare;
    }

    struct Ask {
        // Amount of the currency being asked
        uint256 amount;
        // Address to the ERC20 token being asked
        address currency;
    }

    struct BidShares {
        // % of sale value that goes to the _previous_ owner of the nft
        Decimal.D256 prevOwner;
        // % of sale value that goes to the original creator of the nft
        Decimal.D256 creator;
        // % of sale value that goes to the seller (current owner) of the nft
        Decimal.D256 owner;
    }

    event BidCreated(uint256 indexed tokenID, Bid bid);
    event BidRemoved(uint256 indexed tokenID, Bid bid);
    event BidFinalized(uint256 indexed tokenID, Bid bid);
    event AskCreated(uint256 indexed tokenID, Ask ask);
    event AskRemoved(uint256 indexed tokenID, Ask ask);
    event BidShareUpdated(uint256 indexed tokenID, BidShares bidShares);

    function bidForTokenBidder(uint256 tokenID, address bidder)
        external
        view
        returns (Bid memory);

    function currentAskForToken(uint256 tokenID)
        external
        view
        returns (Ask memory);

    function bidSharesForToken(uint256 tokenID)
        external
        view
        returns (BidShares memory);

    function isValidBid(uint256 tokenID, uint256 bidAmount)
        external
        view
        returns (bool);

    function isValidBidShares(BidShares calldata bidShares)
        external
        pure
        returns (bool);

    function splitShare(Decimal.D256 calldata sharePercentage, uint256 amount)
        external
        pure
        returns (uint256);

    function setBidShares(uint256 tokenID, BidShares calldata bidShares)
        external;

    function setAsk(uint256 tokenID, Ask calldata ask) external;

    function removeAsk(uint256 tokenID) external;

    function setBid(
        uint256 tokenID,
        Bid calldata bid,
        address spender
    ) external;

    function removeBid(uint256 tokenID, address bidder) external;

    function acceptBid(uint256 tokenID, Bid calldata expectedBid) external;
}
