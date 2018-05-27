pragma solidity ^0.4.23;

import "./Company.sol";

contract RUMI {
  address public owner;
  uint public warrantyReserve;
  uint public reserveForCompensationPayments;
  mapping(address => bool) public companies;

  event AddCompany(address newCompany);
  event AddInsurance(address indexed _passport, address indexed _insurance);

  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  modifier onlyRegistredCompany (address companyAddress) {
    require(companies[companyAddress]);
    Company company = Company(companyAddress);
    require(company.owner() == msg.sender);
  }

  constructor () public {
    owner = msg.sender;
  }

  // Добавляем страховую компанию в реестр
  function addCompany(address companyOwner, string nameCompany) onlyOwner public {
    Company company = new Company(companyOwner, nameCompany, this);
    companies[company] = true;
    emit AddCompany(company);
  }

  function addInsurance(
    address passport,
    address insurance,
    address companyAddress,
    uint _warrantyReserve,
    uint _reserveForCompensationPayments
  ) onlyRegistredCompany(companyAddress) public {
    
    warrantyReserve += _warrantyReserve;
    reserveForCompensationPayments += _reserveForCompensationPayments;
    emit AddInsurance(passport, insurance);
  }
}