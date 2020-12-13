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
import { updateLeden } from "graphql/mutations";
import { createLeden, createJaren, createBesturen } from "graphql/mutations";
import { PagesSharp, StarRate } from "@material-ui/icons";
import { getLeden } from "graphql/queries";

var hist = createBrowserHistory();

Amplify.configure(awsconfig);

var bestuur = {praeses: "", quaestor: "", abactis: "", assessor: ""}

function test(){  
    const getLid = async() => {
      const besturen = await API.graphql(graphqlOperation(listBesturens, {limit: 1000}));
      const besturenlist = besturen.data.listBesturens.items;
      for(const elem of besturenlist){
        var k = bestuur;
        const name = await API.graphql(graphqlOperation(getLeden, {id: elem.praeses}))
        const fullname = name.data.getLeden.initials + " " +  name.data.getLeden.last_name;
        console.log(fullname)
      }
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
