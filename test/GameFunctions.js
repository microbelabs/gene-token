const GeneToken = artifacts.require('GENEToken')

contract('GENE Token Functions', accounts => {
  const [
    geneAccount, 
    developer1, developer2, developer3,
    player1, player2, player3, player4, player5, player6
  ] = accounts;

  const MicrobeWarsGame = {
    name: "MicrobeWars",
    description: "Explore the world of microbe"
  };

  const MicrobeCardGame = {
    name: "MicrobeCard",
    description: "Card Game of Microbes"
  };

  const JunkGame = {
    name: "JunkGame",
    description: "I am junk game"
  };

  it(`should transfer token to developers`, async () => {
    try {
      const token = await GeneToken.deployed();

      const amount = 20000;
      await token.transfer(developer1, amount);
      const balanceDev1 = await token.balanceOf.call(developer1);

      assert.equal(balanceDev1.valueOf(), amount, 'Account balance not equal to amount');

      const amount2 = 1000;
      await token.transfer(developer2, amount2);
      const balanceDev2 = await token.balanceOf.call(developer2);

      assert.equal(balanceDev2.valueOf(), amount2, 'Account balance not equal to amount');

      const amount3 = 10;
      await token.transfer(developer3, amount3);
      const balanceDev3 = await token.balanceOf.call(developer3);

      assert.equal(balanceDev3.valueOf(), amount3, 'Account balance not equal to amount');

    } catch (e) {
      throw new Error(e);
    }
  });

  it(`should be able submit games`, async () => {
    try {
      const token = await GeneToken.deployed();
      const initialBalanceDeveloper1 = await token.balanceOf.call(developer1);
      const isGame1Submitted = await token.submitGame(MicrobeWarsGame.name, MicrobeWarsGame.description, {
        from: developer1
      });
    
      assert.equal(isGame1Submitted.logs[1].args.gameOwner, developer1, "Game #1 Registration failed");

      const finalDeveloper1Balance = await token.balanceOf.call(developer1);
      assert.equal(finalDeveloper1Balance.toNumber(), initialBalanceDeveloper1.toNumber() - 100);


      const initialBalanceDeveloper2 = await token.balanceOf.call(developer2);
      const isGame2Submitted = await token.submitGame(MicrobeCardGame.name, MicrobeCardGame.description, {
        from: developer2
      });

      assert.equal(isGame2Submitted.logs[1].args.gameOwner, developer2, "Game #1 Registration failed");

      const finalDeveloper2Balance = await token.balanceOf.call(developer2);
      assert.equal(finalDeveloper2Balance.toNumber(), initialBalanceDeveloper2.toNumber() - 100);
    } catch (e) {
      throw new Error(e);
    } 
  });

  it(`should failed to submit registered game`, async () => {
    try {
      const token = await GeneToken.deployed();
      const isGame1Submitted = await token.submitGame(MicrobeWarsGame.name, MicrobeWarsGame.description, {from: developer1});

      assert.fail("Game should not submitted");
    } catch (e) {
      assert.throws(() => { throw new Error(e) }, Error);
    }
  });

  it(`should failed to submit a game, when balance is <= minimumRegistrationBalance `, async () => {
    try {
      const token = await GeneToken.deployed();
      const isGame1Submitted = await token.submitGame(JunkGame.name, JunkGame.description, {from: developer3});

      assert.fail("Game should not submitted");
    } catch (e) {
      assert.throws(() => { throw new Error(e) }, Error);
    }
  });

  it('should check registered game already added to list', async () => {
    try {
      const token = await GeneToken.deployed();
      const game1 = await token.getGameName.call(developer1);
      const game2 = await token.getGameName.call(developer2);

      assert.equal(game1, MicrobeWarsGame.name);
      assert.equal(game2, MicrobeCardGame.name);
    } catch (e) {
      throw new Error(e);
    }
  });

  // it('should view complete list of registered game.', async () => {
  //   try {
  //     const token = await GeneToken.deployed();
  //     const totalGame = await token.totalGame.call();
      
  //     for(let i=0; i < totalGame; i++) {
  //       const name = await token.getGameName.call();
  //       console.log(name);
  //     }
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // });
  // it('should add game to trusted list');
  // it('should view list of trusted games');
  // it(`should view game's name`);
  // it(`should view game's attributes list`);
});
