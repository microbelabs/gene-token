pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/StandardToken.sol";


contract GENEToken is StandardToken {
    // Public constants.
    string public symbol = "GENE";
    string public name = "Game Energy Token";
    uint8 public decimals = 8;
    uint256 INITIAL_SUPPLY = 8000000000;
    address public owner;

    // add trusted list of games
    mapping(address => bool) public trusted;

    // add listed games
    mapping(address => bool) public listed;

    // List of games using GENE Token
    mapping(uint => Game) public games;
    uint8 totalGame;

    // Game Entity
    // Always has list of players with 99 slot properties available.
    struct Game {
        string name;
        string description;
        address contractAddress;
        mapping(address => Properties[99]) players;
    }

    // Game Properties
    struct Properties {
        bytes32 key;
        bytes value;
    }
 
    /// Constructor
    function GENEToken() public {
        totalSupply = INITIAL_SUPPLY;
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    /**
    * Get game name.
    *
    * @param gameAddress Registered game address.
    * @return Game Name.
    */
    function getGameName(address gameAddress) view public returns(string) {
        uint8 index = gameIndexOf(gameAddress);
        require(index > 0);
        return games[index].name;
    }

    /**
    * Check whether game is already added.
    *
    * @param gameAddress Game Address.
    * @return Added or Not.
    */
    function isGameAdded(address gameAddress) view internal returns(bool) {
        uint8 index = gameIndexOf(gameAddress);
        if (index > 0) {
            return true;
        }

        return false;
    }

    /**
    * Get game index in database.
    *
    * @param gameAddress Game Address.
    * @return game index.
    */
    function getGameIndex(address gameAddress) view internal returns(uint8) {
        uint8 index = gameIndexOf(gameAddress);
        require(index > 0);
        return index;
    }

    /**
    * Get index of game in database.
    *
    * @param gameAddress Game contract's address.
    * @return Index of game.
    */
    function gameIndexOf(address gameAddress) view internal returns(uint8) {
        for (uint8 i = 1; i <= totalGame; i++) {
            if (games[i].contractAddress == gameAddress) {
                return i;
            }
        }

        return 0;
    }
}
