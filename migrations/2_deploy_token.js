const GENEToken = artifacts.require(`./GENEToken.sol`)

module.exports = (deployer) => {
  deployer.deploy(GENEToken)
}