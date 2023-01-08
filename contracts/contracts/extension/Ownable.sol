// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IOwnable {
  function owner() external view returns (address);

  function setOwner(address _newOwner) external;

  event OwnerUpdated(address indexed prevOwner, address indexed newOwner);
}

abstract contract Ownable is IOwnable {
  address private _owner;

  modifier onlyOwner() {
    if (msg.sender != _owner) {
      revert("Not authorized");
    }
    _;
  }

  function owner() public view override returns (address) {
    return _owner;
  }

  function setOwner(address _newOwner) external override {
    if (!_canSetOwner()) {
      revert("Not authorized");
    }
    _setupOwner(_newOwner);
  }

  function _setupOwner(address _newOwner) internal {
    address _prevOwner = _owner;
    _owner = _newOwner;

    emit OwnerUpdated(_prevOwner, _newOwner);
  }

  function _canSetOwner() internal view virtual returns (bool);
}
