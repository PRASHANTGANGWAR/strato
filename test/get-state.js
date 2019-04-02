const fetch = require("node-fetch");

function getState() {

  const address = 'dca5bd846d09eaf943344c9bc068ee758ebb2021'

  fetch(`http://localhost/bloc/v2.2/contracts/SimpleStorage/${address}/state`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}
getState()