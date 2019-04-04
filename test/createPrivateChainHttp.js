
const fetch = require("node-fetch");

function createChain() {

    fetch('http://localhost/bloc/v2.2/chain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
          "args": {
            "removeRule": "AUTO_APPROVE",
            "addRule": "AUTO_APPROVE"
          },
          "balances": [
            {
              "balance": 20000000,
              "address": "5815b9975001135697b5739956b9a6c87f1c575c"
            },
            {
              "balance": 999999,
              "address": "93fdd1d21502c4f87295771253f5b71d897d911c"
            }
          ],
          "members": [
            {
              "address": "5815b9975001135697b5739956b9a6c87f1c575c",
              "enode": "enode://6d8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@171.16.0.4:30303"
            },
            {
              "address": "93fdd1d21502c4f87295771253f5b71d897d911c",
              "enode": "enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@172.16.0.5:30303?discport=30303"
            }
          ],
          "contract": "Governance",
          "src": "contract Governance { enum Rule { AUTO_APPROVE, TWO_VOTES_IN, MAJORITY_RULES } Rule addRule; Rule removeRule; Rule terminateRule; event MemberAdded (address member, string enode); event MemberRemoved (address member); event ChainTerminated(); struct MemberVotes { address member; uint votes; } MemberVotes[] addVotes; MemberVotes[] removeVotes; uint terminateVotes; function voteToAdd(address m, string e) { MemberAdded(m,e); } function voteToRemove(address m) { MemberRemoved(m); } function voteToTerminate() { terminateVotes++; if (satisfiesRule(terminateRule, terminateVotes)) { ChainTerminated(); } } function satisfiesRule(Rule rule, uint votes) returns (bool) { if (rule == Rule.AUTO_APPROVE) { return true; } else if (rule == Rule.TWO_VOTES_IN) { return votes >= 2; } else { return true; } } }",
          "metadata": {
            "history": "Governance"
          },
          "label": "my chain4"
        })
    })
    .then(function(response) {
        console.log(response);
    })  
    .catch(function(error) {
        console.log(error);
    })
}
    createChain()







  //  var testBloc =  1