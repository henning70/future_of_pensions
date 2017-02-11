module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  deployer.deploy(Pensions);
  deployer.deploy(PensionsDB);
  deployer.deploy(NewPensioner);
};
