
var request = require('request');

function getUser(){
request('http://localhost/bloc/v2.2/users', function (error, response, body) {
  console.log('body:', body); 
})
}
getUser()