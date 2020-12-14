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
      return (a.year > b.year) ? -1 : 1;
    }
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
              <br ></br>
              Op deze pagina vindt U meer informatie over het programma en aanwezigen van het lustrumgala op 23 mei 2020 in <a href="https://kasteeloudwassenaar.eu/virtuele-rondleiding/">kasteel Oud-Wassenaar te Wassenaar</a>. Klik <a href="https://docs.google.com/forms/d/e/1FAIpQLSf4jZpjkcNbYZXivK4bUgXrk2JFr_FbCJLqNw0eWiStZJV74Q/viewform" >hier</a> om U aan te melden voor het lustrumgala.
              </p>
            </div>
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
