// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.0;

interface IOperatorFilterToggle {
  event OperatorRestriction(bool restriction);

  function operatorRestriction() external view returns (bool);

  function setOperatorRestriction(bool restriction) external;
}

abstract contract OperatorFilterToggle is IOperatorFilterToggle {
  bool public operatorRestriction;

  function setOperatorRestriction(bool _restriction) external {
    require(_canSetOperatorRestriction(), "Not authorized to set operator restriction.");
    _setOperatorRestriction(_restriction);
  }

  function _setOperatorRestriction(bool _restriction) internal {
    operatorRestriction = _restriction;
    emit OperatorRestriction(_restriction);
  }

  function _canSetOperatorRestriction() internal virtual returns (bool);
}
