const RUMI = artifacts.require('./RUMI.sol');

contract('RUMI', accounts => {
  let rumi;
  const _owner = accounts[0];
  beforeEach(async function() {
    rumi = await RUMI.new({
      from: _owner
    });
  });
  it('should normal initialization', async () => {
    const owner = await rumi.owner.call();
    const warrantyReserve = await rumi.warrantyReserve.call();
    const reserveForCompensationPayments = await rumi.reserveForCompensationPayments.call();

    assert.equal(owner, _owner);
    assert.equal(warrantyReserve, 0);
    assert.equal(reserveForCompensationPayments, 0);
  });

  it('should add insurance company', async () => {
    const { logs } = await rumi.addCompany(accounts[1], 'Ингострах');

    assert.equal(logs.length, 1, 'should be 1 event');
    let eventArgs = logs[0].args;
    const hasCompany = await rumi.companies.call(eventArgs.newCompany);
    assert.equal(hasCompany, true);
  });
  it('should add insurance from company', async () => {
    const companyOwner = accounts[1];
    const { logs: addCompanyLog } = await rumi.addCompany(
      companyOwner,
      'Ингострах'
    );

    const _passport = accounts[2];
    const _insurance = accounts[3];

    const { logs: addInsuranceLog } = await rumi.addInsurance(
      _passport,
      _insurance,
      addCompanyLog[0].args.newCompany,
      1,
      1,
      {
        from: companyOwner
      }
    );

    let eventAddIncurance = addInsuranceLog[0].args;

    const warrantyReserve = await rumi.warrantyReserve.call();
    const reserveForCompensationPayments = await rumi.reserveForCompensationPayments.call();

    assert.equal(warrantyReserve, 1);
    assert.equal(reserveForCompensationPayments, 1);

    assert.equal(eventAddIncurance._passport, _passport);
    assert.equal(eventAddIncurance._insurance, _insurance);
  });
});
