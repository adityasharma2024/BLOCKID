// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BlockID {
    event BlockCreated(address indexed creator, uint256 indexed id, string cid, string title, uint256 timestamp, uint256 fee);

    struct Block {
        uint256 id;
        address creator;
        string cid;
        string title;
        uint256 timestamp;
        uint256 fee;
    }

    uint256 public nextId;
    mapping(uint256 => Block) public blocks;
    mapping(address => bool) public hasBlockId;
    mapping(address => uint256) public ownerToId;

    constructor() {
        nextId = 1;
    }

    function registerBlock(string calldata cid, string calldata title) external payable returns (uint256) {
        require(msg.value > 0, "You must send some Ether to register a BlockID");
        require(!hasBlockId[msg.sender], "Account already has a BlockID");
        uint256 id = nextId++;
        blocks[id] = Block(id, msg.sender, cid, title, block.timestamp, msg.value);
        hasBlockId[msg.sender] = true;
        ownerToId[msg.sender] = id;
        emit BlockCreated(msg.sender, id, cid, title, block.timestamp, msg.value);
        return id;
    }

    function getBlock(uint256 id) external view returns (Block memory) {
        return blocks[id];
    }

    function hasRegistered(address user) external view returns (bool) {
        return hasBlockId[user];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getMyId(address user) external view returns (uint256) {
        return ownerToId[user];
    }
}
