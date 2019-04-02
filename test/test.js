var StellarSdk = require('stellar-sdk');
var request = require('request');
var express = require('express');
var router = express.Router();
var app = express();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//config server

app.listen(8082, () => {
  console.log("listining on port 8082");
})

app.get('/createaccount',  function(req, res){
var pair = StellarSdk.Keypair.random();
var secretKey = pair.secret();
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
var pub = pair.publicKey();
console.log("pub key"+pub);
console.log("serect key"+secretKey);
});

app.post('/balanceOf',  function(req, res){
var key = req.body.key;
  server.loadAccount(key).then(function(account) {
    account.balances.forEach(function(balance) {
    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);});
    });
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
//request test xlm from friend bot
app.get('/bottoacccfundtransfer',  function(req, res){
  request.get({
    url: 'https://friendbot.stellar.org',//frndbot
    qs: { addr: pair.publicKey() },
    json: true
  }, function(error, response, body) {
    if (error || response.statusCode !== 200) {
      console.error('ERROR!', error || body);
    }
    else {
      console.log('SUCCESS! You have a new account :)\n');
      var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//config server
      // the JS SDK uses promises for most actions, such as retrieving an account
      server.loadAccount(pair.publicKey()).then(function(account) {
      console.log('Balances for account: pub ' + pair.publicKey());
      console.log('Balances for account: secret key ' + pair.secret());
      account.balances.forEach(function(balance) {
      console.log('Type:', balance.asset_type, ', Balance:', balance.balance);// more asset type -ASSET_TYPE_CREDIT_ALPHANUM4)    
      // console.log("  Address: " + pair.address());
      // console.log("  Seed: " + pair.seed());
    });
  }); 
  }
  });

});
//tx
app.get('/transaction',function(req,res){
///////////////////////
var sourceSecretKey = 'SBHBGQOQVSHBWYJXGQCSJ4L5GIIRMF36SJPNOCCOJF3W7Y3MQPYM2LUS';// seed of acc from which tx process
var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
var sourcePublicKey = sourceKeypair.publicKey();//pub key
var receiverPublicKey = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//live netwrk
StellarSdk.Network.useTestNetwork();
server.loadAccount(sourcePublicKey)
  .then(function(account) {
    console.log(account.sequence);// to get the sequence no.
    var transaction = new StellarSdk.TransactionBuilder(account)
      // Add a payment operation to the transaction
      .addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: StellarSdk.Asset.native(),//native asset lumen
        amount: '30',
      }))
       .addMemo(StellarSdk.Memo.text('first tx!'))//optional 
      .build();
    // Sign this transaction with the secret key
    transaction.sign(sourceKeypair);

    // Let's see the XDR (encoded in base64) of the transaction we just built
    console.log(transaction.toEnvelope().toXDR('base64'));

    // Submitng the transaction to the Horizon server. The Horizon server will then do his work
   
    server.submitTransaction(transaction)
      .then(function(transactionResult) {
        console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
      })
      .catch(function(err) {
        console.log('An error has occured:');
        console.log(err);
      });
  })
  .catch(function(e) {
    console.error(e);
  });
/////////////////////////////////
}); 

// querying horizon 
app.get('/allTxOfAccount', function(req,res){
  server.transactions()
  .forAccount('GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D')//specify acc
  .call().then(function(r){ 
    console.log("Resp",r.records.length);//records will give all record from the tranasaction with that acc
   });
});

app.get('/TxDetailOfLedgerNo', function(req,res){
  server.transactions()
  .forLedger(319204)
  .call().then(function(r){ console.log(r.records.length); });
});
///Querying Horizon




























var express = require('express');
var app = express();
var Stellarbase = require('stellar-base');
var StellarSdk = require('stellar-sdk');
var request = require('request');
StellarSdk.Network.useTestNetwork();


var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/polling-app';
mongoose.connect(url);
var tokenSchema = require('./tokenSave.js').collection;


var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
app.listen(8080, () => {
    console.log("connected port 8080");
})

// var WebSocket = require('ws');
// var ws = new WebSocket('ws://horizon-testnet.stellar.org:9001');
// ws.on('open', function() {
//     console.log('ws connected');
//   });

var totalSupply = 100000;
var initialSupply = 50000; //50%

var issuerSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';//Entities that issue assets are called anchors.
var issuerPublicKey = 'GDTT75T6PWLP3RHDSVC5JUXGYIOZST4VUXHRGZBGQTR5PYA25R4AKEUT';
var assetName = 'okToken';
var okToken = new StellarSdk.Asset(
    assetName, issuerPublicKey);
var issuingKeys = StellarSdk.Keypair
    .fromSecret(issuerSecretKey);

//issue new asset ,
app.get('/issueAsset', function (req, res) {
    var okToken = new StellarSdk.Asset(
        assetName, issuerPublicKey);
    console.log('asset issued');
});

app.get('/changetrustline', function (req, res) {// change trustline and make tx

    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuerSecretKey);
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');
    // var receivingKeys = req.body.userSecretKey;
    server.loadAccount(receivingKeys.publicKey())
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: okToken,
                    limit: '1000'
                }))
                .build();
            transaction.sign(receivingKeys);
            server.submitTransaction(transaction);
            console.log('changetrustline');
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
});

//allow trust  i for kyc process
//Operation.allowTrust

app.get('/createAccount', function (req, res) {
    var pair = Stellarsdk.Keypair.random();
    var publickey = pair.publicKey();
    var secretkey = pair.secret();
    console.log(publickey);
    console.log(secretkey);
});


app.get('/transferCoins', async function (req, res) {
    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
    var receiverPublicKey = 'GARKTRTXR5P3KT4WW7WHTLU2CNX4JC3RGS5TJGRYSKE4Q3VSX636PS5T';// public key of reciever acc
    //receiverPublicKey = sourcePublicKey;
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//live netwrk
    StellarSdk.Network.useTestNetwork();
    server.loadAccount(sourcePublicKey)
        .then(function (account) {
            console.log('sequence no. of acc', account.sequence)
            // console.log(account);
            var transaction = new StellarSdk.TransactionBuilder(account)
                .addOperation(StellarSdk.Operation.payment({
                    destination: receiverPublicKey,
                    asset: StellarSdk.Asset.native(),//native asset lumen
                    amount: '1',
                }))
                .addMemo(StellarSdk.Memo.text('coins sent oktoken'))//optional 
                .build();
            // Sign this transaction with the secret key
            transaction.sign(sourceKeypair);
            // Let's see the XDR (encoded in base64) of the transaction we just built
            console.log(transaction.toEnvelope().toXDR('base64'));
            console.log('TX DONE 1');
            // Submitng the transaction to the Horizon server. The Horizon server will then do his work
            server.submitTransaction(transaction)
                .then(function (transactionResult) {
                    // console.log(JSON.stringify(transactionResult, null, 2));
                    //  console.log('\nSuccess! View the transaction at: ');
                    // console.log(transactionResult._links.transaction.href);
                    // res.send('done');
                    console.log('function stream');
                    stream();
                })
                .catch(function (err) {
                    console.log('An error has occured:');
                    console.log(err);
                });

        })
        .catch(function (e) {
            console.error(e);
        });


}); 
 

 
app.get('/balanceOf', function (req, res) {
    var pub = 'GARKTRTXR5P3KT4WW7WHTLU2CNX4JC3RGS5TJGRYSKE4Q3VSX636PS5T';
    // var key = req.body.key;
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D').publicKey();
    // var key = 'GBMRUSV4643UMITVDHADGLZZ5OERT7SKMTI7ZZBVYY3AKPHT2KPNBPBU';
    server.loadAccount(pub).then(function (account) {
        account.balances.forEach(function (balance) {//for each currency balance
            console.log('Type:', balance.asset_code, ', Balance:', balance.balance);
            //to get the currrency with its code balance.asset_code
        });
    });
});



app.get('/issueassetandtx', function (req, res) {
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    // Keys for accounts to issue and receive the new asset
    var issuingKeys = StellarSdk.Keypair
        .fromSecret('SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77');
    var receivingKeys = StellarSdk.Keypair
        // .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');
        .fromSecret('SC6ORTR65DYEUJWGA7MBEZWW5X3RHAADPWFYWLU57IDM43Q5ZEV5KJT7');
    // Create an object to represent the new asset
    var okToken = new StellarSdk.Asset(assetName, issuingKeys.publicKey());
    console.log('1');
    // First, the receiving account must trust the asset
    server.loadAccount(receivingKeys.publicKey())  // If the account is not found, surface a nicer error message for logging.
        .then(function (receiver) {
            console.log('2');
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: okToken,
                    limit: '1000'
                }))
                .build();
            transaction.sign(receivingKeys);
            console.log('3');
            return server.submitTransaction(transaction);
        })
        // Second, the issuing account actually sends a payment using the asset
        .then(function () {
            return server.loadAccount(issuingKeys.publicKey())
        })
        .then(function (issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
                .addOperation(StellarSdk.Operation.payment({
                    destination: receivingKeys.publicKey(),
                    asset: okToken,
                    amount: '10'
                }))
                .build();
            transaction.sign(issuingKeys);
            console.log('done TX');
            return server.submitTransaction(transaction);
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
})


app.get('/test', function (req, res) {
    var payments = server.payments().forAccount('GBD7K2CYHPRZ5DSOXFR65OE6ODERY4D3ZLRK3RMJNXQ73LWPG35ABLXB');
    console.log("hell", payments);

});

// app.get('/stream', function (req, res) {
async function stream() {
    var accountId = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
    var payments = server.payments().forAccount(accountId);
    console.log('in stream');
    // If some payments have already been handled, start the results from the
    // last seen payment. (See below in `handlePayment` where it gets saved.)
    var lastToken = await loadLastPagingToken(); // to knoe the token of last processed page
    //  console.log('outside if',lastToken)
    if (lastToken) {
        payments.cursor(lastToken);
        console.log('helllo lasttoken', lastToken.length);
    }

    // `stream` will send each recorded payment, one by one, then keep the
    // connection open and continue to send you new payments as they occur.
    payments.stream({
        onmessage: function (payment) {
            // Record the paging token so we can start from here next time.
            savePagingToken(payment.paging_token);
            // The payments stream includes both sent and received payments. We only
            // want to process received payments here.
            if (payment.to !== accountId) {// only recieved payment 
                return;
            }
            // In Stellar’s API, Lumens are referred to as the “native” type. Other
            // asset types have more detailed information.
            var asset;
            if (payment.asset_type === 'native') {
                asset = 'lumens';
            }
            else {
                asset = payment.asset_code + ':' + payment.asset_issuer;
            }
            console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
        },
        onerror: function (error) { console.error('Error in payment stream'); }
    });

    async function savePagingToken(token) {
        console.log(token);// save the 
        // save in local db and excess it next time
        // In most cases, you should save this to a local database or file so that
        // you can load it next time you stream new payments.
        await tokenSchema.updateOne({ token: 1299124527837185 }, { $set: { token: token } });
    }

    async function loadLastPagingToken() {

        var token = await tokenSchema.find().toArray();
        console.log('lastpaging token', token);
        // var x = '1521419150168065';//get last pagingtoken from the databsase 
        //and transaction after this last token will be shown only in stream
        return token;
        // Get the last paging token from a local database or file
    }
}
// });


app.get('/mint', function (req, res) {

});






//can send once test lumens to any acc.
app.get('/bottoacccfundtransfer', function (req, res) {
    // var sourceSecretKey ='SC6ORTR65DYEUJWGA7MBEZWW5X3RHAADPWFYWLU57IDM43Q5ZEV5KJT7';
    // var pair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = 'GBWJO2BAG5YQCKY363M7XR5QNH6JDJQUHTQ7TCFQQKPKQPAEL5RCEBUA';
    request.get({
        url: 'https://friendbot.stellar.org',//frndbot
        qs: { addr: sourcePublicKey },
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            // console.error(url + qs);
            console.error('ERROR!', error || body);
        }
        else {
            console.log('SUCCESS! You have a new account :)\n');
            var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//config server
            // the JS SDK uses promises for most actions, such as retrieving an account
            server.loadAccount(pair.publicKey()).then(function (account) {
                console.log('Balances for account: pub ' + pair.publicKey());
                console.log('Balances for account: secret key ' + pair.secret());
                account.balances.forEach(function (balance) {
                    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);// more asset type -ASSET_TYPE_CREDIT_ALPHANUM4)    
                    // console.log("  Address: " + pair.address());
                    // console.log("  Seed: " + pair.seed());
                });
            });
        }
    });

});


app.get('redemption', function (req, res) {

    var currentGoldRate = 1000; //get from external source
    var storageCost = 1;//1% of total amt
    var marketPrice = 1000// derived from Speculation
})



app.get('/makeOffer', function (req, res) {

    // GBD7K2CYHPRZ5DSOXFR65OE6ODERY4D3ZLRK3RMJNXQ73LWPG35ABLXB
    // SB4XJW2D4SOES3BNKMXMMC4U4PZBAE6MKOT4T3RTI2VF6MQWZ223DY2B

    var okToken = new StellarSdk.Asset(
        assetName, issuerPublicKey);
    // var offererSecretKey = req.key.offererSecretKey;
    var offererSecretKey = 'SB4XJW2D4SOES3BNKMXMMC4U4PZBAE6MKOT4T3RTI2VF6MQWZ223DY2B';
    var Keypair = StellarSdk.Keypair.fromSecret(offererSecretKey);
    console.log('1');
    server.loadAccount(Keypair.publicKey())
        .then(function (account) {
            console.log('2');

            var transaction = new StellarSdk.TransactionBuilder(account)
                .addOperation(StellarSdk.Operation.manageOffer({
                    selling: okToken,//asset
                    buying: StellarSdk.Asset.native(),
                    amount: 40,
                    price: 2,
                    offerId: 0,
                }))
                .build();
            transaction.sign(Keypair);
            //console.log(transaction.toEnvelope().toXDR('base64'));

            server.submitTransaction(transaction)
                .then(function (transactionResult) {
                    //console.log(JSOn.stringify(transactionResult));
                    console.log('\n Success!')
                })
                .catch(function (err) {
                    console.log('An error has occured');
                    console.log(err);
                })
        })
        .catch(function (e) {
            console.log(e);
        })
});

app.get('/setHomeDomain', function (req, res) {
    var StellarSdk = require('stellar-sdk');
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    // Keys for issuing account
    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuerSecretKey);

    server.loadAccount(issuingKeys.publicKey())
        .then(function (issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
                .addOperation(StellarSdk.Operation.setOptions({
                    homeDomain: 'oktoken.com',//set the homedomain
                }))
                .build();
            transaction.sign(issuingKeys);
            return server.submitTransaction(transaction);
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
});


app.get('/auth', function (req, res) {
    StellarSdk.Network.useTestNetwork();
    var issuingAccount = issuerPublicKey;
    server.loadAccount(issuingKeys.publicKey())
        .then(function (sourceAccount) {

            var transaction = new StellarSdk.TransactionBuilder(issuingAccount)
                .addOperation(StellarSdk.Operation.setOptions({
                    setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
                }))
                .build();
            transaction.sign(issuingKeys);
            server.submitTransaction(transaction);
        })

});

//checked before sending payment to the acc
app.get('/checkIsAuthorized', function (req, res) {
    var okTokenCode = 'okToken';
    var accountId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';//to be checked of the user to coins to be send
    server.loadAccount(accountId).then(function (account) {
        var trusted = account.balances.some(function (balance) {
            return balance.asset_code === okTokenCode &&
                balance.asset_issuer === issuerPublicKey;
        });
        console.log(trusted ? 'Trusted user' : 'Not trusted ');
        res.send(trusted ? 'Trusted user' : 'Not trusted ')
    });
});

// function getSequence()

app.get('/sequenceNo', function (req, res) {

    var StellarSdk = require('stellar-sdk');
    var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    server.loadAccount("GAOLCUJFQ5Q3ESN6P7IYI45QZRDRGPUO3253CEIZ7ZFCHPKP43GGWKLK")
        .then(function (account) { console.log(account.sequence) })
});

app.get('/flags', function (req, res) {

    server.loadAccount(issuerPublicKey)
        .then(function(account){
    StellarSdk.Network.useTestNetwork();
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.setOptions({
            setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
        }))
        .build();
        console.log(account);
    transaction.sign(issuingKeys);
    server.submitTransaction(transaction);

    res.send('flag set');

    })
});

app.get('/', function (req, res) {

    res.send('use other routes')
});