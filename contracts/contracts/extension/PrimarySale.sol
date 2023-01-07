// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

interface IPrimarySale {
  function primarySaleRecipient() external view returns (address);

  function setPrimarySaleRecipient(address _saleRecipient) external;

  event PrimarySaleRecipientUpdated(address indexed recipient);
}

abstract contract PrimarySale is IPrimarySale {
  address private recipient;

  function primarySaleRecipient() public view override returns (address) {
    return recipient;
  }

  function setPrimarySaleRecipient(address _saleRecipient) external override {
    if (!_canSetPrimarySaleRecipient()) {
      revert("Not authorized");
    }
    _setupPrimarySaleRecipient(_saleRecipient);
  }

  function _setupPrimarySaleRecipient(address _saleRecipient) internal {
    recipient = _saleRecipient;
    emit PrimarySaleRecipientUpdated(_saleRecipient);
  }

  function _canSetPrimarySaleRecipient() internal view virtual returns (bool);
}
