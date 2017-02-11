module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.autolink();
  /*deployer.deploy(PensionsDB).then(function() {
  	return deployer.deploy(Pensions, PensionsDB.address).then(function() {
  		var pdb_address = PensionsDB.address;
  		console.log("pdb_address: " + pdb_address);
  		return deployer.deploy(NewPensioner, pdb_address, Pensions.address).then(function() {
  			console.log("here: " + NewPensioner.address);
  		});
  	});
  });*/
  deployer.deploy(Pensions);
  deployer.deploy(PensionsDB);
  deployer.deploy(NewPensioner);
};
