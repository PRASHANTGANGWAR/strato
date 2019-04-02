const fetch = require("node-fetch");

function callContract() {

    const blocURL = HOST_URL + '/bloc/v2.2/users/';
    const username = 'alice';
    const password = "securePassword";
    const methodName = 'set';
    const address = '87168271eb895681f7b724bde31c4f0';
    const contractAddress = 'b823216ffb44fcea8e5eee8435aef';
    const callArgs = {
      set: '7',
    };

    fetch(blocURL + username + '/' + address + '/contract/SimpleStorage/' + contractAddress + '/call?resolve', {
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