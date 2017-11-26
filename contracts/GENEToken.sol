pragma solidity ^0.4.8;

import "./StandardToken.sol";

contract GENEToken is ERC20Token {
    string public symbol = "GENE";
    string public name = "Game Energy Token";
    uint8 public decimals = 8;
    uint256 _totalSupply = 8000000000;
    address public owner;
 
    function GENEToken() public {
        owner = msg.sender;
        balances[owner] = _totalSupply;
    }

    function totalSupply() view public returns (uint tokenSupply) {
        tokenSupply = _totalSupply;
    }
}
