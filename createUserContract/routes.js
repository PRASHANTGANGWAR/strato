const ba = require('blockapps-rest');
const rest = ba.rest;
const util = ba.common.util;
const config = ba.common.config;
const Promise = ba.common.Promise;

console.log(rest,"restApi")
var adminName = "Buyer1"
var adminPassword = "1234"
// const admin = yield rest.createUser(adminName, adminPassword);

function* uploadContract(admin, libPath) {
    const contract = yield rest.uploadContract(admin, contractName, libPath + contractFilename);
    contract.src = 'removed';
    yield compileSearch();
    return yield setContract(admin, contract);
  }

//   module.exports = router;
