
const fetch = require("node-fetch");

function createAccount() {

  const username = 'alice123';
  const password = 'securePassword';

  fetch('http://localhost/bloc/v2.2/users/' + username, {
      method: 'POST',
      body: JSON.stringify(password),
      headers: {
          'Content-Type': 'application/json',
          },
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}

createAccount()
