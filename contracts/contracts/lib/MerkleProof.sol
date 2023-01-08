// SPDX-License-Identifier: MIT
// Modified from https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.3.0/contracts/utils/cryptography/MerkleProof.sol
// Copied from https://github.com/ensdomains/governance/blob/master/contracts/MerkleProof.sol
pragma solidity ^0.8.0;

library MerkleProof {
  function verify(
    bytes32[] memory proof,
    bytes32 root,
    bytes32 leaf
  ) internal pure returns (bool, uint256) {
    bytes32 computedHash = leaf;
    uint256 index = 0;

    for (uint256 i = 0; i < proof.length; i++) {
      index *= 2;
      bytes32 proofElement = proof[i];

      if (computedHash <= proofElement) {
        computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
      } else {
        computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
        index += 1;
      }
    }
    return (computedHash == root, index);
  }
}
