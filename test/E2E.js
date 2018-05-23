const Company = artifacts.require('./Company.sol');
const Vehicle = artifacts.require('./Vehicle.sol');
const RUMI = artifacts.require('./RUMI.sol');
const Passport = artifacts.require('./Passport.sol');
const Insurance = artifacts.require('./Insurance.sol');

async function getVehicleAddress(mainOwner) {
  const _power = Math.ceil(162.2 * 100);
  const _vin = '4USBT53544LT26841';
  const _name = 'Mondeo';

  const vehicle = await Vehicle.new(_vin, _power, _name, {
    from: mainOwner
  });
  return vehicle.address;
}

contract('Company', accounts => {
  it.only('should active insurance', async () => {
    const rumiOwner = accounts[0];
    const companyOwner = accounts[1];

    const passportAddress = accounts[2];
    const vehicleAddress = await getVehicleAddress(passportAddress);

    const rumi = await RUMI.new({
      from: rumiOwner
    });

    const { logs: addCompanyLogs } = await rumi.addCompany(
      companyOwner,
      'Ингострах'
    );

    const company = await Company(addCompanyLogs[0].args.newCompany);

    const transaction = await company.createInsurance(
      vehicleAddress,
      passportAddress,
      '3',
      4000000000,
      {
        from: companyOwner
      }
    );

    const insuranceOne = transaction.logs[0].args._insurance;
    await company.activateInsurance(insuranceOne, {
      from: _owner
    });

    // assert.equal(logs[0].args._insurance, insurance);
    // assert.equal(logs[0].args._warrantyReserve.toNumber(), 115200000);
    // assert.equal(
    //   logs[0].args._reserveForCompensationPayments.toNumber(),
    //   230400000
    // );
    // assert.equal(logs[0].args._issuanceCosts.toNumber(), 2304000000);
    // assert.equal(logs[0].args._netPremium.toNumber(), 8870400000);

    // const netPremium = await company.netPremium.call();
    // const issuanceCosts = await company.issuanceCosts.call();

    // assert.equal(issuanceCosts.toNumber(), 2304000000);
    // assert.equal(netPremium.toNumber(), 8870400000);
  });
});
