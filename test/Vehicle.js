const Vehicle = artifacts.require('./Vehicle.sol');

contract('Vehicle', accounts => {
  const _power = Math.ceil(162.2 * 100);
  const _vin = '4USBT53544LT26841';
  const _name = 'Mondeo';

  let vehicle;
  const mainOwner = accounts[0];
  beforeEach(async function() {
    vehicle = await Vehicle.new(_vin, _power, _name, {
      from: mainOwner
    });
  });
  it('should has a name', async () => {
    const name = await vehicle.name.call();
    assert.equal(name, _name);
  });
  it('should has a vin', async () => {
    const vin = await vehicle.vin.call();
    assert.equal(vin, _vin);
  });
  it('should has a power', async () => {
    const power = await vehicle.power.call();
    assert.equal(power, _power);
  });
  it('should has a owner', async () => {
    const owner = await vehicle.owner.call();
    assert.equal(owner, mainOwner);
  });

  it('should transfer vehicle', async () => {
    const futureOwner = accounts[1];
    const { logs } = await vehicle.transferOwnership(futureOwner);
    const owner = await vehicle.owner.call();
    const eventArgs = logs[0].args;

    assert.equal(eventArgs.from, mainOwner);
    assert.equal(eventArgs.to, futureOwner);
    assert.equal(owner, futureOwner);
  });
});
