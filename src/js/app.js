// App = {
//   web3Provider: null,
//   contracts: {},

//   init: async function() {
//     // Load pets.
//     $.getJSON('../pets.json', function(data) {
//       var petsRow = $('#petsRow');
//       var petTemplate = $('#petTemplate');

//       for (i = 0; i < data.length; i ++) {
//         petTemplate.find('.panel-title').text(data[i].name);
//         petTemplate.find('img').attr('src', data[i].picture);
//         petTemplate.find('.pet-breed').text(data[i].breed);
//         petTemplate.find('.pet-age').text(data[i].age);
//         petTemplate.find('.pet-location').text(data[i].location);
//         petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

//         petsRow.append(petTemplate.html());
//       }
//     });

//     return await App.initWeb3();
//   },

//   initWeb3: async function() {
//     /*
//      * Replace me...
//      */

//     return App.initContract();
//   },

//   initContract: function() {
//     /*
//      * Replace me...
//      */

//     return App.bindEvents();
//   },

//   bindEvents: function() {
//     $(document).on('click', '.btn-adopt', App.handleAdopt);
//   },

//   markAdopted: function() {
//     /*
//      * Replace me...
//      */
//   },

//   handleAdopt: function(event) {
//     event.preventDefault();

//     var petId = parseInt($(event.target).data('id'));

//     /*
//      * Replace me...
//      */
//   }

// };

// $(function() {
//   $(window).load(function() {
//     App.init();
//   });
// });



App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: () => {
    console.log('running init')
    return App.initWeb3()
  },

  initWeb3: () => {
    console.log('running init WEB3')

    if(typeof web3 !== 'undefined'){
      //if a web3 instance is already provided by Metamask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      //specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7574');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: () => {
    console.log('running init contract')

    $.getJSON("Election.json", (election) => {
      //instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      //connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: () => {
    console.log('running init render')

    let electionInstance;
    let loader = $("#loader");
    let content = $("#content");

    loader.show();
    content.hide();


    //connect onClick of button
    $('#connect').click(() => {
      ethereum.enable()
      .then((accounts) => {
        console.log(accounts)
      })
      .catch((error) => (console.log(error)));      
    })


    //load account data
    web3.eth.getCoinbase((err, account) => {
      if(err === null){
        App.account = account;
        $("#accountAddress").html("Your Account: " + account)
      }
    });

    //load contract data
    App.contracts.Election.deployed()
    .then((instance) => {
      console.log('contract deployed');
      
      electionInstance = instance;
      return electionInstance.candidateCount();
    })
    .then((candidateCount) => {
      let candidateResults = $("#candidatesResult");
      candidateResults.empty();

      for (let i = 0; i <= candidateCount; i++){
        electionInstance.candidates(i)
        .then((candidate) => {
          let id = candidate[0];
          let name = candidate[1];
          let voteCount = candidate[2];

          //render candidate result
          let candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
          candidateResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    })
    .catch((error) => {console.warn(error)});

  }
  
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
