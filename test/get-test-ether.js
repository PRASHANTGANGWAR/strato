const fetch = require("node-fetch");

function faucet() {

  const address = 'bf39b2f81bf6be824e7314e72701318485587e'

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