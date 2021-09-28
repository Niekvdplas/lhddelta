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
import InstagramEmbed from 'react-instagram-embed';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { EmojiEvents, History } from "@material-ui/icons";
import { listPlaybacks } from "graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listPbss } from "graphql/queries";

const useStyles = makeStyles(styles);

export default function DpbPage(props) {
  const classes = useStyles();
  const [data, setData] = useState("");
  const [pb, setPb] = useState("");
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
        return (a.year > b.year) ? -1 : 1;
    }
  }

  useEffect(() => {
    if(!data || data.link == ""){
      getData();
    }
  }, []);

  const getData = async() => {
    const response = await API.graphql(graphqlOperation(listPlaybacks, {limit: 1000}));
    const playbacklist = response.data.listPlaybacks.items;
    playbacklist.sort(sortFunction)
    var k = {link: "", pblist: [{year: 0, winner: ""}]}
    k.pblist.pop()
    for(var i = 0; i < playbacklist.length; i++){
      var playbackEntry = playbacklist[i]
      if(playbackEntry.cancelled == 'y') playbackEntry.winner = "Afgelast"
      k.pblist.push({year: playbackEntry.year, winner: playbackEntry.winner})
    }
    setData(k);
    const responsepb = await API.graphql(graphqlOperation(listPbss, { limit: 1, order: [['created_at', 'DESC']] }));
    setPb(responsepb.data.listPbss.items[0]);
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Delta Playback Show"
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
                    <h3 className={classes.title}>Delta Playback Show</h3>
                  </div>
                  <div>
                  <ReactPlayer
                    url={pb.movieurl == "" ? null : pb.movieurl}
                    playing={false}
                    volume={0.15}
                    width="100%"
                  />
                </div>
                </div>
              </GridItem>
            <div className={classes.description}>
              <p>
              Elk jaar wordt er bij onze manifestatie, de Playbackshow, een filmpje gemaakt. Dit filmpje is speciaal gemaakt voor de editie van onze show in {!pb ? null : pb.movieyear}.
              <br />
              Dit jaar wordt de Delta Playbackshow gehouden op {!pb ? null : pb.date} bij {!pb ? null : pb.location}.
              </p>
            </div>
            </GridContainer>

            <GridContainer justify="center" id="test">
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Geschiedenis",
                      tabIcon: History,
                      tabContent: (
                        <p>
                          {!pb ? null : pb.history}
                        </p>
                      )
                    },
                    {
                      tabButton: "Winnaars",
                      tabIcon: EmojiEvents,
                      tabContent:
                      <GridContainer justify="center">
                          {data.pblist != undefined ? 
                          data.pblist.map(el => 
                            <GridItem xs={6} sm={6} md={4} className={classes.navWrapper}><b><h3>{el.year}</h3></b><br /><h5>{el.winner}</h5></GridItem>)
                          : null}
                        </GridContainer>
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
