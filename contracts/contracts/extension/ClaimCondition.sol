// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IClaimCondition {
  struct ClaimCondition {
    uint256 startTimestamp;
    uint256 maxClaimableSupply;
    uint256 supplyClaimed;
    uint256 quantityLimitPerWallet;
    bytes32 merkleRoot;
    uint256 pricePerToken;
    address currency;
    string metadata;
  }
}
