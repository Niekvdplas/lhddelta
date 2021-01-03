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

const useStyles = makeStyles(styles);

export default function VapPage(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
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
                          <h3>TIROLER VAP</h3>
                          De Bier und Bratwurst VAP is gebaseerd en geïnspireerd op de feesten van onze Duitssprekende en lederhosen dragende vrienden. Kom allen verkleed in Tiroler-outfit en zing mee met Duitse schlagers om vervolgens traditioneel Duitse bierspellen te spelen!
                          <br /><br />
                        Deze zal plaatsvinden op 12 september in de Singelzaal te Quintus.
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 2",
                      tabIcon: Filter2,
                      tabContent: (
                        <p>
                          <h3>AMERICAN FRATPARTY VAP</h3>
                          De American Fratparty is een jaarlijkse traditie van L.H.D. Delta. Ieder jaar wordt, samen met de mooie dames van Vampierelles, bierpong gespeeld, keg stands gedaan & hard gefeest, volledig in Amerikaanse stijl. Kom gekleed in je American Football tenue of je fratboy kleding en party mee.
                          <br /><br />
                        De Fratparty zal dit jaar plaatsvinden op 15 september en zal op Hooigracht 13 zijn.
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 3",
                      tabIcon: Filter3,
                      tabContent: (
                        <p>
                          <h3>SCHILDER EEN DAME VAP</h3>
                          Ooit werd Delta na een lange dag varen over de Amsterdamse grachten met het Augustijnse damesdispuut All’ure, omschreven als “simpele gasten”. Om te laten zien dat Delta veel meer dan dat is zal dit jaar de Schilder een Dame VAP haar primeur doen. Maak kennis met het vernuft van de leden in het restaurant van Quintus, waarna de prachtige Victoria’s Secret modellen nog eens beter bekeken zullen worden uiteraard onder het genot van een biertje.
                          <br /><br />
                        De Schilder een Dame VAP zal dit jaar op 18 september plaatsvinden.
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 4",
                      tabIcon: Filter4,
                      tabContent: (
                        <p>
                          <h3>BBQ VAP</h3>

                          Kom lekker een satétje, worstje of hamburger eten op de Delta BBQ VAP, dit alles onder genot van het gouden godenvocht dat ons studentenleven tekent. Een mooie VAP om Deltanen eens goed te spreken en leren kennen.
                          <br /><br />
                        De BBQ VAP zal dit jaar plaatsvinden op 23 september.
                        </p>
                      )
                    },
                    {
                      tabButton: "VAP 5",
                      tabIcon: Filter5Rounded,
                      tabContent:
                        <p>
                          <h3>TRADITIONES VAP</h3>
                          Delta is een van de oudste disputen van Quintus, opgericht in 1979. Het kan dan haast ook niet anders dan dat het dispuut vele tradities rijk is. Tijdens de Traditiones VAP zul je alle tradities van L.H.D. Delta leren kennen, kom daarom ook traditioneel in jasje-dasje gekleed.
                          <br />
                          Delendum Est Longae Traditiones Animo !
                          <br /><br />
                          De Traditiones VAP zal dit jaar plaatsvinden op 26 september.
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
