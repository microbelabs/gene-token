pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


contract GENEToken is StandardToken, Ownable {
    // Public constants.
    string public symbol = "GENE";
    string public name = "Game Energy Token";
    uint8 public decimals = 8;
    uint256 INITIAL_SUPPLY = 8000000000;
    address public owner;
    
    enum State { Published, InReview, Banned }

    // Game Entity
    // Game always has list of players with 99 slot attributes available.
    struct Game {
        string name;
        string description;
        address contractAddress;
        mapping ( address => Attribute[99]) players;
        State status;
    }

    uint8 public totalGame;

    // List of games using GENE Token
    mapping(uint => Game) public games;


    // Game Attributes
    struct Attribute {
        bytes32 key;
        bytes value;
    }
 
    /// Constructor
    function GENEToken() public {
        totalSupply = INITIAL_SUPPLY;
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    uint8 minimumRegistrationBalance = 100;

    modifier gameOwner(address _owner) {
        require(msg.sender == _owner);
        _;
    }


    // event if game is submitted to blockchain
    event GameSubmitted(address gameOwner);

    /**
    * Add game to index
    *
    * @param _name Game name
    * @param _description Game description
    * @return Boolean
    */
    function submitGame(string _name, string _description) public {
        require(balances[msg.sender] >= minimumRegistrationBalance);
        require(isGameAdded(msg.sender) == false);

        totalGame++;

        uint8 gameIndex = totalGame;

        Game memory game;
        game.name = _name;
        game.description = _description;
        game.contractAddress = msg.sender;
        game.status = State.InReview;
 
        require(transfer(owner, minimumRegistrationBalance) == true);
        games[gameIndex] = game;
        GameSubmitted(msg.sender);
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
