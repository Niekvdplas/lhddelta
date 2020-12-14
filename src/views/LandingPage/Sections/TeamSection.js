import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import {listBesturens } from "graphql/queries";


// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "assets/img/faces/avatar.jpg";
import team2 from "assets/img/faces/christian.jpg";
import team3 from "assets/img/faces/kendall.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const [data, setData] = useState("");

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  useEffect(() => {
    if(!data){
      getData();
    }
  }, []);

  function sortFunction(a, b) {
    if (a.seq_num === b.seq_num) {
        return 0;
    }
    else {
        return (a.seq_num > b.seq_num) ? -1 : 1;
    }
  }

  const getData = async() => {
    const besturen = await API.graphql(graphqlOperation(listBesturens, {limit: 1000}));
    const besturenlist = besturen.data.listBesturens.items;
    besturenlist.sort(sortFunction)
    setData(besturenlist[0]);
  }

  
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Het h.t. zetelende {data != undefined ? data.name : null} </h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                {data != undefined ? data.praeses : null}
                <br />
                <small className={classes.smallTitle}>Praeses</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              {data != undefined ? data.quaestor : null}
                <br />
                <small className={classes.smallTitle}>Quaestor</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              {data != undefined ? data.abactis : null}
                <br />
                <small className={classes.smallTitle}>Ab-Actis</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
              {data != undefined ? data.assessor : null}
                <br />
                <small className={classes.smallTitle}>Assessor</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );

}
