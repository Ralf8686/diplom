pragma solidity ^0.4.23;

import "./RUMI.sol";

contract RUMIMock is RUMI {
  event AddInsurance(
    address passport,
    address insurance,
    address company,
    uint warrantyReserve,
    uint reserveForCompensationPayments
  );
  function addInsurance(
    address passport,
    address insurance,
    address _company,
    uint _warrantyReserve,
    uint _reserveForCompensationPayments
  ) public {
    emit AddInsurance(passport, insurance, _company, _warrantyReserve, _reserveForCompensationPayments);
  }
}