
const fetch = require("node-fetch");
var request = require('request');
//search only searchable contract


// function getContractAddress() {
//     var contractName = "Token"
//     fetch(`http://localhost/bloc/v2.2/contracts/${contractName}`)
//     .then(function(response) {
//         console.log(response,"getContractAddress");
//         console.log(body,"getContractAddress");

//     })  
//     .catch(function(error) {
//         console.log(error);
//     })
// }


// getContractAddress()

    // function getAllContracts() {
    //     fetch('http://localhost/bloc/v2.2/contracts')

    //     .then(function(response) {
    //         console.log(response,"getAllContracts");
    //     })  
    //     .catch(function(error) {
    //         console.log(error);
    //     })
    // }
    // getAllContracts()


    var contractName = "Token"


function getContractAddress(){

request(`http://localhost/bloc/v2.2/contracts/${contractName}`, function (error, response, body) {
  console.log('body:', body); 
})
}
getContractAddress()
// body: ["0e3abeaf5191a845117df293611629d1a135f879","Token","HashnodeTestCoin","Latest","StandardToken"]



function getAllContracts(){
request('http://localhost/bloc/v2.2/contracts', function (error, response, body) {
console.log('body:', body); 
})
}
// getAllContracts()


function getAllContractsCirrus(){
    request(`http://localhost/cirrus/search/${contractName}`, function (error, response, body) {
    console.log('body:', body); 
    })
    }
    getAllContractsCirrus()
// body: [{"address":"0e3abeaf5191a845117df293611629d1a135f879","chainId":"","block_hash":"e3bc990fedf9bcfbcf9b0416d78a03afe9d75b98598b7f7dac37cb99a6d14cb6","block_timestamp":"2019-04-01 07:27:45 UTC","block_number":"2","transaction_hash":"91650864d1bd900ea65804178dab5f947467f42174d58cb648b17035eace54d5","transaction_sender":"5499b1cb39f969ed7f5fcc37ea4b88506f5a2941","transaction_function_name":""}]


  //  var testBloc =  1curl 
