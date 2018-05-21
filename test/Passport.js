const Passport = artifacts.require('./Passport.sol');

contract('Passport', accounts => {
  let passport;
  const _firstName = 'Левенсон';
  const _lastName = 'Семен';
  const _middleName = 'Яковлевич';
  const _dateOfBirth = Date.now();
  const _owner = accounts[0];

  beforeEach(async function() {
    passport = await Passport.new(
      _firstName,
      _lastName,
      _middleName,
      _dateOfBirth,
      {
        from: _owner
      }
    );
  });
  it('should has a firstName', async () => {
    const firstName = await passport.firstName.call();
    assert.equal(firstName, _firstName);
  });
  it('should has a lastName', async () => {
    const lastName = await passport.lastName.call();
    assert.equal(lastName, _lastName);
  });
  it('should has a middleName', async () => {
    const middleName = await passport.middleName.call();
    assert.equal(middleName, _middleName);
  });
  it('should has a dateOfBirth', async () => {
    const dateOfBirth = await passport.dateOfBirth.call();
    assert.equal(dateOfBirth, _dateOfBirth);
  });
  it('should has a owner', async () => {
    const owner = await passport.owner.call();
    assert.equal(owner, _owner);
  });
});
