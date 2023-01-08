// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.0;

import "./ClaimConditionMultiPhase.sol";
import "../lib/MerkleProof.sol";

interface IDrop1155 is IClaimConditionMultiPhase {
  struct AllowlistProof {
    bytes32[] proof;
    uint256 quantityLimitPerWallet;
    uint256 pricePerToken;
    address currency;
  }

  event TokensClaimed(
    uint256 indexed claimConditionIndex,
    address indexed claimer,
    address indexed receiver,
    uint256 tokenId,
    uint256 quantityClaimed
  );

  event ClaimConditionsUpdated(
    uint256 indexed tokenId,
    ClaimCondition[] claimConditions,
    bool resetEligibility
  );

  function claim(
    address receiver,
    uint256 tokenId,
    uint256 quantity,
    address currency,
    uint256 pricePerToken,
    AllowlistProof calldata allowlistProof,
    bytes memory data
  ) external payable;

  function setClaimConditions(
    uint256 tokenId,
    ClaimCondition[] calldata phases,
    bool resetClaimEligibility
  ) external;
}

abstract contract Drop1155 is IDrop1155 {
  mapping(uint256 => ClaimConditionList) public claimCondition;

  function claim(
    address _receiver,
    uint256 _tokenId,
    uint256 _quantity,
    address _currency,
    uint256 _pricePerToken,
    AllowlistProof calldata _allowlistProof,
    bytes memory _data
  ) public payable virtual override {
    _beforeClaim(_tokenId, _receiver, _quantity, _currency, _pricePerToken, _allowlistProof, _data);

    uint256 activeConditionId = getActiveClaimConditionId(_tokenId);

    verifyClaim(
      activeConditionId,
      _dropMsgSender(),
      _tokenId,
      _quantity,
      _currency,
      _pricePerToken,
      _allowlistProof
    );

    claimCondition[_tokenId].conditions[activeConditionId].supplyClaimed += _quantity;
    claimCondition[_tokenId].supplyClaimedByWallet[activeConditionId][
      _dropMsgSender()
    ] += _quantity;

    collectPriceOnClaim(_tokenId, address(0), _quantity, _currency, _pricePerToken);

    transferTokensOnClaim(_receiver, _tokenId, _quantity);

    emit TokensClaimed(activeConditionId, _dropMsgSender(), _receiver, _tokenId, _quantity);

    _afterClaim(_tokenId, _receiver, _quantity, _currency, _pricePerToken, _allowlistProof, _data);
  }

  function setClaimConditions(
    uint256 _tokenId,
    ClaimCondition[] calldata _conditions,
    bool _resetClaimEligibility
  ) external virtual override {
    if (!_canSetClaimConditions()) {
      revert("Not authorized");
    }
    ClaimConditionList storage conditionList = claimCondition[_tokenId];
    uint256 existingStartIndex = conditionList.currentStartId;
    uint256 existingPhaseCount = conditionList.count;

    uint256 newStartIndex = existingStartIndex;
    if (_resetClaimEligibility) {
      newStartIndex = existingStartIndex + existingPhaseCount;
    }

    conditionList.count = _conditions.length;
    conditionList.currentStartId = newStartIndex;

    uint256 lastConditionStartTimestamp;
    for (uint256 i = 0; i < _conditions.length; i++) {
      require(i == 0 || lastConditionStartTimestamp < _conditions[i].startTimestamp, "ST");

      uint256 supplyClaimedAlready = conditionList.conditions[newStartIndex + i].supplyClaimed;
      if (supplyClaimedAlready > _conditions[i].maxClaimableSupply) {
        revert("max supply claimed");
      }

      conditionList.conditions[newStartIndex + i] = _conditions[i];
      conditionList.conditions[newStartIndex + i].supplyClaimed = supplyClaimedAlready;

      lastConditionStartTimestamp = _conditions[i].startTimestamp;
    }

    if (_resetClaimEligibility) {
      for (uint256 i = existingStartIndex; i < newStartIndex; i++) {
        delete conditionList.conditions[i];
      }
    } else {
      if (existingPhaseCount > _conditions.length) {
        for (uint256 i = _conditions.length; i < existingPhaseCount; i++) {
          delete conditionList.conditions[newStartIndex + i];
        }
      }
    }

    emit ClaimConditionsUpdated(_tokenId, _conditions, _resetClaimEligibility);
  }

  function verifyClaim(
    uint256 _conditionId,
    address _claimer,
    uint256 _tokenId,
    uint256 _quantity,
    address _currency,
    uint256 _pricePerToken,
    AllowlistProof calldata _allowlistProof
  ) public view returns (bool isOverride) {
    ClaimCondition memory currentClaimPhase = claimCondition[_tokenId].conditions[_conditionId];
    uint256 claimLimit = currentClaimPhase.quantityLimitPerWallet;
    uint256 claimPrice = currentClaimPhase.pricePerToken;
    address claimCurrency = currentClaimPhase.currency;

    if (currentClaimPhase.merkleRoot != bytes32(0)) {
      (isOverride, ) = MerkleProof.verify(
        _allowlistProof.proof,
        currentClaimPhase.merkleRoot,
        keccak256(
          abi.encodePacked(
            _claimer,
            _allowlistProof.quantityLimitPerWallet,
            _allowlistProof.pricePerToken,
            _allowlistProof.currency
          )
        )
      );
    }

    if (isOverride) {
      claimLimit = _allowlistProof.quantityLimitPerWallet != 0
        ? _allowlistProof.quantityLimitPerWallet
        : claimLimit;
      claimPrice = _allowlistProof.pricePerToken != type(uint256).max
        ? _allowlistProof.pricePerToken
        : claimPrice;
      claimCurrency = _allowlistProof.pricePerToken != type(uint256).max &&
        _allowlistProof.currency != address(0)
        ? _allowlistProof.currency
        : claimCurrency;
    }

    uint256 supplyClaimedByWallet = claimCondition[_tokenId].supplyClaimedByWallet[_conditionId][
      _claimer
    ];

    if (_currency != claimCurrency || _pricePerToken != claimPrice) {
      revert("!PriceOrCurrency");
    }

    if (_quantity == 0 || (_quantity + supplyClaimedByWallet > claimLimit)) {
      revert("!Qty");
    }

    if (currentClaimPhase.supplyClaimed + _quantity > currentClaimPhase.maxClaimableSupply) {
      revert("!MaxSupply");
    }

    if (currentClaimPhase.startTimestamp > block.timestamp) {
      revert("cant claim yet");
    }
  }

  function getActiveClaimConditionId(uint256 _tokenId) public view returns (uint256) {
    ClaimConditionList storage conditionList = claimCondition[_tokenId];
    for (
      uint256 i = conditionList.currentStartId + conditionList.count;
      i > conditionList.currentStartId;
      i--
    ) {
      if (block.timestamp >= conditionList.conditions[i - 1].startTimestamp) {
        return i - 1;
      }
    }

    revert("!CONDITION.");
  }

  function getClaimConditionById(
    uint256 _tokenId,
    uint256 _conditionId
  ) external view returns (ClaimCondition memory condition) {
    condition = claimCondition[_tokenId].conditions[_conditionId];
  }

  function getSupplyClaimedByWallet(
    uint256 _tokenId,
    uint256 _conditionId,
    address _claimer
  ) public view returns (uint256 supplyClaimedByWallet) {
    supplyClaimedByWallet = claimCondition[_tokenId].supplyClaimedByWallet[_conditionId][_claimer];
  }

  function _dropMsgSender() internal virtual returns (address) {
    return msg.sender;
  }

  function _beforeClaim(
    uint256 _tokenId,
    address _receiver,
    uint256 _quantity,
    address _currency,
    uint256 _pricePerToken,
    AllowlistProof calldata _allowlistProof,
    bytes memory _data
  ) internal virtual {}

  function _afterClaim(
    uint256 _tokenId,
    address _receiver,
    uint256 _quantity,
    address _currency,
    uint256 _pricePerToken,
    AllowlistProof calldata _allowlistProof,
    bytes memory _data
  ) internal virtual {}

  function collectPriceOnClaim(
    uint256 _tokenId,
    address _primarySaleRecipient,
    uint256 _quantityToClaim,
    address _currency,
    uint256 _pricePerToken
  ) internal virtual;

  function transferTokensOnClaim(
    address _to,
    uint256 _tokenId,
    uint256 _quantityBeingClaimed
  ) internal virtual;

  function _canSetClaimConditions() internal view virtual returns (bool);
}
