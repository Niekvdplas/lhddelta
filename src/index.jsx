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
import BesturenPage from "views/BesturenPage/BesturenPage";
import { listJarens } from "graphql/queries";
import { updateJaren } from "graphql/mutations";
import LedenPage from "views/LedenPage/LedenPage";

var hist = createBrowserHistory();

Amplify.configure(awsconfig);

const values = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000]
]);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path='/besturen' component={BesturenPage} />
      <Route path='/leden' component={LedenPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
