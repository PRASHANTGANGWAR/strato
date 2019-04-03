
var request = require('request');

function getUserAddress(){
request('http://localhost/bloc/v2.2/addresses', function (error, response, body) {
  console.log('body:', body); 
})
}
getUserAddress()