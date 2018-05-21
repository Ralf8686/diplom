const Company = artifacts.require('./Company.sol');
const Vehicle = artifacts.require('./Vehicle.sol');
const RUMIMock = artifacts.require('./RUMIMock.sol');

async function getVehicleAddress(mainOwner) {
  const _power = Math.ceil(162.2 * 100);
  const _vin = '4USBT53544LT26841';
  const _name = 'Mondeo';

  const vehicle = await Vehicle.new(_vin, _power, _name, {
    from: mainOwner
  });
  return vehicle.address;
}

async function getRUMIAddress(mainOwner) {
  const rumi = await RUMIMock.new({
    from: mainOwner
  });
  return rumi.address;
}

contract('Company', accounts => {
  let company;

  const _name = 'Ингострах';
  let _RUMI;
  const _owner = accounts[1];
  beforeEach(async function() {
    _RUMI = await getRUMIAddress(accounts[3]);

    company = await Company.new(_owner, _name, _RUMI, {
      from: accounts[0]
    });
  });
  it('should has a name', async () => {
    const name = await company.name.call();
    assert.equal(name, _name);
  });
  it('should has a netPremium', async () => {
    const netPremium = await company.netPremium.call();
    assert.equal(netPremium, 0);
  });
  it('should has a owner', async () => {
    const owner = await company.owner.call();
    assert.equal(owner, _owner);
  });

  it('should create insurance', async () => {
    const vehicleAddress = await getVehicleAddress(accounts[3]);
    const transaction = await company.createInsurance(
      vehicleAddress,
      accounts[3],
      '3',
      4000000000,
      {
        from: _owner
      }
    );

    const insurance = transaction.logs[0].args._insurance;

    const hasInMapper = await company.insurances.call(insurance);
    assert.equal(hasInMapper, true);
  });

  it('should active insurance', async () => {
    const vehicleAddress = await getVehicleAddress(accounts[3]);
    const transaction = await company.createInsurance(
      vehicleAddress,
      accounts[3],
      '3',
      4000000000,
      {
        from: _owner
      }
    );
    const insurance = transaction.logs[0].args._insurance;
    const { logs } = await company.activateInsurance(insurance, {
      from: _owner
    });

    assert.equal(logs[0].args._insurance, insurance);
    assert.equal(logs[0].args._warrantyReserve.toNumber(), 115200000);
    assert.equal(
      logs[0].args._reserveForCompensationPayments.toNumber(),
      230400000
    );
    assert.equal(logs[0].args._issuanceCosts.toNumber(), 2304000000);
    assert.equal(logs[0].args._netPremium.toNumber(), 8870400000);

    const netPremium = await company.netPremium.call();
    const issuanceCosts = await company.issuanceCosts.call();

    assert.equal(issuanceCosts.toNumber(), 2304000000);
    assert.equal(netPremium.toNumber(), 8870400000);
  });
});
