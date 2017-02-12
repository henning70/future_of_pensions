pragma solidity ^0.4.6;

contract PensionsDB {
	address public owner;

    event checkPensioner_ev(address pensioner_acc, address pensions_caddr, uint pensioner_bsn);
    event registerPensioner_ev(address pensioner_acc, address pensions_caddr, uint pensioner_bsn);

	modifier onlyOwner() { if (msg.sender == owner) _; }

	function PensionsDB() {
		owner = msg.sender;
	}

	mapping(uint => pensionsDB) public pensioners;
	struct pensionsDB {
		address acc;
		address c_addr;
		uint bsn;
	}

	function checkPensioner(uint bsn) returns (address, address, uint) {
	    checkPensioner_ev(pensioners[bsn].acc, pensioners[bsn].c_addr, pensioners[bsn].bsn);
	    return (pensioners[bsn].acc, pensioners[bsn].c_addr, pensioners[bsn].bsn);
	}

	function registerPensioner(address acc, address c_addr, uint bsn) returns (bool) {
	    registerPensioner_ev(acc, c_addr, bsn);
	    pensioners[bsn] = pensionsDB(acc, c_addr, bsn);

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