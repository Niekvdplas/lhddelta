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

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { EmojiEvents, Filter1, Filter2, Filter3, Filter4, Filter5Outlined, Filter5Rounded, Group, GroupSharp, History, LocationCity, PlayArrow } from "@material-ui/icons";
import { listPlaybacks } from "graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listGalaAanwezigens } from "graphql/queries";
import { func } from "prop-types";

const useStyles = makeStyles(styles);

export default function GalaPage(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  function sortFunction(a, b) {
    if (a.year === b.year) {
      return 0;
    }
    else {
      return (a.year < b.year) ? -1 : 1;
    }
  }

  useEffect(() => {
    if (!data || data.link == "") {
      getData();
    }
  }, []);


  const getData = async () => {
    const response = await API.graphql(graphqlOperation(listGalaAanwezigens, { limit: 1000 }));
    const galalist = response.data.listGalaAanwezigens.items;
    galalist.sort(sortFunction)
    var k = { aanwezigen: [{ year: 0, names: [] }] }
    k.aanwezigen.pop()
    for (var i = 0; i < galalist.length; i++) {
      var galaEntry = galalist[i]
      k.aanwezigen.push({ year: galaEntry.year, names: galaEntry.names.split(";") })
    }
    setData(k);
  }

  return (
    <div id="test">
      <Header
        color="transparent"
        brand="Lustrumgala"
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
            <GridContainer justify="center" >
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div className={classes.name}>
                    <br /><br /><br />
                    <h3 className={classes.title}>Lustrumgala 2020</h3>
                  </div>
                  <div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Hooggeacht Erelid,
              <br /><br />
              Van harte proficiat met het 40-jarig bestaan van ons aller L.H.D. Delta! Al veertig jaar lang staat ons dispuut bekend als hét dispuut van Quintus, en niet zonder reden. Delta steekt met kop en schouders uit boven de rest en schittert eenzaam aan de top van de spreekwoordelijke apenrots.
              <br />

              Het jaar 2019-2020 zal in het teken staan van verscheidene activiteiten om het lustrum van ons dispuut op spectaculaire wijze te vieren. Eén van deze activiteiten is het lustrumgala, waar zowel oudere als jongere Deltanen samenkomen om geheel in Deltaanse stijl het dispuut haar veertigste verjaardag te beklinken.
              <br />

              Het doet mij deugd om U, namens de lustrumgalacommissie, uit te mogen nodigen voor het lustrumgala der L.H.D. Delta, om tezamen het glas te heffen op het veertigjarig bestaan van ons dispuut en dit tot in de late uurtjes van de nacht te vieren. Het lustrumgala zal plaatsvinden op 23 mei 2020, in Kasteel Oud-Wassenaar te Wassenaar. Nog geen twintig minuten verwijderd van Leiden, doch volledig afgesloten van de Randstad, waant elke Deltaan zich één nacht koning in deze 19e eeuwse villa.
              <br />

              De dresscode is White Tie, wat inhoudt dat verwacht wordt dat de Deltanen in rokkostuum op het gala zullen verschijnen. Voor vragen kunt U altijd contact opnemen met ondergetekende.
              <br />

              Hopende U op het lustrumgala te mogen treffen,
              <br /><br />


              Delendum,
              <br /><br />


              Namens de lustrumgalacommissie,
              <br /><br />

              Gabriël de Klerk – 06-12857917 – gztmdeklerk@hotmail.com
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs=
                  {[
                    {
                      tabButton: "Locatie",
                      tabIcon: LocationCity,
                      tabContent: (
                        <p>
                          Op deze pagina vindt U meer informatie over het programma en aanwezigen van het lustrumgala op 23 mei 2020 in <a href="https://kasteeloudwassenaar.eu/virtuele-rondleiding/">kasteel Oud-Wassenaar te Wassenaar</a>. Klik <a href="https://docs.google.com/forms/d/e/1FAIpQLSf4jZpjkcNbYZXivK4bUgXrk2JFr_FbCJLqNw0eWiStZJV74Q/viewform" >hier</a> om U aan te melden voor het lustrumgala.
                          <img src="https://takethehague.nl/thumbs/1600x800c/2017-06/kasteel-wassenaar-ext5.jpg" width="100%" />
                        </p>
                      )
                    },
                    {
                      tabButton: "Aanmeldingen",
                      tabIcon: GroupSharp,
                      tabContent: (
                        <p>
                          De aanmeldingsdeadline is 15 februari 2020! Tot nu toe hebben de volgende ereleden zich al aangemeld:
                          <GridContainer justify="center">
                            {data.aanwezigen != undefined ?
                              data.aanwezigen.map(el =>
                                <GridItem xs={6} sm={6} md={4} className={classes.navWrapper}>
                                  <b><h3>{el.year}</h3></b>
                                  {el.names.map(lid =>
                                    <li>{lid}</li>
                                  )}
                                </GridItem>)
                              : null}
                          </GridContainer>
                        </p>
                      )
                    },
                    {
                      tabButton: "Video",
                      tabIcon: PlayArrow,
                      tabContent: (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <ReactPlayer
                            url="https://www.youtube.com/watch?v=c45Q1ClXKR0"
                            playing={false}
                            volume={0.15}
                          />
                        </div>
                      )
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

