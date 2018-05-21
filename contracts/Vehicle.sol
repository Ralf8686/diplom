pragma solidity ^0.4.23;

contract Vehicle {
  string public name;
  string public vin;
  uint public power;
  address public owner;

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }
  event TransferOwnership(address from, address to);

  constructor (
    string _vin,
    uint _power,
    string _name
  ) public {
    name = _name;
    vin = _vin;
    power = _power;
    owner = msg.sender;
  }

  // Передача авто
  function transferOwnership(address newOwner) onlyOwner public{
    address oldOwner = owner;
    owner = newOwner;
    emit TransferOwnership(oldOwner, newOwner);
  }
}