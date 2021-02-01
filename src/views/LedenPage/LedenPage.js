import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listLedens, listBesturens, getLeden } from "graphql/queries";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";
import { formatDiagnostic } from "typescript";
import { listJarens } from "graphql/queries";

const useStyles = makeStyles(styles);

export default function LedenPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [data, setData] = useState("");
  var bestuurData = []
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function sortFunction(a, b) {
    if (a.year === b.year) {
      return 0;
    }
    else {
      return (a.year > b.year) ? -1 : 1;
    }
  }

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, []);

  const getData = async () => {
    const response = await API.graphql(graphqlOperation(listJarens, { limit: 1000 }));
    const besturenlist = response.data.listJarens.items;
    besturenlist.sort(sortFunction)
    var jarenGeweest = []
    var incidences = 0;
    var flag = false;
    for (var i = 0; i < besturenlist.length; i++) {
      var jaar = besturenlist[i]
      if(jarenGeweest.includes(jaar.year)){
        console.log(jarenGeweest.indexOf(jaar.year));
        console.log(bestuurData)
        bestuurData[jarenGeweest.indexOf(jaar.year) + incidences].year += "-I"
        incidences += 1
        jaar.year += "-II"
        flag = true
      } else {
        jarenGeweest.push(jaar.year)
      }
      if(flag){
        var switchelem = bestuurData.pop();
        bestuurData.push(jaar);
        bestuurData.push(switchelem);
        flag = false
      } else{
        bestuurData.push(jaar);
      }
    }
    setData(bestuurData);
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Leden"
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
          <GridContainer justify="center">
            {data != undefined ? Array.from(data).map(el =>
              <GridItem xs={12} sm={12} md={4} >
                <Card className={classes[cardAnimaton]}>
                  <center>
                    <h4><b>{el.year}</b></h4>
                    <h4><b>{el.name}</b></h4>
                    {Array.from(el.members.split(';')).map(lid =>
                      <h4>{lid}</h4>
                    )}
                  </center>
                </Card>
              </GridItem>) : null}
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );

}


{/* <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes[cardAnimaton]}>
                    test
                    fdsa
                    asd
                    asdf
                    sadf
                  </Card>
                </GridItem>
              </GridContainer> */}
