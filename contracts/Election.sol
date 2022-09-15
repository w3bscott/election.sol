// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22;

contract Election {

    struct Candidate{
        uint _id;
        string _name;
        uint _voteCount;
    }

    constructor() public{
        registerCandidate();
    }

    mapping(uint => Candidate) public candidates;

    uint public candidateCount;

    function addCandidate(string memory _name) private {
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
        candidateCount ++;
    }

    function registerCandidate() public {
        addCandidate("Peter Obi");
        addCandidate("Tinibu");
        addCandidate("Atiku");
    }


}