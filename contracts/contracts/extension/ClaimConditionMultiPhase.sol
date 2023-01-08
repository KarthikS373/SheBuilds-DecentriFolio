// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./ClaimCondition.sol";

interface IClaimConditionMultiPhase is IClaimCondition {
  struct ClaimConditionList {
    uint256 currentStartId;
    uint256 count;
    mapping(uint256 => ClaimCondition) conditions;
    mapping(uint256 => mapping(address => uint256)) supplyClaimedByWallet;
  }
}
