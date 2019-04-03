'use strict'
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const fsutil = common.fsutil;
const cors = require('cors');
const co = require('co');

const adminName = util.uid('Admin');   // util.uid('Admin4'); fiffrent nane
const adminPassword = '7890';   // FIXME

const contractName = 'UserManager';
const contractFilename = 'user-contracts/common/user.manager.sol';

// var user = rest.createUser(adminName, adminPassword);
// console.log(user.next(),"gen.next()");

var state = rest.getUsers();
console.log(state.next(),"gen.next()");

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
