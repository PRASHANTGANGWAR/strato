const fetch = require("node-fetch");

function callContract() {
  const HOST_URL=  'http://localhost'
    const blocURL = HOST_URL + '/bloc/v2.2/users/';
    const username = 'test';
    const password = "test";
    const methodName = 'set';
    const address = '0956fc65ff7f98c688c4652832d6206134773535';
    const contractAddress = 'afa7fb46a69c7ce0728c5ff9513b2a5ddfef3e5b';
    const contractName = "hello"
    const callArgs = {
      x: '7',
    };

    fetch(blocURL + username + '/' + address + '/contract/hello/' + contractAddress + '/call?resolve', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password: password,
        method: methodName,
        value: "0",
        args: callArgs
      })
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

callContract()