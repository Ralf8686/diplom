pragma solidity ^0.4.23;


import "./KBM.sol";


contract KBMMock {
  function getKBM(string _className) public pure returns(uint) {
    return KBM.getKBM(_className);
  }
  function hasClassName(string _className) public pure returns(bool) {
    return KBM.hasClassName(_className);
  }
}