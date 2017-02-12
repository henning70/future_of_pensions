pragma solidity ^0.4.6;

contract Pensions {
	address public owner;
	address pensioner_acc;
	bytes pensioner_name;
	bytes pensioner_addr;
	uint pensioner_bsn;
	uint pensioner_dob;
	uint public balance;

    event Pensions_ev(address owner, uint balance, address pensioner_acc, bytes pensioner_name, bytes pensioner_addr, uint pensioner_bsn, uint pensioner_dob);

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function Pensions(address acc, bytes name, bytes addr, uint bsn, uint dob) {
	    owner = msg.sender;
		balance = 99;
		pensioner_acc = acc;
		pensioner_name = name;
		pensioner_addr = addr;
		pensioner_bsn = bsn;
		pensioner_dob = dob;

		Pensions_ev(owner, balance, pensioner_acc, pensioner_name, pensioner_addr, pensioner_bsn, pensioner_dob);
	}

	mapping(address => pensionerInfo) public pensioner;
	struct pensionerInfo {
		address acc;
		bytes name;
		bytes addr;
		uint bsn;
		uint dob;
		uint balance;
	}

	function createPensioner(address acc, bytes name, bytes addr, uint bsn, uint dob) returns (bool) {
	    pensioner[acc] = pensionerInfo(acc, name, addr, bsn, dob, balance);
	    return true;
	}
	
	function getPensionerInfo() returns (uint) {
	   return balance;
	}

	function Terminate() onlyOwner {
        suicide(owner);
    }

    function () payable {
        if (msg.value > 0) {
		    balance =+ msg.value;
        }
    }
}