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
import DpbPage from "views/DpbPage/DpbPage.js";
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
import { listPlaybacks } from "graphql/queries";
import { createPlayback } from "graphql/mutations";
import VapPage from "views/VapPage/VapPage";
import GalaPage from "views/GalaPage/GalaPage";
import { createGalaAanwezigen } from "graphql/mutations";

var hist = createBrowserHistory();

Amplify.configure(awsconfig);


ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/dpb" component={DpbPage} />
      <Route path="/gala" component={GalaPage} />
      <Route path="/vap" component={VapPage} />
      <Route path='/besturen' component={BesturenPage} />
      <Route path='/leden' component={LedenPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
