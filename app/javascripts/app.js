var accounts;
var account;

var np_contract;
var np_address;
var pdb_contract;
var pdb_address;
var p_contract;
var p_address;
var c_addr;

function _set_status(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function _p_check() {
  var p_name = web3.toAscii(document.getElementById("p_name").value);
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = web3.toAscii(document.getElementById("p_addr").value);
  var p_dob = new Date(document.getElementById("p_dob").value).getTime() / 1000;

  _set_status(p_name + " / " + p_bsn + " / " + p_acc + " / " + p_dob);

  np_contract.checkPensioner.call(p_bsn).then(function(value) {
    console.log(value.valueOf());
  });
};

function _p_register() {
  var p_name = web3.toAscii(document.getElementById("p_name").value);
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = web3.toAscii(document.getElementById("p_addr").value);
  var p_dob = new Date(document.getElementById("p_dob").value).getTime() / 1000;

  _set_status("Creating and registering new pensioner...");  

  np_contract.createPensioner(p_acc, p_name, p_addr, p_bsn, p_dob, {from: p_acc, gas: 1000000}).then(function(value) {
    console.log("New pensioner created!");
    console.log(value.valueOf());
    console.log(web3.eth.getTransactionReceipt(value));

    var tran = web3.eth.getTransactionReceipt(value);
    c_addr = tran.logs[0].address;

    _set_status("New pensioner created!");
  }).catch(function(e) {
      console.log("New pensioner creation error!");
      console.log(e);
  }).then(function() { 
      np_contract.registerPensioner(p_acc, c_addr, p_bsn, {from: p_acc, gas: 1000000}).then(function(value) {
        _set_status("New pensioner registered!");
        console.log(value.valueOf());
      });
  });
};

// use with web3 sendTransaction
function _get_mined_status(_transaction, _interval) {
    var transactionReceiptAsync;
    _interval |= 500;
    transactionReceiptAsync = function(_transaction, _resolve, _reject) {
      try {
        document.getElementById("status").innerHTML = "Busy...";
        var receipt = web3.eth.getTransactionReceipt(_transaction);
        if (receipt == null) {
            setTimeout(function () {
              transactionReceiptAsync(_transaction, _resolve, _reject);
            }, _interval);
        } else {
          document.getElementById("status").innerHTML = "Done!";
          _getAllProjects();
          resolve(receipt);
        }
      } catch(e) {
          reject(e);
      }
    };

    return new Promise(function (_resolve, _reject) {
      transactionReceiptAsync(_transaction, _resolve, _reject);
    });
};

window.onload = function() {
  np_contract = NewPensioner.deployed();
  np_address = np_contract.address;
  p_contract = Pensions.deployed();
  p_address = p_contract.address;

  console.log("NewPensioner: " + np_address);

  // let's listen for events from the NewPensioner contract
  np_contract.allEvents(function (error, result) { 
    if (error) {
      console.log("Error received from NewPensioner contract: ");
      console.log(error);
      _set_status("Error received from NewPensioner contract: " + error);
    } else {
      if (result.event == "checkPensioner_ev") { console.log("checkPensioner_ev: " + result.event + " / " + result.args.owner + " / " + result.args.balance); }
      //else console.log("Event: " + result.event); // result.event, result.args.<arg>
      //console.log(result);
    }
  });

  // let's listen for events from the NewPensioner contract
  p_contract.allEvents(function (error, result) { 
    if (error) {
      console.log("Error received from Pensions contract: ");
      console.log(error);
      _set_status("Error received from Pensions contract: " + error);
    } else {
      if (result.event == "Pensions_ev") { console.log("Pensions_ev: " + result.event + " / " + result.args.pensioner_acc + " / " + result.args.pensioner_bsn); }
      //else console.log("Event: " + result.event); // result.event, result.args.<arg>
      //console.log(result);
    }
  });

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
