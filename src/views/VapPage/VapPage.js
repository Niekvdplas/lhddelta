import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import ReactPlayer from "react-player";
import Card from "components/Card/Card.js";


import profile from "assets/img/faces/christian.jpg";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { EmojiEvents, Filter1, Filter2, Filter3, Filter4, Filter5Outlined, Filter5Rounded, Group, History } from "@material-ui/icons";
import { listPlaybacks } from "graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listBesturens } from "graphql/queries";
import { getOverig } from "graphql/queries";
import { listOverigs } from "graphql/queries";
import { listVapss } from "graphql/queries";

const useStyles = makeStyles(styles);

export default function VapPage(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [vaps, setVaps] = useState("");
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  var k = { abactis: "", dkc: { dkcpraeses: "", dkcquaestor: "", dkcpraesesemail: "", dkcquaestoremail: "", dkcpraesesnummer: "", dkcquaestornummer: "", dkcpraesesfoto: "", dkcquaestorfoto: "" }, bestuur: "" }

  function sortFunction(a, b) {
    if (a.seq_num === b.seq_num) {
      return 0;
    }
    else {
      return (a.seq_num > b.seq_num) ? -1 : 1;
    }
  }

  useEffect(() => {
    if (!data || data.link == "") {
      getData();
    }
  }, []);

  const getData = async () => {
    const response = await API.graphql(graphqlOperation(listBesturens, { limit: 1000 }));
    const bestuurlist = response.data.listBesturens.items;
    bestuurlist.sort(sortFunction)
    k.abactis = bestuurlist[0].abactis;
    k.bestuur = bestuurlist[0].name.substr(0, bestuurlist[0].name.lastIndexOf(' '));
    const dkcresp = await API.graphql(graphqlOperation(listOverigs))
    const dkc = dkcresp.data.listOverigs.items;
    dkc.sort(function(a,b){
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    k.dkc = dkc[0]
    setData(k);
    const responsevaps= await API.graphql(graphqlOperation(listVapss, { limit: 1000 }));
    setVaps(responsevaps.data.listVapss.items.sort(function(a, b){
      return a["num"] - b["num"];
    }));
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="VAP"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div className={classes.name}>
                    <br /><br /><br />
                    <h3 className={classes.title}>VAPs van Delta</h3>
                  </div>
                  <div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Beste vapper,

                Nu jij de KMT of de NKT hebt afgerond en je als eerstejaars Quint het komende jaar zal rondlopen op ons aller geliefde sociëteit, is de VAP-periode aangebroken. Om het maximale uit je tijd op Quintus te halen staan de komende weken in het teken van jouw dispuutskeuze. Niet geheel onbelangrijk, want uiteindelijk bepaalt het dispuut waar je bij gaat hoe jij je studentenleven in Leiden invult, en nog belangrijker: Met wie je het invult. Om deze belangrijke keuze goed te kunnen maken zullen alle disputen komende weken activiteiten en feesten organiseren, om te laten zien waar zij voor staan. Delta blijft hierin niet achter en organiseert wereldberoemde VAP’s, zoals de Tiroler, American Fratparty, de Traditiones en nog veel meer geweldige activiteiten, om aan iedereen in Leiden te laten zien dat het Delta is wat de norm op Quintus stelt. Want bij het mooiste dispuut van Leiden horen de mooiste VAP’s.
<br />
De DKC, oftewel de Delta Kennismakingscommissie, verzorgt alle VAP’s. Voor vragen, goede gesprekken of inschrijven voor VAP’s dient met hen contact opgenomen te worden. Onder kopje DKC zijn hun gegevens te vinden, en verder in het submenu zijn alle VAP’s te vinden met uitleg over de activiteit, datum en plaats.
<br />
Met Deltaanse groet,
<br />
                {data.abactis != undefined ? data.abactis : null}, Abactis van het {data.bestuur != undefined ? data.bestuur : null} der L.H.D. DELTA
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "DKC",
                      tabIcon: Group,
                      tabContent: (
                        <p>
                          De Delta Kennismakings Commissie {new Date().getFullYear()} bestaat dit jaar uit {data.dkc != undefined ? data.dkc.dkcpraeses : null} en {data.dkc != undefined ? data.dkc.dkcquaestor : null}
                          <br />
                          Voor vragen of contact over de VAPs, het dispuut of aangelegenheden waar geschroefd wordt, schroom niet om te bellen of mailen naar:
                          <br />
                          <div>
                            <GridContainer>
                              <GridItem xs={12} sm={12} md={6}>
                                <Card plain>
                                  <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                                    <img src={data.dkc != undefined ? data.dkc.dkcpraesesfoto : null} alt="..." className={imageClasses} />
                                  </GridItem>
                                  <h4 className={classes.cardTitle}>
                                    {data != undefined ? data.praeses : null}
                                    <br />
                                    <small className={classes.smallTitle}>{data.dkc != undefined ? data.dkc.dkcpraeses : null}: {data.dkc != undefined ? data.dkc.dkcpraesesnummer : null} / {data.dkc != undefined ? data.dkc.dkcpraesesemail : null}</small>
                                  </h4>
                                </Card>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={6}>
                                <Card plain>
                                  <GridItem xs={12} sm={12} md={12} className={classes.itemGrid}>
                                    <img src={data.dkc != undefined ? data.dkc.dkcquaestorfoto : null} alt="..." className={imageClasses} />
                                  </GridItem>
                                  <h4 className={classes.cardTitle}>
                                    {data != undefined ? data.praeses : null}
                                    <br />
                                    <small className={classes.smallTitle}>{data.dkc != undefined ? data.dkc.dkcquaestor : null}: {data.dkc != undefined ? data.dkc.dkcquaestornummer : null} / {data.dkc != undefined ? data.dkc.dkcquaestoremail : null}</small>
                                  </h4>
                                </Card>
                              </GridItem>
                            </GridContainer>
                          </div>
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 1",
                      tabIcon: Filter1,
                      tabContent: (
                        <p>
                          <h3>{vaps[0] != undefined ? vaps[0]["name"].toUpperCase() : null} VAP</h3>
                          {vaps[0] != undefined ? vaps[0]["description"] : null}
                          <br /><br />
                        De {vaps[0] != undefined ? vaps[0]["name"] : null} VAP zal plaatsvinden op {vaps[0] != undefined ? vaps[0]["date"] : null}.
                        <br />
                        Locatie: {vaps[0] != undefined ? vaps[0]["location"] : null}
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 2",
                      tabIcon: Filter2,
                      tabContent: (
                        <p>
                          <h3>{vaps[1] != undefined ? vaps[1]["name"].toUpperCase() : null} VAP</h3>
                          {vaps[1] != undefined ? vaps[1]["description"] : null}
                          <br /><br />
                        De {vaps[1] != undefined ? vaps[1]["name"] : null} zal dit jaar plaatsvinden op {vaps[1] != undefined ? vaps[1]["date"] : null}.
                        <br />
                        Locatie: {vaps[1] != undefined ? vaps[1]["location"] : null}
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 3",
                      tabIcon: Filter3,
                      tabContent: (
                        <p>
                          <h3>{vaps[2] != undefined ? vaps[2]["name"].toUpperCase() : null} VAP</h3>
                          {vaps[2] != undefined ? vaps[2]["description"] : null}
                          <br /><br />
                        De {vaps[2] != undefined ? vaps[2]["name"] : null} VAP zal dit jaar op {vaps[2] != undefined ? vaps[2]["date"] : null} plaatsvinden.
                        <br />
                        Locatie: {vaps[2] != undefined ? vaps[2]["location"] : null}
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 4",
                      tabIcon: Filter4,
                      tabContent: (
                        <p>
                          <h3>{vaps[3] != undefined ? vaps[3]["name"].toUpperCase() : null} VAP</h3>
                          {vaps[3] != undefined ? vaps[3]["description"] : null}
                          <br /><br />
                        De {vaps[3] != undefined ? vaps[3]["name"] : null} VAP zal dit jaar plaatsvinden op {vaps[3] != undefined ? vaps[3]["date"] : null}.
                        <br />
                        Locatie: {vaps[3] != undefined ? vaps[3]["location"] : null}
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 5",
                      tabIcon: Filter5Rounded,
                      tabContent:
                        <p>
                          <h3>{vaps[4] != undefined ? vaps[4]["name"].toUpperCase() : null} VAP</h3>
                          {vaps[4] != undefined ? vaps[4]["description"] : null}
                          <br /><br />
                          De {vaps[4] != undefined ? vaps[4]["name"] : null} VAP zal dit jaar plaatsvinden op {vaps[4] != undefined ? vaps[4]["date"] : null}.
                          <br />
                        Locatie: {vaps[4] != undefined ? vaps[4]["location"] : null}
                        </p>
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// <GridContainer justify="center">
//                           <GridItem xs={12} sm={12} md={4}>
//                             <img
//                               alt="..."
//                               src={work1}
//                               className={navImageClasses}
//                             />
//                             <img
//                               alt="..."
//                               src={work2}
//                               className={navImageClasses}
//                             />
//                             <img
//                               alt="..."
//                               src={work3}
//                               className={navImageClasses}
//                             />
//                           </GridItem>
//                           <GridItem xs={12} sm={12} md={4}>
//                             <img
//                               alt="..."
//                               src={work4}
//                               className={navImageClasses}
//                             />
//                             <img
//                               alt="..."
//                               src={work5}
//                               className={navImageClasses}
//                             />
//                           </GridItem>
//                         </GridContainer>
