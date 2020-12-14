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

const galarr = 
['1979: Koelman',
'1980: Niesten',
'1983: De Haan',
'1984: Van Steensel',
'1985: Ostendorf',
'1986: Verwiel',
'1987: Kortenbach, Greven, Heijnen',
'1988: Jacobs',
'2000: Wijnands',
'2001: Visser',
'2002: Dittrich, Vermet',
'2003: Van Kooten',
'2004: Ebskamp',
'2005: Briejer',
'2006: Fikkers',
'2007: Planjer, Krol, Konings',
'2009: Heunen, Thijssen, Bagerman',
'2010: Van Winden, Jonkers, Ciggaar, Bernards',
'2012: Van den Dop, Out, Lammers, Kuipers, Dalmeijer, Angelier',
'2013: Kokke, Bootsma, Weulen Kranenberg, Heijboer, Vlierhuis, Van Bladel, Van Erp',
'2014: Claushuis, Van Erk, De Klerk, De Klerk, Koek',
'2015: Ten Brinke, Gortworst, Hoeberechts, Kuilboer, Vreuls, De Wit',
'2016: Barsukoff Poniatowsky, Besselink, Buijs, Van Essen, De Jonge, Kuyl, Van Rees, Sanders, Varenkamp, Wenzel.',
'2017: Booij, Botman, Brom, Van Gils, Ludolph, Van der Plas, Velthuizen',
'2018: Bosman, Van Dokkum, Harteveld, Nieuwenhuijzen, Van Reek, Van Vugt, Weijers',
'2019: Brouwer, Frietema, Heijne, Klein Obbink, Van Loosen, De Munnik, Van Vliet, Vogel, De Vos, Zuidgeest',
]

// var k ={id: "", year: 0, names: ""}

// function getMembers(entrye){
//   var leden = entrye.substr(entrye.indexOf(' ') + 1)
//   var ledenarr = leden.split(', ')
//   var returnstring = ""
//   for(var x = 0; x < ledenarr.length; x++){
//     returnstring += ledenarr[x] + ";"
//   }
//   return returnstring.slice(0, -1)
// }

// const putData = async() => {
//   var entry = k;
//   for(var i =0; i < galarr.length; i++){
//     entry.id= uuidv4();
//     entry.year = parseInt(galarr[i].split(":")[0]);
//     entry.names = getMembers(galarr[i])
//     const putd = await API.graphql(graphqlOperation(createGalaAanwezigen, {input: entry}))
//   }
// }

// putData()


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
