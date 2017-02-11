var accounts;
var account;

var np_contract;
var np_address;
var pdb_contract;
var pdb_address;
var p_contract;
var p_address;

function _set_status(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function _p_next() {
  var p_name = document.getElementById("p_name").value;
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = document.getElementById("p_addr").value;
  var p_dob = document.getElementById("p_dob").value;

  _set_status(p_name + " / " + p_bsn + " / " + p_acc + " / " + new Date(p_dob).getTime() / 1000);

  np_contract.checkPensioner.call(p_bsn).then(function(value) {
    console.log("Pensioner check completed: " + value);
  });
};

function _p_register() {
  var p_name = document.getElementById("p_name").value;
  var p_bsn = document.getElementById("p_bsn").value;
  var p_acc = document.getElementById("p_acc").value;
  var p_addr = document.getElementById("p_addr").value;
  var p_dob = document.getElementById("p_dob").value;

  _set_status("Registring new pensioner...");

  np_contract.registerPensioner(p_acc, p_bsn, {from: p_acc, gas: 500000}).then(function(value) {
    console.log("New pensioner registered!");
  });
};

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
    console.log("First account: " + account);
  });
}
