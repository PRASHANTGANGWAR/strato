const ba = require('blockapps-rest');
const rest = ba.rest;
// const rest = require('./lib/rest_3.js');
const common = ba.common;
const config = common.config;
const util = common.util;
const should = common.should;
const assert = common.assert;
const expect = common.expect;
const Promise = common.Promise;

console.log("config",config)
const adminName = util.uid('prashant');  // FIXME
const adminPassword = 'prashant';   // FIXME

const admin = yield rest.createUser(adminName, adminPassword);

console.log(admin)