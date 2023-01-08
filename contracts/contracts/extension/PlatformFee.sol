// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IPlatformFee {
  function getPlatformFeeInfo() external view returns (address, uint16);

  function setPlatformFeeInfo(address _platformFeeRecipient, uint256 _platformFeeBps) external;

  event PlatformFeeInfoUpdated(address indexed platformFeeRecipient, uint256 platformFeeBps);
}

abstract contract PlatformFee is IPlatformFee {
  address private platformFeeRecipient;

  uint16 private platformFeeBps;

  function getPlatformFeeInfo() public view override returns (address, uint16) {
    return (platformFeeRecipient, uint16(platformFeeBps));
  }

  function setPlatformFeeInfo(
    address _platformFeeRecipient,
    uint256 _platformFeeBps
  ) external override {
    if (!_canSetPlatformFeeInfo()) {
      revert("Not authorized");
    }
    _setupPlatformFeeInfo(_platformFeeRecipient, _platformFeeBps);
  }

  function _setupPlatformFeeInfo(address _platformFeeRecipient, uint256 _platformFeeBps) internal {
    if (_platformFeeBps > 10_000) {
      revert("Exceeds max bps");
    }

    platformFeeBps = uint16(_platformFeeBps);
    platformFeeRecipient = _platformFeeRecipient;

    emit PlatformFeeInfoUpdated(_platformFeeRecipient, _platformFeeBps);
  }

  function _canSetPlatformFeeInfo() internal view virtual returns (bool);
}
