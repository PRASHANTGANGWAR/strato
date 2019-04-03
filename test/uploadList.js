//curl -X POST "http://localhost/bloc/v2.2/users/prashant.gangwar/5499b1cb39f969ed7f5fcc37ea4b88506f5a2941/uploadList?resolve=false" -H "accept: application/json;charset=utf-8" -H "Content-Type: application/json;charset=utf-8" -d "{ \"contracts\": [ { \"args\": { \"balance\": 10, \"accountType\": \"Checking\" }, \"contractName\": \"testStorage\" } ], \"resolve\": true, \"password\": \"qwerty@1\"}"

const fetch = require("node-fetch");

function uploadContract(){

    const username = 'test';
    const password = 'test';
    const address = '0956fc65ff7f98c688c4652832d6206134773535';
    const contractName ="testStorage"
    const RequestBody = {
        "contracts": [
          {
            "args": {
              "balance": 10,
              "accountType": "Checking"
            },
            "contractName": contractName
          }
        ],
        "resolve": true,
        "password": password
      }

    fetch('http://localhost/bloc/v2.2/users/' + username + '/' + address + '/uploadList?resolve', {
        method: 'POST',
        body: JSON.stringify(RequestBody),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

uploadContract()