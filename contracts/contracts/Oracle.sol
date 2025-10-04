// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Oracle {
    // Oracle creator
    address public createdBy;

    // API URL that this oracle fetches from
    string public apiUrl;

    // Update interval
    string public updateInterval;

    // Dynamic data stored as string (can be JSON)
    string public dynamicData;

    // Array of verification transaction hashes
    bytes32[] public verifications;

    // Timestamp of last update
    uint256 public lastUpdateTime;

    // Events
    event DataUpdated(string newData, uint256 timestamp, bytes32 txHash);
    event VerificationAdded(bytes32 txHash);

    // Modifier to restrict access to creator only
    modifier onlyCreator() {
        require(msg.sender == createdBy, "Only creator can call this function");
        _;
    }

    /**
     * @dev Constructor to initialize the oracle
     * @param _apiUrl The API URL to fetch data from
     * @param _updateInterval How often to update (e.g., "10s", "1m", "1d")
     */
    constructor(string memory _apiUrl, string memory _updateInterval) {
        createdBy = msg.sender;
        apiUrl = _apiUrl;
        updateInterval = _updateInterval;
        lastUpdateTime = block.timestamp;
    }

    /**
     * @dev Update the oracle data
     * @param _newData The new data to store
     */
    function updateData(string memory _newData) public onlyCreator {
        dynamicData = _newData;
        lastUpdateTime = block.timestamp;

        // Create verification hash from block data
        bytes32 txHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, _newData));
        verifications.push(txHash);

        emit DataUpdated(_newData, block.timestamp, txHash);
        emit VerificationAdded(txHash);
    }

    /**
     * @dev Get all verification hashes
     * @return Array of verification transaction hashes
     */
    function getVerifications() public view returns (bytes32[] memory) {
        return verifications;
    }

    /**
     * @dev Get the number of verifications
     * @return Count of verifications
     */
    function getVerificationCount() public view returns (uint256) {
        return verifications.length;
    }

    /**
     * @dev Get a specific verification by index
     * @param index The index of the verification
     * @return The verification hash at that index
     */
    function getVerification(uint256 index) public view returns (bytes32) {
        require(index < verifications.length, "Index out of bounds");
        return verifications[index];
    }

    /**
     * @dev Get current oracle data
     * @return Current dynamicData string
     */
    function getCurrentData() public view returns (string memory) {
        return dynamicData;
    }

    /**
     * @dev Get oracle info
     * @return creator address, api url, update interval, last update time
     */
    function getOracleInfo() public view returns (
        address creator,
        string memory url,
        string memory interval,
        uint256 lastUpdate
    ) {
        return (createdBy, apiUrl, updateInterval, lastUpdateTime);
    }
}
