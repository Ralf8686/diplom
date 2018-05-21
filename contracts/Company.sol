pragma solidity ^0.4.23;

import "./RUMI.sol";
import "./Insurance.sol";

contract Company {
  address public owner;
  string public name;
  address public RUMIAddress;
  uint public netPremium;
  uint public issuanceCosts;
  mapping(address => bool) public insurances;

  event CreateInsurance(address _insurance);
  event ActivateInsutance(
    address _insurance,
    uint _warrantyReserve,
    uint _reserveForCompensationPayments,
    uint _issuanceCosts,
    uint _netPremium
  );
  modifier onlyOwner {
    require(msg.sender == owner, "Only owner can call this function.");
    _;
  }

  constructor (address _owner, string _name, address _RUMIAddress) public {
    owner = _owner;
    name = _name;
    RUMIAddress = _RUMIAddress;
  }

  function createInsurance (address _vehicle, address _passport, string _className, uint _basePrice) onlyOwner public {
    Insurance insurance = new Insurance(_vehicle, _passport, _className, _basePrice);
    insurances[insurance] = true;
    if (insurance.owner() == address(this)) {
      emit CreateInsurance(insurance);
    }
  }

  function activateInsurance (address _insuranceAddress) onlyOwner public {
    require(insurances[_insuranceAddress]);
    RUMI rumi = RUMI(RUMIAddress);
    Insurance insurance = Insurance(_insuranceAddress);

    insurance.activate();
    uint price = insurance.price();

    uint warrantyReserve = price / 100;
    uint reserveForCompensationPayments = (price * 2) / 100;

    uint _issuanceCosts = (price * 20) / 100;
    uint _netPremium = (price * 77) / 100;

    rumi.addInsurance(
      insurance.passportAddress(),
      _insuranceAddress,
      this,
      warrantyReserve,
      reserveForCompensationPayments
    );

    
    issuanceCosts += _issuanceCosts;
    netPremium += _netPremium;

    emit ActivateInsutance(_insuranceAddress, warrantyReserve, reserveForCompensationPayments, _issuanceCosts, _netPremium);
  }
}