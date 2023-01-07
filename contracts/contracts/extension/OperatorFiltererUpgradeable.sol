// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./OperatorFilterToggle.sol";

interface IOperatorFilterRegistry {
  function isOperatorAllowed(address registrant, address operator) external view returns (bool);

  function register(address registrant) external;

  function registerAndSubscribe(address registrant, address subscription) external;

  function registerAndCopyEntries(address registrant, address registrantToCopy) external;

  function unregister(address addr) external;

  function updateOperator(address registrant, address operator, bool filtered) external;

  function updateOperators(
    address registrant,
    address[] calldata operators,
    bool filtered
  ) external;

  function updateCodeHash(address registrant, bytes32 codehash, bool filtered) external;

  function updateCodeHashes(
    address registrant,
    bytes32[] calldata codeHashes,
    bool filtered
  ) external;

  function subscribe(address registrant, address registrantToSubscribe) external;

  function unsubscribe(address registrant, bool copyExistingEntries) external;

  function subscriptionOf(address addr) external returns (address registrant);

  function subscribers(address registrant) external returns (address[] memory);

  function subscriberAt(address registrant, uint256 index) external returns (address);

  function copyEntriesOf(address registrant, address registrantToCopy) external;

  function isOperatorFiltered(address registrant, address operator) external returns (bool);

  function isCodeHashOfFiltered(
    address registrant,
    address operatorWithCode
  ) external returns (bool);

  function isCodeHashFiltered(address registrant, bytes32 codeHash) external returns (bool);

  function filteredOperators(address addr) external returns (address[] memory);

  function filteredCodeHashes(address addr) external returns (bytes32[] memory);

  function filteredOperatorAt(address registrant, uint256 index) external returns (address);

  function filteredCodeHashAt(address registrant, uint256 index) external returns (bytes32);

  function isRegistered(address addr) external returns (bool);

  function codeHashOf(address addr) external returns (bytes32);
}

abstract contract OperatorFiltererUpgradeable is OperatorFilterToggle {
  error OperatorNotAllowed(address operator);

  IOperatorFilterRegistry constant OPERATOR_FILTER_REGISTRY =
    IOperatorFilterRegistry(0x000000000000AAeB6D7670E522A718067333cd4E);

  function __OperatorFilterer_init(
    address subscriptionOrRegistrantToCopy,
    bool subscribe
  ) internal {
    if (address(OPERATOR_FILTER_REGISTRY).code.length > 0) {
      if (!OPERATOR_FILTER_REGISTRY.isRegistered(address(this))) {
        if (subscribe) {
          OPERATOR_FILTER_REGISTRY.registerAndSubscribe(
            address(this),
            subscriptionOrRegistrantToCopy
          );
        } else {
          if (subscriptionOrRegistrantToCopy != address(0)) {
            OPERATOR_FILTER_REGISTRY.registerAndCopyEntries(
              address(this),
              subscriptionOrRegistrantToCopy
            );
          } else {
            OPERATOR_FILTER_REGISTRY.register(address(this));
          }
        }
      }
    }
  }

  modifier onlyAllowedOperator(address from) virtual {
    if (operatorRestriction) {
      if (address(OPERATOR_FILTER_REGISTRY).code.length > 0) {
        if (from == msg.sender) {
          _;
          return;
        }
        if (!OPERATOR_FILTER_REGISTRY.isOperatorAllowed(address(this), msg.sender)) {
          revert OperatorNotAllowed(msg.sender);
        }
      }
    }
    _;
  }

  modifier onlyAllowedOperatorApproval(address operator) virtual {
    if (operatorRestriction) {
      if (address(OPERATOR_FILTER_REGISTRY).code.length > 0) {
        if (!OPERATOR_FILTER_REGISTRY.isOperatorAllowed(address(this), operator)) {
          revert OperatorNotAllowed(operator);
        }
      }
    }
    _;
  }
}
