const fetch = require("node-fetch");

function faucet() {

  const address = '5499b1cb39f969ed7f5fcc37ea4b88506f5a2941'

  fetch('http://localhost/strato-api/eth/v1.2/faucet', {
      method: 'POST',
      body: `address=${address}`,
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

faucet()