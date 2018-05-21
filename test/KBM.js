const KBMMock = artifacts.require('./KBMMock.sol');

contract('KBM', accounts => {
  let kbmUtils;
  const classNameList = [
    'M',
    ...Array.apply(null, { length: 14 }).map(String.call, String)
  ];
  before(async function() {
    kbmUtils = await KBMMock.new();
  });

  it('should has all class name from list', async () => {
    for (let className of classNameList) {
      const kbm = (await kbmUtils.getKBM.call(className)).toNumber();
      assert.isAbove(kbm, 0);
    }
  });
  it('should return zero when existant class name', async () => {
    const kbm = (await kbmUtils.getKBM.call('S')).toNumber();
    assert.equal(kbm, 0);
  });

  it('should return false when existant class name ', async () => {
    const hasClassName = await kbmUtils.hasClassName.call('S');
    assert.equal(hasClassName, false);
  });

  it('should return true when existing class name ', async () => {
    const hasClassName = await kbmUtils.hasClassName.call(classNameList[0]);
    assert.equal(hasClassName, true);
  });
});
