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
var mocha = require('mocha')
var describe = mocha.describe

const cors = require('cors');
console.log(rest,"restApi")


describe('Supply Chain Demo App - deploy contracts', function () {
    this.timeout(900 * 1000);
  
    assert.isDefined(config.dataFilename, 'Data argument missing. Set in config, or use --data <path>');
  
    const adminName = util.uid('Admin');  // FIXME
    const adminPassword = '7890';   // FIXME
  
    // uploading the admin contract and dependencies
    it('should upload the contracts', function* () {
      // get the dapp
      const admin = yield rest.createUser(adminName, adminPassword);
      console.log(admin," 12121212")
      // wait for the transaction to be added to blockchain
      do {
        yield new Promise(resolve => setTimeout(resolve, 1000))
      } while ((yield rest.getBalance(admin.address)) < 1);
      const dapp = yield dappJs.uploadContract(admin, config.libPath);
      const deployment = yield dapp.deploy(config.dataFilename, config.deployFilename);
    });
  });

// const adminName = "Admin4" // util.uid('Admin4');
// const adminPassword = '7890';   // FIXME

function* generator(adminName,adminPassword) {
    console.log("GENERATOR START")

    const admin = yield rest.createUser(adminName, adminPassword);
    console.log(admin,"12121212")
  }
  var gen = generator(adminName,adminPassword);
  console.log(gen.next(),"gennnnnnnnn")


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
const port = process.env.PORT || 3032;

const server = app.listen(port, (err) => {
  if (err) {
    console.log((err.message));
  } else {
    console.log('App listening on port ' + port);
  }
});

module.exports = server;
