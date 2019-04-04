'use strict'
const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const fsutil = common.fsutil;
const cors = require('cors');
const co = require('co');
const fetch = require("node-fetch");

const adminName = util.uid('Admin');   // util.uid('Admin4'); fiffrent nane
const adminPassword = '7890';   // FIXME

const contractName = 'UserManager';
const contractFilename = 'user-contracts/common/user.manager.sol';


console.log(contractFilename)
console.log(contractName)
app.get('/allUsers',  (req, res) => {
    try {

    var state = rest.getUsers();
    console.log(state.next(),"gen.next()");
    res.send(state)
    }
    catch (e) {
      console.log(e)
    }
  })



app.get('/createUser',  (req, res) => {
    try {

    var user = rest.createUser(adminName, adminPassword);
    console.log(user.next(),"gen.next()");
    res.send(user)
    }
    catch (e) {
      console.log(e)
    }
  })

app.get('/fucetAccount',  (req, res) => {
    try {
    var user = rest.createUser(adminName, adminPassword);
    console.log(user.next(),"gen.next()");
    res.send(user)
    }
    catch (e) {
      console.log(e)
    }
  })

  app.get('/sendEthers',(req, res)=>{
      try{
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
                res.send(response)
            })  
            .catch(function(error) {
                console.log(error);
            })
        }
        
      
      catch(e){

      }
  })



// fromUser, toUser, value, doNotResolve, nonce, chainId, node
  app.get('/sendEtherssdk',(req, res)=>{
    try{
          const HOST_URL=  'http://localhost'
          const blocURL = HOST_URL + '/bloc/v2.2/users/';
          const user = 'test';
          const password = "test";
          const senderAddress = '0956fc65ff7f98c688c4652832d6206134773535'; 
          const value = "1000"// amount to be sent 
          const toAddress = "5499b1cb39f969ed7f5fcc37ea4b88506f5a2941"// prashant.gangwar
      


          var fromUser = ''
          var toUser = ''
          var value = ''
          var  doNotResolve = '' 
          var nonce = ''
          var chainId = ' '
          var node =''
          
          var tx = rest.send
      }
      
    
    catch(e){

    }
})

// function* uploadContract(admin, args) {
//     console.log("upload contract")
//     const contract = yield rest.uploadContract(admin, contractName, contractFilename, args);
//     console.log("upload contract",contract)
    
// }
// //   uploadContract()
//   var gen1 = uploadContract(adminName,adminPassword);// calling generatoir function
//   console.log(gen1,"gennnnnnnnn")
//   console.log(gen1.next(),"gennnnnnnnn, gen next1")
//   console.log(gen1.next(),"gennnnnnnnn, gen next2")

 

// read the app deployment file
// const deploy = fsutil.yamlSafeLoadSync(config.deployFilename, config.apiDebug);
// console.log('Deploy:', deploy);
// if (deploy === undefined) throw new Error('Deploy config.deployFilename not found ', config.deployFilename);
// app.set('deploy', deploy);

/**
 * Config to handle POSTs to API
 *  - Parse JSON and URL encode
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/**
 * Set static assets directory
 * for documentation
 */
// app.use(express.static(path.join(__dirname, '../doc')));

/**
 * Set up API routes
 */
// const routes = require('./routes');
// app.use('/', routes);


// get the intended port number, use port 3031 if not provided
const port = process.env.PORT || 3033;

const server = app.listen(port, (err) => {
  if (err) {
    console.log((err.message));
  } else {
    console.log('App listening on port ' + port);
  }
});


module.exports = server;
