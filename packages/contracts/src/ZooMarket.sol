// SPDX-License-Identifier: GPL-3.0
// Forked from https://github.com/ourzora/core @ 450cd154bfbb70f62e94050cc3f1560d58e0506a

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Decimal } from "./Decimal.sol";
import { ZooKeeper } from "./ZooKeeper.sol";
import { ZooMedia } from "./ZooMedia.sol";
import { IMarket } from "./interfaces/IMarket.sol";

import "./console.sol";

/**
 * @title A Market for pieces of media
 * @notice This contract contains all of the market logic for ZooMedia
 */
contract ZooMarket is IMarket {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    /* *******
     * Globals
     * *******
     */

    // Deployment Address
    address private _owner;

    // Address of the keeper contract that can call this market
    address public keeperAddress;

    // Address of the media contract that can call this market
    address public mediaAddress;

    // Mapping from token to mapping from bidder to bid
    mapping(uint256 => mapping(address => Bid)) private _tokenBidders;

    // Mapping from token to the bid shares for the token
    mapping(uint256 => BidShares) private _bidShares;

    // Mapping from token to the current ask for the token
    mapping(uint256 => Ask) private _tokenAsks;

    /* *********
     * Modifiers
     * *********
     */

    /**
     * @notice require that the msg.sender is the configured media contract
     */
    modifier onlyZoo() {
        require(
            keeperAddress == msg.sender || mediaAddress == msg.sender,
            "ZooMarket: Only Zoo contracts can call this method"
        );
        _;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "ZooMarket: Only owner has access");
        _;
    }

    /* ****************
     * View Functions
     * ****************
     */
    function bidForTokenBidder(uint256 tokenID, address bidder)
        external
        view
        override
        returns (Bid memory)
    {
        return _tokenBidders[tokenID][bidder];
    }

    function currentAskForToken(uint256 tokenID)
        external
        view
        override
        returns (Ask memory)
    {
        return _tokenAsks[tokenID];
    }

    function bidSharesForToken(uint256 tokenID)
        public
        view
        override
        returns (BidShares memory)
    {
        return _bidShares[tokenID];
    }

    /**
     * @notice Validates that the bid is valid by ensuring that the bid amount can be split perfectly into all the bid shares.
     *  We do this by comparing the sum of the individual share values with the amount and ensuring they are equal. Because
     *  the splitShare function uses integer division, any inconsistencies with the original and split sums would be due to
     *  a bid splitting that does not perfectly divide the bid amount.
     */
    function isValidBid(uint256 tokenID, uint256 bidAmount)
        public
        view
        override
        returns (bool)
    {
        BidShares memory bidShares = bidSharesForToken(tokenID);

        console.log("bidamount", bidAmount);

        // require(
        //     isValidBidShares(bidShares),
        //     "ZooMarket: Invalid bid shares for token"
        // );
        return
            bidAmount != 0 &&
            (bidAmount ==
                splitShare(bidShares.creator, bidAmount)
                    .add(splitShare(bidShares.prevOwner, bidAmount))
                    .add(splitShare(bidShares.owner, bidAmount)));
    }

    /**
     * @notice Validates that the provided bid shares sum to 100
     */
    function isValidBidShares(BidShares memory bidShares)
        public
        pure
        override
        returns (bool)
    {
        return
            bidShares.creator.value.add(bidShares.owner.value).add(
                bidShares.prevOwner.value
            ) == uint256(100).mul(Decimal.BASE);
    }

    /**
     * @notice return a % of the specified amount. This function is used to split a bid into shares
     * for a media's shareholders.
     */
    function splitShare(Decimal.D256 memory sharePercentage, uint256 amount)
        public
        pure
        override
        returns (uint256)
    {
        return Decimal.mul(amount, sharePercentage).div(100);
    }

    /* ****************
     * Public Functions
     * ****************
     */

    constructor() {
        _owner = msg.sender;
    }

    /**
     * @notice Sets the media contract address. This address is the only permitted address that
     * can call the mutable functions. This method can only be called once.
     */
    function configure(address _keeperAddress, address _mediaAddress)
        external
        onlyOwner
    {
        require(mediaAddress == address(0), "ZooMarket: Already configured");
        require(keeperAddress == address(0), "ZooMarket: Already configured");
        require(
            _mediaAddress != address(0),
            "ZooMarket: cannot set Media contract as zero address"
        );
        require(
            _keeperAddress != address(0),
            "ZooMarket: cannot set Keeper contract as zero address"
        );

        keeperAddress = _keeperAddress;
        mediaAddress = _mediaAddress;
    }

    /**
     * @notice Sets bid shares for a particular tokenID. These bid shares must
     * sum to 100.
     */
    function setBidShares(uint256 tokenID, BidShares memory bidShares)
        public
        override
        onlyZoo
    {
        // require(
        //     isValidBidShares(bidShares),
        //     "ZooMarket: Invalid bid shares, must sum to 100"
        // );
        _bidShares[tokenID] = bidShares;
        emit BidShareUpdated(tokenID, bidShares);
    }

    /**
     * @notice Sets the ask on a particular media. If the ask cannot be evenly split into the media's
     * bid shares, this reverts.
     */
    function setAsk(uint256 tokenID, Ask memory ask) public override onlyZoo {
        require(
            isValidBid(tokenID, ask.amount),
            "ZooMarket: Ask invalid for share splitting"
        );

        _tokenAsks[tokenID] = ask;
        emit AskCreated(tokenID, ask);
    }

    /**
     * @notice removes an ask for a token and emits an AskRemoved event
     */
    function removeAsk(uint256 tokenID) external override onlyZoo {
        emit AskRemoved(tokenID, _tokenAsks[tokenID]);
        delete _tokenAsks[tokenID];
    }

    /**
     * @notice Sets the bid on a particular media for a bidder. The token being used to bid
     * is transferred from the spender to this contract to be held until removed or accepted.
     * If another bid already exists for the bidder, it is refunded.
     */
    function setBid(
        uint256 tokenID,
        Bid memory bid,
        address spender
    ) public override onlyZoo {
        BidShares memory bidShares = _bidShares[tokenID];
        require(
            bidShares.creator.value.add(bid.sellOnShare.value) <=
                uint256(100).mul(Decimal.BASE),
            "ZooMarket: Sell on fee invalid for share splitting"
        );
        require(
            bid.bidder != address(0),
            "ZooMarket: bidder cannot be 0 address"
        );
        require(bid.amount != 0, "ZooMarket: cannot bid amount of 0");
        require(
            bid.currency != address(0),
            "ZooMarket: bid currency cannot be 0 address"
        );
        require(
            bid.recipient != address(0),
            "ZooMarket: bid recipient cannot be 0 address"
        );

        Bid storage existingBid = _tokenBidders[tokenID][bid.bidder];

        // If there is an existing bid, refund it before continuing
        if (existingBid.amount > 0) {
            removeBid(tokenID, bid.bidder);
        }

        IERC20 token = IERC20(bid.currency);

        // We must check the balance that was actually transferred to the market,
        // as some tokens impose a transfer fee and would not actually transfer the
        // full amount to the market, resulting in locked funds for refunds & bid acceptance
        uint256 beforeBalance = token.balanceOf(address(this));
        token.safeTransferFrom(spender, address(this), bid.amount);
        uint256 afterBalance = token.balanceOf(address(this));
        _tokenBidders[tokenID][bid.bidder] = Bid(
            afterBalance.sub(beforeBalance),
            bid.currency,
            bid.bidder,
            bid.recipient,
            bid.sellOnShare
        );
        emit BidCreated(tokenID, bid);

        // If a bid meets the criteria for an ask, automatically accept the bid.
        // If no ask is set or the bid does not meet the requirements, ignore.
        if (
            _tokenAsks[tokenID].currency != address(0) &&
            bid.currency == _tokenAsks[tokenID].currency &&
            bid.amount >= _tokenAsks[tokenID].amount
        ) {
            // Finalize exchange
            _finalizeNFTTransfer(tokenID, bid.bidder);
        }
    }

    /**
     * @notice Removes the bid on a particular media for a bidder. The bid amount
     * is transferred from this contract to the bidder, if they have a bid placed.
     */
    function removeBid(uint256 tokenID, address bidder)
        public
        override
        onlyZoo
    {
        Bid storage bid = _tokenBidders[tokenID][bidder];
        uint256 bidAmount = bid.amount;
        address bidCurrency = bid.currency;

        require(bid.amount > 0, "ZooMarket: cannot remove bid amount of 0");

        IERC20 token = IERC20(bidCurrency);

        emit BidRemoved(tokenID, bid);
        delete _tokenBidders[tokenID][bidder];
        token.safeTransfer(bidder, bidAmount);
    }

    /**
     * @notice Accepts a bid from a particular bidder. Can only be called by the media contract.
     * See {_finalizeNFTTransfer}
     * Provided bid must match a bid in storage. This is to prevent a race condition
     * where a bid may change while the acceptBid call is in transit.
     * A bid cannot be accepted if it cannot be split equally into its shareholders.
     * This should only revert in rare instances (example, a low bid with a zero-decimal token),
     * but is necessary to ensure fairness to all shareholders.
     */
    function acceptBid(uint256 tokenID, Bid calldata expectedBid)
        external
        override
        onlyZoo
    {
        Bid memory bid = _tokenBidders[tokenID][expectedBid.bidder];
        require(bid.amount > 0, "ZooMarket: cannot accept bid of 0");
        require(
            bid.amount == expectedBid.amount &&
                bid.currency == expectedBid.currency &&
                bid.sellOnShare.value == expectedBid.sellOnShare.value &&
                bid.recipient == expectedBid.recipient,
            "ZooMarket: Unexpected bid found."
        );
        require(
            isValidBid(tokenID, bid.amount),
            "ZooMarket: Bid invalid for share splitting"
        );

        _finalizeNFTTransfer(tokenID, bid.bidder);
    }

    /**
     * @notice Given a token ID and a bidder, this method transfers the value of
     * the bid to the shareholders. It also transfers the ownership of the media
     * to the bid recipient. Finally, it removes the accepted bid and the current ask.
     */
    function _finalizeNFTTransfer(uint256 tokenID, address bidder) private {
        Bid memory bid = _tokenBidders[tokenID][bidder];
        BidShares storage bidShares = _bidShares[tokenID];

        IERC20 token = IERC20(bid.currency);

        // Transfer bid share to owner of media
        token.safeTransfer(
            IERC721(mediaAddress).ownerOf(tokenID),
            splitShare(bidShares.owner, bid.amount)
        );
        // Transfer bid share to creator of media
        token.safeTransfer(
            ZooMedia(mediaAddress).tokenCreators(tokenID),
            splitShare(bidShares.creator, bid.amount)
        );
        // Transfer bid share to previous owner of media (if applicable)
        token.safeTransfer(
            ZooMedia(mediaAddress).previousTokenOwners(tokenID),
            splitShare(bidShares.prevOwner, bid.amount)
        );

        // Transfer media to bid recipient
        ZooMedia(mediaAddress).auctionTransfer(tokenID, bid.recipient);

        // Calculate the bid share for the new owner,
        // equal to 100 - creatorShare - sellOnShare
        bidShares.owner = Decimal.D256(
            uint256(100)
                .mul(Decimal.BASE)
                .sub(_bidShares[tokenID].creator.value)
                .sub(bid.sellOnShare.value)
        );
        // Set the previous owner share to the accepted bid's sell-on fee
        bidShares.prevOwner = bid.sellOnShare;

        // Remove the accepted bid
        delete _tokenBidders[tokenID][bidder];

        emit BidShareUpdated(tokenID, bidShares);
        emit BidFinalized(tokenID, bid);
    }
}
