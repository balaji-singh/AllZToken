var AllzTokenMigration = artifacts.require("./AllzToken.sol");

module.exports = function(deployer) {
  deployer.deploy(AllzTokenMigration,100000000);
};
