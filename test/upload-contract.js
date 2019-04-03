const fetch = require("node-fetch");

function uploadContract(){

    const username = 'test';
    const password = 'test';
    const address = '0956fc65ff7f98c688c4652832d6206134773535';
    const args = { uint: '9'}
    const src = 
         `pragma solidity ^0.4.24;

        contract hello {
            uint storedData;
            function set(uint x) { storedData = x; }
            function get() returns (uint retVal) { 
                return storedData; 
            }
        }`;
    const RequestBody = { password, src, args }

    fetch('http://localhost/bloc/v2.2/users/' + username + '/' + address + '/contract?resolve', {
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