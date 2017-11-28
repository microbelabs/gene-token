const GeneToken = artifacts.require('GENEToken')


contract('ERC20 Standard Token Basic Functions', accounts => {
  const [geneAccount, secondAccount, thirdAccount] = accounts;

  it('should put total supply to owner balance', async () => {
    try {
      const token = await GeneToken.deployed();
      const totalSupply = await token.totalSupply.call();
      const balance = await token.balanceOf.call(geneAccount);
      
      assert.equal(balance.valueOf(), totalSupply.valueOf(), 'Account balance not equal to total supply');
    } catch (e) {
      throw new Error(e);
    }
  });


  it('should transfer amount of token from master to secondary account', async () => {
    try {
      const token = await GeneToken.deployed();
      const geneAccountInitialBalance = await token.balanceOf.call(geneAccount);
      const secondAccountInitialBalance = await token.balanceOf.call(secondAccount);
  
      const amount = 10000;
      await token.transfer(secondAccount, amount);

      const geneAccountFinalBalance = await token.balanceOf.call(geneAccount);
      const secondAccountFinalBalance = await token.balanceOf.call(secondAccount);

      assert.equal(geneAccountFinalBalance.toNumber(), geneAccountInitialBalance.toNumber() - amount);
      assert.equal(secondAccountFinalBalance.toNumber(), amount);
      
    } catch (e) {
        throw new Error(e);
    }
  });
});

contract('GENE Token Functions', accounts => {
  it(`should register game`);
  it('should check registered game already added to list');
  it('should view complete list of registered game ');
  it('should add game to trusted list');
  it('should view list of trusted games');
  it(`should view game's name`);
  it(`should view game's name`);
  it(`should view game's attributes list`);
});
