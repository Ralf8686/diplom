const Insurance = artifacts.require('./Insurance.sol');
const Vehicle = artifacts.require('./Vehicle.sol');

async function getVehicleAddress(mainOwner) {
  const _power = Math.ceil(162.2 * 100);
  const _vin = '4USBT53544LT26841';
  const _name = 'Mondeo';

  const vehicle = await Vehicle.new(_vin, _power, _name, {
    from: mainOwner
  });
  return vehicle.address;
}

contract('Insurance', accounts => {
  let insurance;
  let _className = '3';
  let _basePrice = 4000 * 1000000;
  let _vehicleAddress;
  let _passportAddress = accounts[2];
  let _companyAddress = accounts[0];

  beforeEach(async function() {
    _vehicleAddress = await getVehicleAddress(accounts[3]);
    insurance = await Insurance.new(
      _vehicleAddress,
      _passportAddress,
      _className,
      _basePrice,
      {
        from: _companyAddress
      }
    );
  });
  it('should has a vehicleAddress', async () => {
    const vehicleAddress = await insurance.vehicleAddress.call();
    assert.equal(vehicleAddress, _vehicleAddress);
  });
  it('should has a passportAddress', async () => {
    const passportAddress = await insurance.passportAddress.call();
    assert.equal(passportAddress, _passportAddress);
  });

  it('should has a base price', async () => {
    const basePrice = await insurance.basePrice.call();
    assert.equal(basePrice, _basePrice);
  });

  it('should has a className', async () => {
    const className = await insurance.className.call();
    assert.equal(className, _className);
  });

  it('should has a kbm', async () => {
    const kbm = (await insurance.kbm.call()).toNumber();
    assert.equal(kbm, 100);
  });

  it('should has a km', async () => {
    const km = (await insurance.km.call()).toNumber();
    assert.equal(km, 160);
  });

  it('should has a price', async () => {
    const price = (await insurance.price.call()).toNumber();
    assert.equal(price, 6400 * 1000000 * 1.8);
  });

  it('should has not active status', async () => {
    const isActive = await insurance.isActive.call();
    assert.equal(isActive, false);
  });

  it('should change activate status', async () => {
    await insurance.activate({
      from: _companyAddress
    });
    const isActive = await insurance.isActive.call();
    assert.equal(isActive, true);
  });
});
