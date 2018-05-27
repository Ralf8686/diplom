pragma solidity ^0.4.23;

library KBM {
  uint8 internal constant decimals = 100;
  function getKBM(string _className) internal pure returns (uint) {
    bytes32 kbmHash = keccak256(abi.encodePacked(_className));
    if (kbmHash == keccak256("M")) {
      return 2.45*100;
    } else if (kbmHash == keccak256("0")) {
      return 2.3*100;
    } else if (kbmHash == keccak256("1")) {
      return 1.55*100;
    } else if (kbmHash == keccak256("2")) {
      return 1.4*100;
    } else if (kbmHash == keccak256("3")) {
      return 1*100;
    } else if (kbmHash == keccak256("4")) {
      return 0.95*100;
    } else if (kbmHash == keccak256("5")) {
      return 0.9*100;
    } else if (kbmHash == keccak256("6")) {
      return 0.85*100;
    } else if (kbmHash == keccak256("7")) {
      return 0.8*100;
    } else if (kbmHash == keccak256("8")) {
      return 0.75*100;
    } else if (kbmHash == keccak256("9")) {
      return 0.7*100;
    } else if (kbmHash == keccak256("10")) {
      return 0.65*100;
    } else if (kbmHash == keccak256("11")) {
      return 0.6*100;
    } else if (kbmHash == keccak256("12")) {
      return 0.55*100;
    } else if (kbmHash == keccak256("13")) {
      return 0.5*100;
    }

    return 0;
  }
  function hasClassName(string _className) internal pure returns (bool) {
    return getKBM(_className) != 0;
  }
  
}