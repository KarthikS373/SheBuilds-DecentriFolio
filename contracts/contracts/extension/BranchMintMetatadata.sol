// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

contract BatchMintMetadata {
  uint256[] private batchIds;

  mapping(uint256 => string) private baseURI;

  function getBaseURICount() public view returns (uint256) {
    return batchIds.length;
  }

  function getBatchIdAtIndex(uint256 _index) public view returns (uint256) {
    if (_index >= getBaseURICount()) {
      revert("Invalid index");
    }
    return batchIds[_index];
  }

  function _getBatchId(uint256 _tokenId) internal view returns (uint256 batchId, uint256 index) {
    uint256 numOfTokenBatches = getBaseURICount();
    uint256[] memory indices = batchIds;

    for (uint256 i = 0; i < numOfTokenBatches; i += 1) {
      if (_tokenId < indices[i]) {
        index = i;
        batchId = indices[i];

        return (batchId, index);
      }
    }

    revert("Invalid tokenId");
  }

  function _getBaseURI(uint256 _tokenId) internal view returns (string memory) {
    uint256 numOfTokenBatches = getBaseURICount();
    uint256[] memory indices = batchIds;

    for (uint256 i = 0; i < numOfTokenBatches; i += 1) {
      if (_tokenId < indices[i]) {
        return baseURI[indices[i]];
      }
    }
    revert("Invalid tokenId");
  }

  function _setBaseURI(uint256 _batchId, string memory _baseURI) internal {
    baseURI[_batchId] = _baseURI;
  }

  function _batchMintMetadata(
    uint256 _startId,
    uint256 _amountToMint,
    string memory _baseURIForTokens
  ) internal returns (uint256 nextTokenIdToMint, uint256 batchId) {
    batchId = _startId + _amountToMint;
    nextTokenIdToMint = batchId;

    batchIds.push(batchId);

    baseURI[batchId] = _baseURIForTokens;
  }
}
