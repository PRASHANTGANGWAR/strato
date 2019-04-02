const fetch = require("node-fetch");

function uploadContract(){

    const username = 'alice';
    const password = 'securePassword';
    const address = 'bf39b2f81bf6be824e7314e72701318485587e';
    const args = { uint: '9'}
    const src = 
        `pragma solidity ^0.4.24;

        contract SimpleStorage {
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