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

const useStyles = makeStyles(styles);

export default function BesturenPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [data, setData] = useState("");
  var bestuurData = []
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  var k = {name: "", praeses: "", quaestor: "", abactis: "", assessor: ""}
  
  function sortFunction(a, b) {
    if (a.seq_num === b.seq_num) {
        return 0;
    }
    else {
        return (a.seq_num > b.seq_num) ? -1 : 1;
    }
  }

  useEffect(() => {
    if(!data){
      getData();
    }
  }, []);

  async function getName(lid){
    if(lid != ""){
      if(lid.indexOf(';') == -1){
        const response = await API.graphql(graphqlOperation(getLeden, {id: lid}));
        const name = response.data.getLeden;
        return name.initials + " " + name.last_name;
      } else {
        var leden = lid.split(';')
        var returnName = ""
        for(var sublit in leden){
          const response = await API.graphql(graphqlOperation(getLeden, {id: leden[0]}));
          const name = response.data.getLeden;
          returnName += name.initials + " " + name.last_name + " / ";
        }
        return returnName.slice(0, -2)
      }
    }
  }

  const getData = async() => {
    const response = await API.graphql(graphqlOperation(listBesturens, {limit: 1000}));
    const besturenlist = response.data.listBesturens.items;
    besturenlist.sort(sortFunction)
    for(var i = 0; i < besturenlist.length; i++){
      let format = JSON.parse(JSON.stringify(k));
      var bestuur = besturenlist[i]
      format.name = bestuur.name;
      format.praeses = await getName(bestuur.praeses);
      format.quaestor = await getName(bestuur.quaestor);
      format.abactis = await getName(bestuur.abactis);
      format.assessor = await getName(bestuur.assessor);
      bestuurData.push(format);
    }
    setData(bestuurData);
  }

  return(
    <div>
      <Header
        absolute
        color="transparent"
        brand="Besturen"
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
                <h4><b>{el.name}</b></h4>
                - Praeses: {el.praeses}<br/>
                - Quaestor: {el.quaestor}<br/>
                - Abactis: {el.abactis}<br/>
                - Assessor: {el.assessor}<br/>
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
