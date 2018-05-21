pragma solidity ^0.4.23;

contract Passport {
  string public firstName;
  string public lastName;
  string public middleName;
  uint public dateOfBirth;
  address public owner;

  constructor (
    string _firstName,
    string _lastName,
    string _middleName,
    uint _dateOfBirth
  ) public {
    firstName = _firstName;
    lastName = _lastName;
    middleName = _middleName;
    dateOfBirth = _dateOfBirth;
    owner = msg.sender;
  }
}