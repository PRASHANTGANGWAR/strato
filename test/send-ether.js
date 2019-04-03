// curl -X POST "http://localhost/bloc/v2.2/users/test/0956fc65ff7f98c688c4652832d6206134773535/send?resolve=" -H "accept: application/json;charset=utf-8" -H "Content-Type: application/json;charset=utf-8" -d "{ \"toAddress\": \"5499b1cb39f969ed7f5fcc37ea4b88506f5a2941\", \"value\": \"100000000\", \"password\": \"test\", \"metadata\": null, \"txParams\": null}"

const fetch = require("node-fetch");

function sendEthers() {
    const HOST_URL=  'http://localhost'
    const blocURL = HOST_URL + '/bloc/v2.2/users/';
    const user = 'test';
    const password = "test";
    const senderAddress = '0956fc65ff7f98c688c4652832d6206134773535'; 
    const value = "1000"// amount to be sent 
    const toAddress = "5499b1cb39f969ed7f5fcc37ea4b88506f5a2941"// prashant.gangwar


    fetch(`http://localhost/bloc/v2.2/users/${user}/${senderAddress}/send?resolve=`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "toAddress": toAddress,
        "value": value,
        "password": password,
        "metadata": null,
        "txParams": null
      })
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

sendEthers()