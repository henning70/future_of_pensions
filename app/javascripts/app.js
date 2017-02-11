var accounts;
var account;

var np_contract;
var np_address;
var pdb_contract;
var pdb_address;
var p_contract;
var p_address;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function p_next() {
  var p_name = document.getElementById("p_name").value;
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = "rembrandtweg";
  var p_dob = "1995-01-01";

  setStatus(p_name + " / " + p_bsn + " / " + p_acc + " / " + new Date(p_dob).getTime() / 1000);

  np_contract.checkPensioner.call(p_acc, p_bsn).then(function(value) {
    console.log("Test: " + value);
  });
};

function p_register() {
  var p_name = document.getElementById("p_name").value;
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = "rembrandtweg";
  var p_dob = "1995-01-01";

  setStatus(p_name + " / " + p_bsn + " / " + p_acc + " / " + new Date(p_dob).getTime() / 1000);

  np_contract.registerPensioner(p_acc, p_bsn, {from: p_acc, gas: 1000000}).then(function(value) {
    console.log("Test: " + value);
  });
};

window.onload = function() {
  np_contract = NewPensioner.deployed();
  np_address = np_contract.address;
  //pdb_contract = PensionsDB.deployed();
  //pdb_address = pdb_contract.address;
  //p_contract = Pensions.deployed();
  //p_address = p_contract.address;

  console.log("NewPensioner: " + np_address);
  //console.log("PensionsDB: " + pdb_address);
  //console.log("Pensions: " + p_address);

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    console.log("Accounts: " + accounts);
    console.log("First account: " + account);
  });
}
