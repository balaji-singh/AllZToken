pragma solidity ^0.4.19;

/**
 * The contractName contract does this and that...
 */
contract AllzToken {

	//contractName
	string public name="Allianz Token";
    //Symbol
    string public symbol="ALLZ";
    //standrad
    string public standrad="1.0";

	uint256 public totalSupply ;
	mapping (address => uint) public balanceOf;
	

	 constructor (uint256 _intialSupply) public {
		
		balanceOf[msg.sender]=_intialSupply;

		totalSupply=_intialSupply;

	}

//transfer 

function transfer(address _to, uint256 _value) public returns (bool success){ 

		//Exception id account don't have ammount
		
		require (balanceOf[msg.sender] >= _value);

		//transfer the balance

		balanceOf[msg.sender] -= _value;

		balanceOf[_to] += _value;

		Transfer(msg.sender,_to,_value);

		//return boolean
		//transfer Event

		return true;

}

event Transfer(

address indexed _from,
address indexed _to,
uint256 _value

);

}

