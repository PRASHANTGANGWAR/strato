
// curl -X POST "http://localhost/bloc/v2.2/transactions/results?resolve=false" -H "accept: application/json;charset=utf-8" -H "Content-Type: application/json;charset=utf-8" -d "[ \"4fbe47914a102ae6561597c95ab95819ddfd6b18c7abc3004c099aeaed2234b4\"]"

var  BLOCK_URL = "http://localhost/bloc/v2.2/"

const fetch = require("node-fetch");

function sendEthers() {
    const HOST_URL=  'http://localhost'
    const blocURL = HOST_URL + '/bloc/v2.2/users/';
    const user = 'test';
    const password = "test";
    const senderAddress = '0956fc65ff7f98c688c4652832d6206134773535'; 
    const value = "1000"// amount to be sent 
    const toAddress = "5499b1cb39f969ed7f5fcc37ea4b88506f5a2941"// prashant.gangwar


    fetch('http://localhost/bloc/v2.2/transactions/results?resolve=false', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({  })
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

sendEthers()