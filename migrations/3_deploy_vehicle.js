const Vehicle = artifacts.require('./Vehicle.sol');

module.exports = function(deployer) {
  deployer.deploy(Vehicle, 'asd', 150, 'Mondeo');
};
