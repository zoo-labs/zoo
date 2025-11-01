// SPDX-License-Identifier: MIT

pragma solidity >=0.8.4;

contract Random {
    uint8 public max = 100;

    constructor() {}

    struct Commit {
        bytes32 commit;
        uint64 block;
        bool revealed;
    }

    mapping(address => Commit) public commits;

    function commit(bytes32 dataHash) public {
        commits[msg.sender].commit = dataHash;
        commits[msg.sender].block = uint64(block.number);
        commits[msg.sender].revealed = false;
        emit CommitHash(
            msg.sender,
            commits[msg.sender].commit,
            commits[msg.sender].block
        );
    }

    event CommitHash(address sender, bytes32 dataHash, uint64 block);

    function reveal(bytes32 revealHash) public {
        //make sure it hasn't been revealed yet and set it to revealed
        require(
            commits[msg.sender].revealed == false,
            "CommitReveal::reveal: Already revealed"
        );
        commits[msg.sender].revealed = true;
        //require that they can produce the committed hash
        require(
            getHash(revealHash) == commits[msg.sender].commit,
            "CommitReveal::reveal: Revealed hash does not match commit"
        );
        //require that the block number is greater than the original block
        require(
            uint64(block.number) > commits[msg.sender].block,
            "CommitReveal::reveal: Reveal and commit happened on the same block"
        );
        //require that no more than 250 blocks have passed
        require(
            uint64(block.number) <= commits[msg.sender].block + 250,
            "CommitReveal::reveal: Revealed too late"
        );
        //get the hash of the block that happened after they committed
        bytes32 blockHash = blockhash(commits[msg.sender].block);
        //hash that with their reveal that so miner shouldn't know and mod it with some max number you want
        // uint256 random = uint256(
        //     keccak256(abi.encodePacked(blockHash, revealHash))
        // ) % max;

        bytes32 bytesHash = keccak256(abi.encodePacked(blockHash, revealHash));

        uint256 bytesHashToUint = uint256(bytesHash);

        uint256 random = bytesHashToUint % max;

        emit RevealHash(msg.sender, revealHash, uint8(random));
    }

    event RevealHash(address sender, bytes32 revealHash, uint8 random);

    function getHash(bytes32 data) public view returns (bytes32) {
        return keccak256(abi.encodePacked(address(this), data));
    }

    function revealAnswer(bytes32 answer, bytes32 salt) public {
        //make sure it hasn't been revealed yet and set it to revealed
        require(
            commits[msg.sender].revealed == false,
            "CommitReveal::revealAnswer: Already revealed"
        );
        commits[msg.sender].revealed = true;
        //require that they can produce the committed hash
        require(
            getSaltedHash(answer, salt) == commits[msg.sender].commit,
            "CommitReveal::revealAnswer: Revealed hash does not match commit"
        );
        emit RevealAnswer(msg.sender, answer, salt);
    }

    event RevealAnswer(address sender, bytes32 answer, bytes32 salt);

    function getSaltedHash(bytes32 data, bytes32 salt)
        public
        view
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(address(this), data, salt));
    }
}
