// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./BranchMintMetatadata.sol";

interface ILazyMint {
  event TokensLazyMinted(
    uint256 indexed startTokenId,
    uint256 endTokenId,
    string baseURI,
    bytes encryptedBaseURI
  );

  function lazyMint(
    uint256 amount,
    string calldata baseURIForTokens,
    bytes calldata extraData
  ) external returns (uint256 batchId);
}

abstract contract LazyMint is ILazyMint, BatchMintMetadata {
  uint256 internal nextTokenIdToLazyMint;

  function lazyMint(
    uint256 _amount,
    string calldata _baseURIForTokens,
    bytes calldata _data
  ) public virtual override returns (uint256 batchId) {
    if (!_canLazyMint()) {
      revert("Not authorized");
    }

    if (_amount == 0) {
      revert("0 amt");
    }

    uint256 startId = nextTokenIdToLazyMint;

    (nextTokenIdToLazyMint, batchId) = _batchMintMetadata(startId, _amount, _baseURIForTokens);

    emit TokensLazyMinted(startId, startId + _amount - 1, _baseURIForTokens, _data);

    return batchId;
  }

  function _canLazyMint() internal view virtual returns (bool);
}
