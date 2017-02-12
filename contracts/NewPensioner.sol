pragma solidity ^0.4.6;

import "Pensions.sol";
import "PensionsDB.sol";

contract NewPensioner is PensionsDB {
	address public owner;
	Pensions public pensions_a;

	address public pensioner_acc;
	bytes public pensioner_name;
	bytes public pensioner_addr;
	uint public pensioner_bsn;
	uint public pensioner_dob;

    event checkPensioner_called(bool);
    event registerPensioner_called(bool);
    event createPensioner_called(bool);

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function NewPensioner() {
		owner = msg.sender;
	}

	function checkPensioner(uint pensioner_bsn) returns (address, address, uint) {
		checkPensioner_called(true);
        return PensionsDB.checkPensioner(pensioner_bsn);
	}

	function registerPensioner(address pensioner_acc, address pensions_caddr, uint pensioner_bsn) returns (bool) {
		registerPensioner_called(true);
        return PensionsDB.registerPensioner(pensioner_acc, pensions_caddr, pensioner_bsn);
	}
	
	function createPensioner(address pensioner_acc, bytes pensioner_name, bytes pensioner_addr, uint pensioner_bsn, uint pensioner_dob) returns (address) {
		createPensioner_called(true);
	    pensions_a = new Pensions(pensioner_acc, pensioner_name, pensioner_addr, pensioner_bsn, pensioner_dob);
	    if (pensions_a.call.gas(1000000).value(500000000000000000)()) { } // hhhmmmmm, not working

	    return (pensions_a);
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