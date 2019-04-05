// curl -X GET "http://localhost/strato-api/eth/v1.2/chain" 
//     -H  "accept: application/json;charset=utf-8"

//yield rest.getChainInfo(chainId);



//http://localhost/strato-api/eth/v1.2/chain

var request = require('request');

request('http://localhost/strato-api/eth/v1.2/chain', function (error, response, body) {
    // console.log('body:', body);
    // console.log('test123:', body) //chain id in response.id
    console.log('test123:', body) //chain id in response.id

    console.log('test123:555555555555555555555555555555555555555') //chain id in response.id

        for(var i = 0; i < 2; i++) {
            var obj = body[i];
        
            console.log(obj.id);
        }
        // console.log(i,key,txsRes.txs[i][key])
      
    console.log('test123:', body[0][id]) //chain id in response.id
    
    console.log('test123:', body.id) //chain id in response.id

    })


    