pragma solidity ^0.4.23;

library KM {
  function getKM(uint _power) internal pure returns (uint) {
    if (_power <= 50 * 100) {
      return 0.6 * 100;
    } else if (_power <= 70 * 100) {
      return 1 * 100;
    } else if (_power <= 100 * 100) {
      return 1.1 * 100;
    } else if (_power <= 120 * 100) {
      return 1.2 * 100;
    } else if (_power <= 150 * 100) {
      return 1.4 * 100;
    }
    return 1.6 * 100;
  }
}