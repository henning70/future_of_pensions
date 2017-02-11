pragma solidity ^0.4.2;

import "Pensions.sol";
import "PensionsDB.sol";

contract NewPensioner is PensionsDB, Pensions {
	address public owner;

	address public pensioner_acc;
	bytes public pensioner_name;
	bytes public pensioner_addr;
	uint public pensioner_bsn;
	uint public pensioner_dob;

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function NewPensioner() {
		owner = msg.sender;
	}

	function checkPensioner(uint pensioner_bsn) returns (uint) {
        return PensionsDB.checkPensioner(pensioner_bsn);
	}

	function registerPensioner(address pensioner_acc, uint pensioner_bsn) returns (bool) {
        return PensionsDB.registerPensioner(pensioner_acc, pensioner_bsn);
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