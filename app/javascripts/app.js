var accounts;
var account;

var np_contract;
var np_address;
var pdb_contract;
var pdb_address;
var p_contract;
var p_address;
var c_addr;

// update the ui with informational messages
function _set_status(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

// check if we already have a registered pensioner for bsn
function _p_check() {
  var p_bsn = document.getElementById("p_bsn").value;

  _set_status(p_bsn);

  np_contract.checkPensioner.call(p_bsn).then(function(value) {
    console.log(value.valueOf());
  });
};

// create the new pensioner and register him in the database (only if not already existing)
function _p_register() {

  var p_name = web3.toAscii(document.getElementById("p_name").value);
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = web3.toAscii(document.getElementById("p_addr").value);
  var p_dob = new Date(document.getElementById("p_dob").value).getTime() / 1000;

  _set_status("Creating new pensioner...");  

  np_contract.createPensioner(p_acc, p_name, p_addr, p_bsn, p_dob, {from: p_acc, gas: 1000000}).then(function(value) {
    //console.log("New pensioner created!");
    //console.log(value.valueOf());
    //console.log(web3.eth.getTransactionReceipt(value));

    var tran = web3.eth.getTransactionReceipt(value);
    c_addr = tran.logs[0].address;

    _set_status("New pensioner created, now registering pensioner...");
  }).catch(function(e) {
    _set_status("New pensioner creation error: " + e);
  }).then(function() {
    np_contract.registerPensioner(p_acc, c_addr, p_bsn, {from: p_acc, gas: 1000000}).then(function(value) {
      //console.log(value.valueOf());
      _set_status("New pensioner registered!");
    }).catch(function(e) {
      _set_status("New pensioner registration error: " + e);
    });
  });
};

window.onload = function() {
  np_contract = NewPensioner.deployed();
  np_address = np_contract.address;
  pdb_contract = PensionsDB.deployed();
  pbd_address = pdb_contract.address;
  p_contract = Pensions.deployed();
  p_address = p_contract.address;
  
  // let's listen for events from the NewPensioner contract
  np_contract.allEvents(function (error, result) { 
    if (error) {
      console.log("Error received from NewPensioner contract: ");
      console.log(error);
      _set_status("Error received from NewPensioner contract: " + error);
    } else {
      if (result.event == "checkPensioner_caled") { console.log("checkPensioner_called: " + result.event); }
      if (result.event == "registerPensioner_caled") { console.log("registerPensioner_called: " + result.event); }
      if (result.event == "createPensioner_caled") { console.log("createPensioner_called: " + result.event); }
    }
  });

  // let's listen for events from the NewPensioner contract
  pdb_contract.allEvents(function (error, result) { 
    if (error) {
      console.log("Error received from PensionsDB contract: ");
      console.log(error);
      _set_status("Error received from PensionsDB contract: " + error);
    } else {
      if (result.event == "checkPensioner_ev") { console.log("checkPensioner_ev: " + result.event + " / " + result.args.pensioner_acc + " / " + result.args.pensioner_bsn); }
      if (result.event == "registerPensioner_ev") { console.log("registerPensioner_ev: " + result.event + " / " + result.args.pensioner_acc + " / " + result.args.pensioner_bsn); }
    }
  });

  console.log("NewPensioner: " + np_address);

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
    //console.log("First account: " + account);
  });
}
