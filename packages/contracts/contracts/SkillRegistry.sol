// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SkillRegistry is Ownable {
    error EmptyField();
    error NotCreator();
    error InvalidSkill();
    error InvalidRating();
    error SkillInactive();

    struct Skill {
        string name;
        string description;
        string endpoint;
        string category;
        string pricingAsset;
        address creator;
        uint256 priceAtomic;
        uint256 invocationCount;
        uint256 ratingBps;
        uint256 ratingCount;
        bool active;
        uint256 version;
        uint64 createdAt;
        uint64 updatedAt;
    }

    mapping(bytes32 => Skill) public skills;
    mapping(address => bytes32[]) public creatorSkills;
    mapping(bytes32 => mapping(address => bool)) public hasRated;
    bytes32[] private allSkillIds;

    uint256 public skillCount;

    event SkillRegistered(bytes32 indexed skillId, address indexed creator, string name, string endpoint);
    event SkillUpdated(bytes32 indexed skillId, string endpoint, uint256 priceAtomic, uint256 version);
    event SkillDeactivated(bytes32 indexed skillId);
    event SkillInvoked(bytes32 indexed skillId, address indexed caller, uint256 invocationCount);
    event SkillRated(bytes32 indexed skillId, address indexed rater, uint256 ratingBps, uint256 ratingCount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function registerSkill(
        string calldata name,
        string calldata description,
        string calldata endpoint,
        string calldata category,
        string calldata pricingAsset,
        uint256 priceAtomic
    ) external returns (bytes32 skillId) {
        if (
            bytes(name).length == 0 ||
            bytes(description).length == 0 ||
            bytes(endpoint).length == 0 ||
            bytes(category).length == 0 ||
            bytes(pricingAsset).length == 0
        ) revert EmptyField();

        skillId = keccak256(abi.encodePacked(msg.sender, name, endpoint, block.chainid, skillCount));
        Skill storage skill = skills[skillId];
        skill.name = name;
        skill.description = description;
        skill.endpoint = endpoint;
        skill.category = category;
        skill.pricingAsset = pricingAsset;
        skill.creator = msg.sender;
        skill.priceAtomic = priceAtomic;
        skill.active = true;
        skill.version = 1;
        skill.createdAt = uint64(block.timestamp);
        skill.updatedAt = uint64(block.timestamp);

        creatorSkills[msg.sender].push(skillId);
        allSkillIds.push(skillId);
        unchecked {
            skillCount += 1;
        }

        emit SkillRegistered(skillId, msg.sender, name, endpoint);
    }

    function updateSkill(bytes32 skillId, string calldata endpoint, uint256 priceAtomic) external {
        Skill storage skill = skills[skillId];
        if (skill.creator == address(0)) revert InvalidSkill();
        if (skill.creator != msg.sender) revert NotCreator();
        if (bytes(endpoint).length == 0) revert EmptyField();

        skill.endpoint = endpoint;
        skill.priceAtomic = priceAtomic;
        skill.version += 1;
        skill.updatedAt = uint64(block.timestamp);

        emit SkillUpdated(skillId, endpoint, priceAtomic, skill.version);
    }

    function deactivateSkill(bytes32 skillId) external {
        Skill storage skill = skills[skillId];
        if (skill.creator == address(0)) revert InvalidSkill();
        if (skill.creator != msg.sender && owner() != msg.sender) revert NotCreator();
        skill.active = false;
        skill.updatedAt = uint64(block.timestamp);
        emit SkillDeactivated(skillId);
    }

    function recordInvocation(bytes32 skillId, address caller) external onlyOwner {
        Skill storage skill = skills[skillId];
        if (skill.creator == address(0)) revert InvalidSkill();
        if (!skill.active) revert SkillInactive();
        unchecked {
            skill.invocationCount += 1;
        }
        skill.updatedAt = uint64(block.timestamp);
        emit SkillInvoked(skillId, caller, skill.invocationCount);
    }

    function rateSkill(bytes32 skillId, uint256 rating) external {
        Skill storage skill = skills[skillId];
        if (skill.creator == address(0)) revert InvalidSkill();
        if (!skill.active) revert SkillInactive();
        if (rating < 1 || rating > 5) revert InvalidRating();
        if (hasRated[skillId][msg.sender]) revert InvalidRating();

        uint256 ratingBps = rating * 100;
        uint256 total = (skill.ratingBps * skill.ratingCount) + ratingBps;
        unchecked {
            skill.ratingCount += 1;
        }
        skill.ratingBps = total / skill.ratingCount;
        hasRated[skillId][msg.sender] = true;
        skill.updatedAt = uint64(block.timestamp);

        emit SkillRated(skillId, msg.sender, skill.ratingBps, skill.ratingCount);
    }

    function getSkill(bytes32 skillId) external view returns (Skill memory) {
        Skill memory skill = skills[skillId];
        if (skill.creator == address(0)) revert InvalidSkill();
        return skill;
    }

    function getAllSkillIds() external view returns (bytes32[] memory) {
        return allSkillIds;
    }

    function getCreatorSkills(address creator) external view returns (bytes32[] memory) {
        return creatorSkills[creator];
    }
}

