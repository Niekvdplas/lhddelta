import React, { useState } from "react";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import crypto from "crypto"
import NavPills from "components/NavPills/NavPills.js";
import { Cake, EmailOutlined, EmojiEvents, Face, Grade, Group, History, Phone, PhotoAlbum, PlusOne, PublishRounded, Theaters } from "@material-ui/icons";
import {v4 as uuidv4 } from 'uuid';




import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { API, graphqlOperation } from "aws-amplify";
import { listJarens } from "graphql/queries";
import { updateJaren } from "graphql/mutations";
import { createBesturen } from "graphql/mutations";
import { createLeden } from "graphql/mutations";
import { createJaren } from "graphql/mutations";
import { listGalaAanwezigens } from "graphql/queries";
import { bool } from "prop-types";
import { updateGalaAanwezigen } from "graphql/mutations";
import { createGalaAanwezigen } from "graphql/mutations";
import { createPlayback } from "graphql/mutations";
import { updateOverig } from "graphql/mutations";
import { Storage } from 'aws-amplify';
import ImageGallery from 'react-image-gallery';

const useStyles = makeStyles(styles);

export default function PhotoPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [images, setImages] = React.useState([{original:"", thumbnail:""}]);

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  
  async function listResult() {
    var res = []
    await Storage.list('', {level: 'public'})
    .then(async (result) => {
    for(var i = 0; i < result.length; i++){
      if(result[i].key.includes('-')){
        res.push(result[i])
      }
    }}
    )
    .catch(err => console.log("err"));

    for(var i = 0; i < res.length; i++){
      res[i] = {original: "https://lhddeltas3152449-staging.s3.eu-west-2.amazonaws.com/public/" + res[i].key, thumbnail: "https://lhddeltas3152449-staging.s3.eu-west-2.amazonaws.com/public/" + res[i].key}
    }
    setImages(res)
  }

  listResult();

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Foto's"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <ImageGallery items={images} />
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
