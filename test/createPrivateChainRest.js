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
const label = 'My chain label';
const members = [
    {
        "address": "5815b9975001135697b5739956b9a6c87f1c575c",
        "enode": "enode://6d8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@180.151.78.158:30303?discport=30303"
      },
      {
        "address": "93fdd1d21502c4f87295771253f5b71d897d911c",
        "enode": "enode://6d8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@180.151.78.158::30303?discport=30303"
      }
];
const balances = [
           { address: "00000000000000000000000000deadbeef"
           , balance: 1000000000000000000000
           },
           { address: "0000000000000000000000000012345678"
           , balance: 0
           }];
const src = "contract Governance { enum Rule { AUTO_APPROVE, TWO_VOTES_IN, MAJORITY_RULES } Rule addRule; Rule removeRule; Rule terminateRule; event MemberAdded (address member, string enode); event MemberRemoved (address member); event ChainTerminated(); struct MemberVotes { address member; uint votes; } MemberVotes[] addVotes; MemberVotes[] removeVotes; uint terminateVotes; function voteToAdd(address m, string e) { MemberAdded(m,e); } function voteToRemove(address m) { MemberRemoved(m); } function voteToTerminate() { terminateVotes++; if (satisfiesRule(terminateRule, terminateVotes)) { ChainTerminated(); } } function satisfiesRule(Rule rule, uint votes) returns (bool) { if (rule == Rule.AUTO_APPROVE) { return true; } else if (rule == Rule.TWO_VOTES_IN) { return votes >= 2; } else { return true; } } }";
const args = {
  addRule:'AUTO_APPROVE',
  removeRule:'TWO_VOTES_IN',
  terminateRule:'MAJORITY_RULES'
  };

  var chain = rest.createChain(
  label, members, balances, src, args
  );
  console.log(chain.next(),"chain.next()");

