var Election = artifacts.require("./Election.sol");


contract("Election", (accounts) => {
    var electionInstance;

    it("initializes with three candidates", () => {
        return Election.deployed()
        .then((instance) => {
            return instance.candidateCount();
        })
        .then((count) => {
            assert.equal(count.toString(), 3);
        });
    });

    it("it initalizes the candidates with the correct values", () => {
        return Election.deployed()
        .then((instance) => {
            electionInstance = instance;
            return electionInstance.candidates(0);
        })
        .then((candidate) => {
            assert.equal(candidate[0].toString(), 0, "contains the wrong id");
            assert.equal(candidate[1].toString(), "Peter Obi", "Contains the wrong name");
            assert.equal(candidate[2].toString(), 0, "Contains the wrong voteCount");
            return electionInstance.candidates(1);
        })
        .then((candidate) => {
            assert.equal(candidate[0].toString(), 1, "contains the wrong id");
            assert.equal(candidate[1].toString(), "Tinibu", "Contains the wrong name");
            assert.equal(candidate[2].toString(), 0, "Contains the wrong voteCount");
            return electionInstance.candidates(2);
        })
        .then((candidate) => {
            assert.equal(candidate[0].toString(), 2, "contains the wrong id");
            assert.equal(candidate[1].toString(), "Atiku", "Contains the wrong name");
            assert.equal(candidate[2].toString(), 0, "Contains the wrong voteCount");
        });
    });
});