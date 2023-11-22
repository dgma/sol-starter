// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ILogAutomation {
    struct Log {
        uint256 index;
        uint256 timestamp;
        bytes32 txHash;
        uint256 blockNumber;
        bytes32 blockHash;
        address source;
        bytes32[] topics;
        bytes data;
    }

    function checkLog(
        Log calldata log,
        bytes memory checkData
    ) external returns (bool upkeepNeeded, bytes memory performData);

    function performUpkeep(bytes calldata performData) external;
}
