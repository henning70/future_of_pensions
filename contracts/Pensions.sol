pragma solidity ^0.4.2;

contract Pensions {
	address public owner;

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function Pensions() {
		    owner = msg.sender;
	}

	mapping(address => pensionerInfo) public pensioner;
	struct pensionerInfo {
		address acc;
		bytes name;
		bytes addr;
		uint bsn;
		uint dob;
	}

	function createPensioner(address acc, bytes name, bytes addr, uint bsn, uint dob) returns (bool) {
	    pensioner[acc] = pensionerInfo(acc, name, addr, bsn, dob);
	    return true;
	}
	
	function getPensionerInfo(address acc) returns (address) {
	   return acc;
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