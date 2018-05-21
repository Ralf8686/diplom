pragma solidity ^0.4.23;


import "./KM.sol";


contract KMMock {
  function getKM(uint _power) public pure returns(uint) {
    return KM.getKM(_power);
  }
}