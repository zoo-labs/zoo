// SPDX-License-Identifier: GPL-3.0
// Forked from https://github.com/ourzora/core @ 450cd154bfbb70f62e94050cc3f1560d58e0506a

pragma solidity >=0.8.4;
pragma experimental ABIEncoderV2;

import "./ERC721Burnable.sol";

import { EnumerableSet } from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { SafeMath } from "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import { Decimal } from "./Decimal.sol";
import { IMarket } from "./interfaces/IMarket.sol";
import { IMedia } from "./interfaces/IMedia.sol";
import { IZoo } from "./interfaces/IZoo.sol";

import "./console.sol";

/**
 * @title A media value system, with perpetual equity to creators
 * @notice This contract provides an interface to mint media with a market
 */
contract ZooMedia is IMedia, ERC721Burnable, ReentrancyGuard {
    using Counters for Counters.Counter;
    using SafeMath for uint256;
    using EnumerableSet for EnumerableSet.UintSet;

    /* *******
     * Globals
     * *******
     */

    // Deployment Address
    address private _owner;

    // Address of ZooKeeper
    address public keeperAddress;

    // Address of ZooMarket
    address public marketAddress;

    // Mapping from token to previous owner of the token
    mapping(uint256 => address) public previousTokenOwners;

    // Mapping from token id to creator address
    mapping(uint256 => address) public tokenCreators;

    // Mapping from creator address to their (enumerable) set of created tokens
    mapping(address => EnumerableSet.UintSet) private _creatorTokens;

    // Mapping from token id to sha256 hash of content
    mapping(uint256 => bytes32) public tokenContentHashes;

    // Mapping from token id to sha256 hash of metadata
    mapping(uint256 => bytes32) public tokenMetadataHashes;

    // Mapping from token id to metadataURI
    mapping(uint256 => string) private _tokenMetadataURIs;

    // Mapping from contentHash to bool
    mapping(bytes32 => bool) private _contentHashes;

    //keccak256("Permit(address spender,uint256 tokenID,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH =
        0x49ecf333e5b8c95c40fdafc95c1ad136e8914a8fb55e9dc8bb01eaa83a2df9ad;

    //keccak256("MintWithSig(bytes32 contentHash,bytes32 metadataHash,uint256 creatorShare,uint256 nonce,uint256 deadline)");
    bytes32 public constant MINT_WITH_SIG_TYPEHASH =
        0x2952e482b8e2b192305f87374d7af45dc2eafafe4f50d26a0c02e90f2fdbe14b;

    // Mapping from address to token id to permit nonce
    mapping(address => mapping(uint256 => uint256)) public permitNonces;

    // Mapping from address to mint with sig nonce
    mapping(address => uint256) public mintWithSigNonces;

    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *     bytes4(keccak256('tokenMetadataURI(uint256)')) == 0x157c3df9
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd ^ 0x157c3df9 == 0x4e222e66
     */
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x4e222e66;

    Counters.Counter private _tokenIDTracker;

    /* *********
     * Modifiers
     * *********
     */

    modifier onlyZoo() {
        require(
            keeperAddress == msg.sender || marketAddress == msg.sender,
            "ZooMarket: Only Zoo contracts can call this method"
        );
        _;
    }

    modifier onlyOwner() {
        require(_owner == msg.sender, "ZooMarket: Only owner has access");
        _;
    }

    /**
     * @notice Require that the token has not been burned and has been minted
     */

    modifier onlyExistingToken(uint256 tokenID) {
        require(tokenExists(tokenID), "ZooMedia: nonexistent token");
        _;
    }

    /**
     * @notice Require that the token has had a content hash set
     */
    modifier onlyTokenWithContentHash(uint256 tokenID) {
        require(
            tokenContentHashes[tokenID] != 0,
            "ZooMedia: token does not have hash of created content"
        );
        _;
    }

    /**
     * @notice Require that the token has had a metadata hash set
     */
    modifier onlyTokenWithMetadataHash(uint256 tokenID) {
        require(
            tokenMetadataHashes[tokenID] != 0,
            "ZooMedia: token does not have hash of its metadata"
        );
        _;
    }

    /**
     * @notice Ensure that the provided spender is the approved or the owner of
     * the media for the specified tokenID
     */
    modifier onlyApprovedOrOwner(address spender, uint256 tokenID) {
        require(
            _isKeeper(msg.sender) || _isApprovedOrOwner(spender, tokenID),
            "ZooMedia: Only approved or owner"
        );
        _;
    }

    /**
     * @notice Ensure the token has been created (even if it has been burned)
     */
    modifier onlyTokenCreated(uint256 tokenID) {
        require(
            _tokenIDTracker.current() >= tokenID,
            "ZooMedia: token with that id does not exist"
        );
        _;
    }

    /**
     * @notice Ensure that the provided URI is not empty
     */
    modifier onlyValidURI(string memory uri) {
        require(
            bytes(uri).length != 0,
            "ZooMedia: specified uri must be non-empty"
        );
        _;
    }

    /**
     * @notice On deployment, set the market contract address and register the
     * ERC721 metadata interface
     */
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {
        _owner = msg.sender;
        _registerInterface(_INTERFACE_ID_ERC721_METADATA);
    }

    function _isKeeper(address _address) internal view returns (bool) {
        return keeperAddress == _address;
    }

    /**
     * @notice Sets the media contract address. This address is the only permitted address that
     * can call the mutable functions. This method can only be called once.
     */
    function configure(address _keeperAddress, address _marketAddress)
        external
        onlyOwner
    {

        // require(marketAddress == address(0), "ZooMedia: Already configured");
        // require(keeperAddress == address(0), "ZooMedia: Already configured");
        require(
            _keeperAddress != address(0),
            "Market: cannot set keeper contract as zero address"
        );
        require(
            _marketAddress != address(0),
            "Market: cannot set market contract as zero address"
        );

        keeperAddress = _keeperAddress;
        marketAddress = _marketAddress;
    }

    /* **************
     * View Functions
     * **************
     */

    /**
     * @notice Helper to check that token has not been burned or minted
     */
    function tokenExists(uint256 tokenID) public override view returns (bool) {
        return _exists(tokenID);
    }

    /**
     * @notice return the URI for a particular piece of media with the specified tokenID
     * @dev This function is an override of the base OZ implementation because we
     * will return the tokenURI even if the media has been burned. In addition, this
     * protocol does not support a base URI, so relevant conditionals are removed.
     * @return the URI for a token
     */
    function tokenURI(uint256 tokenID)
        public
        view
        override
        onlyTokenCreated(tokenID)
        returns (string memory)
    {
        string memory _tokenURI = _tokenURIs[tokenID];
        return _tokenURI;
    }

    /**
     * @notice Return the metadata URI for a piece of media given the token URI
     * @return the metadata URI for the token
     */
    function tokenMetadataURI(uint256 tokenID)
        external
        view
        override
        onlyTokenCreated(tokenID)
        returns (string memory)
    {
        return _tokenMetadataURIs[tokenID];
    }

    /* ****************
     * Public Functions
     * ****************
     */

    /**
     * @notice see IMedia
     */
    function mint(MediaData memory data, IMarket.BidShares memory bidShares)
        public
        override
        nonReentrant
    {
        _mintForCreator(msg.sender, data, bidShares, "");
    }

    function _hashToken(address owner, IZoo.Token memory token) private view returns (IZoo.Token memory) {
        console.log('_hashToken', token.data.tokenURI, token.data.metadataURI);
        token.data.contentHash = keccak256(
            abi.encodePacked(token.data.tokenURI, block.number, owner)
        );
        token.data.metadataHash = keccak256(
            abi.encodePacked(token.data.metadataURI, block.number, owner)
        );
        return token;
    }

    function mintToken(address owner, IZoo.Token memory token) external override nonReentrant returns (IZoo.Token memory) {
        console.log('mintToken', owner, token.name);
        token = _hashToken(owner, token);
        _mintForCreator(owner, token.data, token.bidShares, "");
        uint256 id = getRecentToken(owner);
        token.id = id;
        return token;
    }

    function burnToken(address owner, uint256 tokenID) external override nonReentrant onlyExistingToken(tokenID) onlyApprovedOrOwner(owner, tokenID) {
        _burn(tokenID);
    }

    /**
     * @notice see IMedia
     */
    function mintWithSig(
        address creator,
        MediaData memory data,
        IMarket.BidShares memory bidShares,
        EIP712Signature memory sig
    ) public override nonReentrant {
        require(
            sig.deadline == 0 || sig.deadline >= block.timestamp,
            "ZooMedia: mintWithSig expired"
        );

        bytes32 domainSeparator = _calculateDomainSeparator();

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        MINT_WITH_SIG_TYPEHASH,
                        data.contentHash,
                        data.metadataHash,
                        bidShares.creator.value,
                        mintWithSigNonces[creator]++,
                        sig.deadline
                    )
                )
            )
        );

        address recoveredAddress = ecrecover(digest, sig.v, sig.r, sig.s);

        require(
            recoveredAddress != address(0) && creator == recoveredAddress,
            "ZooMedia: Signature invalid"
        );

        _mintForCreator(recoveredAddress, data, bidShares, "");
    }

    /**
     * @notice see IMedia
     */
    function transfer(uint256 tokenID, address recipient) external {
        require(msg.sender == marketAddress, "ZooMedia: only market contract");
        previousTokenOwners[tokenID] = ownerOf(tokenID);
        _transfer(ownerOf(tokenID), recipient, tokenID);
    }

    /**
     * @notice see IMedia
     */
    function getRecentToken(address creator) public view returns (uint256) {
        uint256 length = EnumerableSet.length(_creatorTokens[creator]) - 1;

        return EnumerableSet.at(_creatorTokens[creator], length);
    }

    /**
     * @notice see IMedia
     */
    function auctionTransfer(uint256 tokenID, address recipient)
        external
        override
    {
        require(msg.sender == marketAddress, "ZooMedia: only market contract");
        previousTokenOwners[tokenID] = ownerOf(tokenID);
        _safeTransfer(ownerOf(tokenID), recipient, tokenID, "");
    }

    /**
     * @notice see IMedia
     */
    function setAsk(uint256 tokenID, IMarket.Ask memory ask)
        public
        override
        nonReentrant
        onlyApprovedOrOwner(msg.sender, tokenID)
    {
        IMarket(marketAddress).setAsk(tokenID, ask);
    }

    /**
     * @notice see IMedia
     */
    function removeAsk(uint256 tokenID)
        external
        override
        nonReentrant
        onlyApprovedOrOwner(msg.sender, tokenID)
    {
        IMarket(marketAddress).removeAsk(tokenID);
    }

    /**
     * @notice see IMedia
     */
    function setBid(uint256 tokenID, IMarket.Bid memory bid)
        public
        override
        nonReentrant
        onlyExistingToken(tokenID)
    {
        require(msg.sender == bid.bidder, "Market: Bidder must be msg sender");
        IMarket(marketAddress).setBid(tokenID, bid, msg.sender);
    }

    /**
     * @notice see IMedia
     */
    function removeBid(uint256 tokenID)
        external
        override
        nonReentrant
        onlyTokenCreated(tokenID)
    {
        IMarket(marketAddress).removeBid(tokenID, msg.sender);
    }

    /**
     * @notice see IMedia
     */
    function acceptBid(uint256 tokenID, IMarket.Bid memory bid)
        public
        override
        nonReentrant
        onlyApprovedOrOwner(msg.sender, tokenID)
    {
        IMarket(marketAddress).acceptBid(tokenID, bid);
    }

    /**
     * @notice Burn a token.
     * @dev Only callable if the media owner is also the creator.
     */
    function burn(uint256 tokenID)
        public
        override
        nonReentrant
        onlyExistingToken(tokenID)
        onlyApprovedOrOwner(msg.sender, tokenID)
    {
        address owner = ownerOf(tokenID);

        require(
            tokenCreators[tokenID] == owner,
            "ZooMedia: owner is not creator of media"
        );

        _burn(tokenID);
    }

    /**
     * @notice Revoke the approvals for a token. The provided `approve` function is not sufficient
     * for this protocol, as it does not allow an approved address to revoke it's own approval.
     * In instances where a 3rd party is interacting on a user's behalf via `permit`, they should
     * revoke their approval once their task is complete as a best practice.
     */
    function revokeApproval(uint256 tokenID) external override nonReentrant {
        require(
            msg.sender == getApproved(tokenID),
            "ZooMedia: caller not approved address"
        );
        _approve(address(0), tokenID);
    }

    /**
     * @notice see IMedia
     * @dev only callable by approved or owner
     */
    function updateTokenURI(uint256 tokenID, string calldata _tokenURI)
        external
        override
        nonReentrant
        onlyApprovedOrOwner(msg.sender, tokenID)
        onlyTokenWithContentHash(tokenID)
        onlyValidURI(_tokenURI)
    {
        _setTokenURI(tokenID, _tokenURI);
        emit TokenURIUpdated(tokenID, msg.sender, _tokenURI);
    }

    /**
     * @notice see IMedia
     * @dev only callable by approved or owner
     */
    function updateTokenMetadataURI(
        uint256 tokenID,
        string calldata metadataURI
    )
        external
        override
        nonReentrant
        onlyApprovedOrOwner(msg.sender, tokenID)
        onlyTokenWithMetadataHash(tokenID)
        onlyValidURI(metadataURI)
    {
        _setTokenMetadataURI(tokenID, metadataURI);
        emit TokenMetadataURIUpdated(tokenID, msg.sender, metadataURI);
    }

    /**
     * @notice See IMedia
     * @dev This method is loosely based on the permit for ERC-20 tokens in  EIP-2612, but modified
     * for ERC-721.
     */
    function permit(
        address spender,
        uint256 tokenID,
        EIP712Signature memory sig
    ) public override nonReentrant onlyExistingToken(tokenID) {
        require(
            sig.deadline == 0 || sig.deadline >= block.timestamp,
            "ZooMedia: Permit expired"
        );
        require(spender != address(0), "ZooMedia: spender cannot be 0x0");
        bytes32 domainSeparator = _calculateDomainSeparator();

        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                domainSeparator,
                keccak256(
                    abi.encode(
                        PERMIT_TYPEHASH,
                        spender,
                        tokenID,
                        permitNonces[ownerOf(tokenID)][tokenID]++,
                        sig.deadline
                    )
                )
            )
        );

        address recoveredAddress = ecrecover(digest, sig.v, sig.r, sig.s);

        require(
            recoveredAddress != address(0) &&
                ownerOf(tokenID) == recoveredAddress,
            "ZooMedia: Signature invalid"
        );

        _approve(spender, tokenID);
    }

    /* *****************
     * Private Functions
     * *****************
     */

    /**
     * @notice Creates a new token for `creator`. Its token ID will be automatically
     * assigned (and available on the emitted {IERC721-Transfer} event), and the token
     * URI autogenerated based on the base URI passed at construction.
     *
     * See {ERC721-_safeMint}.
     *
     * On mint, also set the sha256 hashes of the content and its metadata for integrity
     * checks, along with the initial URIs to point to the content and metadata. Attribute
     * the token ID to the creator, mark the content hash as used, and set the bid shares for
     * the media's market.
     *
     * Note that although the content hash must be unique for future mints to prevent duplicate media,
     * metadata has no such requirement.
     */
    function _mintForCreator(
        address creator,
        MediaData memory data,
        IMarket.BidShares memory bidShares,
        bytes memory tokenType
    ) internal onlyValidURI(data.tokenURI) onlyValidURI(data.metadataURI) {
        console.log("_mintForCreator", data.tokenURI, data.metadataURI, bidShares.creator.value);

        require(
            data.contentHash != 0,
            "ZooMedia: content hash must be non-zero"
        );
        require(
            _contentHashes[data.contentHash] == false,
            "ZooMedia: a token has already been created with this content hash"
        );
        require(
            data.metadataHash != 0,
            "ZooMedia: metadata hash must be non-zero"
        );

        // Get a new ID
        _tokenIDTracker.increment();
        uint256 tokenID = _tokenIDTracker.current();

        console.log("_safeMint", creator, tokenID);
        _safeMint(creator, tokenID, tokenType);
        _setTokenContentHash(tokenID, data.contentHash);
        _setTokenMetadataHash(tokenID, data.metadataHash);
        _setTokenMetadataURI(tokenID, data.metadataURI);
        _setTokenURI(tokenID, data.tokenURI);
        _creatorTokens[creator].add(tokenID);
        _contentHashes[data.contentHash] = true;

        tokenCreators[tokenID] = creator;
        previousTokenOwners[tokenID] = creator;

        console.log("_creatorTokens[creator].add(tokenID)", creator, tokenID);

        // ZK now responsible for setting bid shares externally
        // IMarket(marketAddress).setBidShares(tokenID, bidShares);
    }

    function _setTokenContentHash(uint256 tokenID, bytes32 contentHash)
        internal
        virtual
        onlyExistingToken(tokenID)
    {
        tokenContentHashes[tokenID] = contentHash;
    }

    function _setTokenMetadataHash(uint256 tokenID, bytes32 metadataHash)
        internal
        virtual
        onlyExistingToken(tokenID)
    {
        tokenMetadataHashes[tokenID] = metadataHash;
    }

    function _setTokenMetadataURI(uint256 tokenID, string memory metadataURI)
        internal
        virtual
        onlyExistingToken(tokenID)
    {
        _tokenMetadataURIs[tokenID] = metadataURI;
    }

    /**
     * @notice Destroys `tokenID`.
     * @dev We modify the OZ _burn implementation to
     * maintain metadata and to remove the
     * previous token owner from the piece
     */
    function _burn(uint256 tokenID) internal override {
        // string memory _tokenURI = _tokenURIs[tokenID];

        super._burn(tokenID);

        // if (bytes(_tokenURI).length != 0) {
        //     _tokenURIs[tokenID] = _tokenURI;
        // }

        delete previousTokenOwners[tokenID];
    }

    /**
     * @notice transfer a token and remove the ask for it.
     */
    function _transfer(
        address from,
        address to,
        uint256 tokenID
    ) internal override {
        IMarket(marketAddress).removeAsk(tokenID);
        super._transfer(from, to, tokenID);
    }

    /**
     * @dev Calculates EIP712 DOMAIN_SEPARATOR based on the current contract and chain ID.
     */
    function _calculateDomainSeparator() internal view returns (bytes32) {
        uint256 chainID;
        /* solium-disable-next-line */
        assembly {
            chainID := chainid()
        }

        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,uint256 chainID,address verifyingContract)"
                    ),
                    keccak256(bytes("CryptoZoo")),
                    keccak256(bytes("1")),
                    chainID,
                    address(this)
                )
            );
    }
}
