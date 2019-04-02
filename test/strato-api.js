var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
const fetch = require("node-fetch");


app.listen(8082, () => {
    console.log("listining on port 8082");
  })

app.get('/allUsers',  function(req, res){
request('http://localhost/bloc/v2.2/users', function (error, response, body) {
    console.log('body:', body); 
    res.send(body)
    })
});

//state of strato
app.get('/',  function(req, res){
    request('http://localhost/bloc/v2.2', function (error, response, body) {
        console.log('body:', body); 
        res.send(body)
    })
});

app.get('/createUser',  function(req, res){

    const username = 'alice4';
    const password = 'securePassword';

    fetch('http://localhost/bloc/v2.2/users/' + username, {
        method: 'POST',
        body: JSON.stringify(password),
        headers: {
            'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then(json => console.log(json))
        .catch(function(error) {
            console.log(error);
    })
});

app.get('/userAddress',  function(req, res){

    const username = "alice"// user name is not unique
    request('http://localhost/bloc/v2.2/users/'+username, function (error, response, body) {
        console.log('body:', body); 
        res.send(body)
        })
    });

app.get('/userAddress',  function(req, res){
    const username = "alice"// user name is not unique
    request('http://localhost/bloc/v2.2/users/'+username, function (error, response, body) {
        console.log('body:', body); 
        res.send(body)
        })
    });

app.get('/',  function(req, res){
    const username = "alice"// user name is not unique
    request('http://localhost/bloc/v2.2/users/'+username, function (error, response, body) {
        console.log('body:', body); 
        res.send(body)
        })
    });
    

    
    
    

