import React from "react";
import ReactDOM from "react-dom";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports'
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import {v4 as uuidv4 } from 'uuid';

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import { listLedens, listBesturens } from "graphql/queries";
import { updateLeden, updateBesturen } from "graphql/mutations";
import { createLeden, createJaren, createBesturen } from "graphql/mutations";
import { PagesSharp, StarRate } from "@material-ui/icons";
import { getLeden } from "graphql/queries";

var hist = createBrowserHistory();

Amplify.configure(awsconfig);

var bestuur = {praeses: "", quaestor: "", abactis: "", assessor: ""}

const values = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]
]);

function romanToInt(string) {
  let result = 0,
    current, previous = 0;
  for (const char of string.split("").reverse()) {
    current = values.get(char);
    if (current >= previous) {
      result += current;
    } else {
      result -= current;
    }
    previous = current;
  }
  return result - 1;
}

function sortFunction(a, b) {
  if (a.seq_num === b.seq_num) {
      return 0;
  }
  else {
      return (a.seq_num < b.seq_num) ? -1 : 1;
  }
}

function test(){  
    const getLid = async() => {
      const besturen = await API.graphql(graphqlOperation(listBesturens, {limit: 1000}));
      const besturenlist = besturen.data.listBesturens.items;
      besturenlist.sort(sortFunction)
      
    }
    getLid();
}

test()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
