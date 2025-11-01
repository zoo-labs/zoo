// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IDAOFactory {
    function createProject(
        string memory _name,
        string memory _slug,
        string memory _description,
        uint256 _fundingGoal,
        uint256 _deadline,
        string memory _ipfsHash
    ) external returns (address);
    
    function getAllProjects() external view returns (address[] memory);
    function getProjectsByCreator(address _creator) external view returns (address[] memory);
    function getProjectCount() external view returns (uint256);
    function isProject(address _project) external view returns (bool);
    function projectBySlug(string memory _slug) external view returns (address);
}