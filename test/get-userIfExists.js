
var request = require('request');

var user = "prashant.gangwar"

function getUser(){
request('http://localhost/bloc/v2.2/users/'+ user, function (error, response, body) {
  console.log('body:', body); 
})
}
getUser()