// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ICrowdfundProject {
    struct Milestone {
        string description;
        uint256 releaseAmount;
        uint256 deadline;
        bool completed;
        bool fundsReleased;
    }
    
    function contribute() external payable;
    function contributeToken(address _token, uint256 _amount) external;
    function addMilestone(string memory _description, uint256 _releaseAmount, uint256 _deadline) external;
    function voteMilestone(uint256 _milestoneId) external;
    function withdrawFunds() external;
    function refund() external;
    function cancelProject() external;
    
    function getProjectDetails() external view returns (
        string memory name,
        string memory description,
        address creator,
        uint256 fundingGoal,
        uint256 deadline,
        uint256 totalRaised,
        bool fundingComplete,
        bool projectCancelled
    );
    
    function getContributorCount() external view returns (uint256);
    function getMilestoneCount() external view returns (uint256);
    function getContributors() external view returns (address[] memory);
}