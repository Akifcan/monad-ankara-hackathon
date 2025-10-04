// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Oracle {
    // Master wallet address (backend wallet for automated updates)
    address public constant MASTER_WALLET = 0xF739AF0C0cC448B41c47cc38070f10a0B4BE50b4;

    // Verification struct
    struct Verification {
        bytes32 txHash;
        string data;
    }

    // Oracle creator
    address public createdBy;

    // API URL that this oracle fetches from
    string public apiUrl;

    // Update interval
    string public updateInterval;

    // Dynamic data stored as string (can be JSON)
    string public dynamicData;

    // Array of verifications (tx hash + data)
    Verification[] public verifications;

    // Timestamp of last update
    uint256 public lastUpdateTime;

    // Validation status
    bool public isValidated;

    // Events
    event DataUpdated(string newData, uint256 timestamp, bytes32 txHash);
    event VerificationAdded(bytes32 txHash);

    // Modifier to restrict access to master wallet only
    modifier onlyMasterWallet() {
        require(msg.sender == MASTER_WALLET, "Only master wallet can call this function");
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
        // lastUpdateTime will be 0 until first update
    }

    /**
     * @dev Update the oracle data
     * @param _newData The new data to store
     */
    function updateData(string memory _newData) public onlyMasterWallet {
        dynamicData = _newData;
        lastUpdateTime = block.timestamp;

        // Create verification hash from block data
        bytes32 txHash = keccak256(abi.encodePacked(block.timestamp, msg.sender, _newData));

        // Add verification with tx hash and data
        verifications.push(Verification({
            txHash: txHash,
            data: _newData
        }));

        emit DataUpdated(_newData, block.timestamp, txHash);
        emit VerificationAdded(txHash);
    }

    /**
     * @dev Get all verifications
     * @return Array of verification structs (txHash + data)
     */
    function getVerifications() public view returns (Verification[] memory) {
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
     * @return The verification struct at that index (txHash + data)
     */
    function getVerification(uint256 index) public view returns (Verification memory) {
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
