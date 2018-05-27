pragma solidity ^0.4.23;

import "./Vehicle.sol";
import "./KBM.sol";
import "./KM.sol";

contract Insurance {
  address public owner; // Адрес Страховой компании
  address public vehicleAddress; // Адрес ПТС
  address public passportAddress; // Адрес паспорта
  uint public basePrice; // базовая ставка
  uint public price;
  string public className;

  uint public endDate;
  uint public startDate;

  // Коэффициенты
  uint public kbm; // по классу скидки
  uint public km; // по мощности двигателя
  uint public constant ko = 180; // по допуску лиц к управлению

  constructor (
    address _vehicleAddress,
    address _passportAddress,
    string _className,
    uint _basePrice
  ) public {
    require(_basePrice > 3432 * 1000000 && _basePrice < 4118 * 1000000, "Базовая ставка в рамках");

    require(KBM.hasClassName(_className));
    owner = msg.sender;
    vehicleAddress = _vehicleAddress;
    passportAddress = _passportAddress;
    basePrice = _basePrice;
    className = _className;

    kbm = KBM.getKBM(_className);

    Vehicle vehicle = Vehicle(vehicleAddress);
    uint power = vehicle.power();
    // Коэффициент по мощности
    km = KM.getKM(power);

    price = (_basePrice * kbm * ko * km) / 100**3;
  }

  function activate () public {
    require(msg.sender == owner);
    // solium-disable security/no-block-members
    startDate = now;
    endDate = now + 365 days;
  }

  function isActive () public view returns(bool) {
    return now >= startDate && now <= endDate;
  }
}