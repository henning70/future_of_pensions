pragma solidity ^0.4.2;

contract PensionsDB {
	address public owner;

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function PensionsDB() {
		owner = msg.sender;
	}

	mapping(address => pensionsDB) public pensioners;
	struct pensionsDB {
		address acc;
		uint bsn;
	}

	function checkPensioner(address acc, uint bsn) returns (uint) {
	    pensionsDB pensioner_acc = pensioners[acc];
	    return pensioner_acc.bsn;
	}

	function registerPensioner(address acc, uint bsn) returns (bool) {
	    pensioners[acc] = pensionsDB(acc, bsn);
	    return true;
	}

	function Terminate() onlyOwner {
        suicide(owner);
    }

    function () payable {
        if (msg.value > 0) {
            var amount = msg.value;
            var sender = msg.sender;
        }
    }
}