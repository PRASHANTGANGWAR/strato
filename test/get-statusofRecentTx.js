//http://localhost/bloc/v2.2/users/test/0956fc65ff7f98c688c4652832d6206134773535/fill?resolve=true


var request = require('request');

  const address = 'dca5bd846d09eaf943344c9bc068ee758ebb2021'
    const username = "test"
    const resolve = true // true - extra data and suces true /// false - sucess pending or no value   

function getUser(){
request(`http://localhost/bloc/v2.2/users/${username}/${address}/fill?resolve=${resolve}`, function (error, response, body) {
  console.log('body:', body); 
})
}
getUser()

// const fetch = require("node-fetch");

// function getState() {

//   const address = 'dca5bd846d09eaf943344c9bc068ee758ebb2021'
//     const username = "test"
//     const resolve = true // true - extra data and suces true /// false - sucess pending or no value   
//   fetch(`http://localhost/bloc/v2.2/users/${username}/${address}/fill?resolve=${resolve}`, {
//       method: 'GET',
//       headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//     })
//     .then(function(response,body) {
//         console.log(response.body);
//         console.log(body);
        
//     })  
//     .catch(function(error) {
//         console.log(error);
//     })
// }
// getState()