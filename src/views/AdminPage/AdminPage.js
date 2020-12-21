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
import { Cake, EmailOutlined, EmojiEvents, Face, Grade, Group, History, Phone, PlusOne, PublishRounded, Theaters } from "@material-ui/icons";
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

const useStyles = makeStyles(styles);

export default function AdminPage(props) {

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [ledenList, setledenList] = useState([{ firstname: "", lastname: "", initials: "" }]);
  const [bestuur, setBestuur] = useState({id: uuidv4(), name: "", praeses: "", quaestor: "", abactis: "", assessor: "", seq_num: new Date().getFullYear() - 1979});
  const [dkc, setDKC] = useState({id: "d1b3e65a-fde3-44f3-b327-afeeba41e8b7", dkcpraeses: "", dkcquaestor: "", dkcpraesesemail: "", dkcquaestoremail: "", dkcpraesesnummer: "", dkcquaestornummer: ""});
  const [year, setYear] = useState(0);
  const [jarenlist, setjarenlist] = useState([])
  const [jaarleden, setjaarleden] = useState([])
  const [loginpw, setloginpw] = useState("")
  const [galayear, setgalayear] = useState(0)
  const [galaattendee, setgalaattandee] = useState("")
  const [dpbwinner, setdpbwinner] = useState("")


  var newLid = {id: "", last_name: "", full_name: "", initials: ""}
  var newYear = {id: "", members: "", year: "", name: "sjaerzen"}

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function authenticate(){
    return crypto.createHash('sha512').update(loginpw).digest('hex') == "f35e81da596808cc91e3504818515b2a7d800edb8f168c6e3251fb0fd22b5c373b099629a4c3091e07717174ecb6772ace8100b9b39f422ee5003ab0ba9b9866"
  }

  const handleInputChange = (e, place, index) => {
    if(place != "year"){
      const { name, value } = e.target;
      const list = [...ledenList];
      list[index][place] = value;
      setledenList(list);
    } else {
      setYear(index);
    }
  };

  const getJaren = async() => {
    const jaren = await API.graphql(graphqlOperation(listJarens));
    const jarenlijst = jaren.data.listJarens.items;
    setjarenlist(jarenlijst);
  }

  const handleBestuurchange = (e, index) => {
    const { name, value } = e.target;
    const best = bestuur;
    best[index] = value;
    setBestuur(best);
  };

  const handleDKCchange = (e, index) => {
    const {name, value} = e.target;
    const dkcbestuur = dkc;
    dkcbestuur[index] = value;
    setDKC(dkcbestuur)
  }
   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...ledenList];
    list.splice(index, 1);
    setledenList(list);
  };
   
  // handle click event of the Add button
  const handleAddClick = () => {
    setledenList([...ledenList, { firstname: "", lastname: "", initials: "" }]);
  };

  const postBestuur = async () => {
    if(authenticate){
      const post = await API.graphql(graphqlOperation(createBesturen, {input: bestuur}));
      window.location.href = '../';
    }
  }

  const updateDKC = async () => {
    if(authenticate){
      const update = await API.graphql(graphqlOperation(updateOverig, {input: dkc}));
      window.location.href = '../';
    }
  }


  const handleJaarchange = (e, index) => {
    const { name, value } = e.target;
    const best = jaarleden;
    jaarleden.members[index] = value;
    setBestuur(jaarleden);
  };

  const getYear = async () => {
    getJaren()
    for (var i in jarenlist) {
      if(jarenlist[i].year == year){
        var lijstje = jarenlist[i].members.split(';')
        lijstje.pop()
        jarenlist[i].members = lijstje;
        setjaarleden(jarenlist[i])
        return;
      }
    }
  }

  const postGalaAttendee = async () => {
    if(authenticate){
      const yearattendees = await API.graphql(graphqlOperation(listGalaAanwezigens));
      const listyears = yearattendees.data.listGalaAanwezigens.items;
      var visited = false;
      var replace = false;
      for(var i = 0; i < listyears.length; i++){
        if(listyears[i].year == galayear){
          visited = true;
          var members = listyears[i].names.split(';');
          for(var x = 0; x < members.length; x++){
            if(members[x] == galaattendee){
              replace = true
              members.splice(x, 1)
            }
          }
          if(replace == false){
            members.push(galaattendee);
          }
          listyears[i].names = getMemberString(members).slice(0, -1);
          delete listyears[i].createdAt
          delete listyears[i].updatedAt
          const update = await API.graphql(graphqlOperation(updateGalaAanwezigen, {input: listyears[i]}))
        }
      }
      if(visited == false){
        var k = {id: uuidv4(), names: galaattendee, year: galayear}
        const post = await API.graphql(graphqlOperation(createGalaAanwezigen, {input: k}))
      }
      window.location.href = '../';
    }
  }

  const postwinner = async() => {
    if(authenticate){
      var cancelled = 'f'
      if(dpbwinner == 'afgelast'){
        cancelled = 't'
      }
      const post = await API.graphql(graphqlOperation(createPlayback, {input: {id: uuidv4(), cancelled: cancelled, winner: dpbwinner, year: new Date().getFullYear()}}))
      window.location.href = '../';
    }
  }

  function getMemberString(members){
    var returnstring = ""
    for(var i = 0; i < members.length; i++){
      returnstring += members[i] + ";"
    }
    return returnstring
  }

  const updateYear = async () => {
    if(authenticate){
      jaarleden.members = getMemberString(jaarleden.members)
      delete jaarleden.createdAt
      delete jaarleden.updatedAt
      const update = await API.graphql(graphqlOperation(updateJaren, {input: jaarleden}));
      window.location.href = '../';
    }
  }
  
  const postYear = async () => {
    if(authenticate()){
      var memberstring = ""
      for(var i = 0; i < ledenList.length; i++){
        var lid = newLid;
        lid.full_name = ledenList[i].firstname
        lid.last_name = ledenList[i].lastname
        lid.initials = ledenList[i].initials
        lid.id = uuidv4();
        memberstring += lid.initials + " " + lid.last_name + " (" + lid.full_name + ");"
        const postLid = await API.graphql(graphqlOperation(createLeden, {input: lid}))
      }
      newYear.id = uuidv4();
      newYear.members = memberstring;
      newYear.year = year;
      const postnewYear = await API.graphql(graphqlOperation(createJaren, {input: newYear}))
      window.location.href = '../';
    }
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Update data"
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
          <CustomInput onChange={e => setloginpw(e.target.value)}></CustomInput>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimaton]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Update data</h4>
                  </CardHeader>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Nieuw Jaar",
                        tabIcon: PlusOne,
                        tabContent: (
                          <GridItem>
                            <CardBody>
                            <CustomInput
                                labelText="Welk jaar toegelaten(Ex. 2017)"
                                id="year"
                                onChange={e => handleInputChange(e, "year", e.target.value)}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Cake className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                              {ledenList.map((x, i) => {
                                return <div>
                                <CustomInput
                                  labelText="Voor/Roepnaam"
                                  name="firstname"
                                  value = {x.firstname}
                                  onChange={e => handleInputChange(e, "firstname", i)}
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "text",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Face className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                <CustomInput
                                  labelText="Volledige achternaam"
                                  name="lastname"
                                  value = {x.lastname}
                                  onChange={e => handleInputChange(e, "lastname", i)}
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "text",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Face className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                <CustomInput
                                  labelText="Initialen"
                                  name="initials"
                                  value = {x.initials}
                                  onChange={e => handleInputChange(e, "initials", i)}
                                  formControlProps={{
                                    fullWidth: true
                                  }}
                                  inputProps={{
                                    type: "text",
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Face className={classes.inputIconsColor} />
                                      </InputAdornment>
                                    )
                                  }}
                                />
                                {ledenList.length !== 1 && <button className="mr10" onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {ledenList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                                </div>     
                                })}
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                              <Button simple color="primary" size="lg" onClick={postYear}>
                                Zend nieuw jaar
                              </Button>
                            </CardFooter>
                          </GridItem>
                        )
                      },
                      {
                        tabButton: "Nieuw Bestuur",
                        tabIcon: Group,
                        tabContent:
                          <GridItem>
                            <CardBody>
                              <CustomInput
                                labelText="Naam(ex. XXXIVste Bestuur Heunen)"
                                id="name"
                                onChange={e => handleBestuurchange(e, "name")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <People className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                                                            <CustomInput
                                labelText="Praeses(ex. G.A. Heunen)"
                                id="praeses"
                                onChange={e => handleBestuurchange(e, "praeses")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Face>
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Quaestor"
                                id="quaestor"
                                onChange={e => handleBestuurchange(e, "quaestor")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Abactis"
                                id="abactis"
                                onChange={e => handleBestuurchange(e, "abactis")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Face>
                                    </InputAdornment>
                                  )
                                }}
                              />
                                                            <CustomInput
                                labelText="Assessor"
                                id="assessor"
                                onChange={e => handleBestuurchange(e, "assessor")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Face>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                              <Button simple color="primary" size="lg" onClick={postBestuur}>
                                Zend nieuw bestuur.
                              </Button>
                            </CardFooter>
                          </GridItem>
                      },
                      {
                        tabButton: "Nieuwe DKC",
                        tabIcon: Group,
                        tabContent:
                          <GridItem>
                            <CardBody>
                            <CustomInput
                                labelText="Praeses"
                                id="praeses"
                                onChange={e => handleDKCchange(e, "dkcpraeses")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Face>
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Praeses email"
                                id="dkcpraesesemail"
                                onChange={e => handleDKCchange(e, "dkcpraesesemail")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Email className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Praeses nummer"
                                id="dkcpraesesnummer"
                                onChange={e => handleDKCchange(e, "dkcpraesesnummer")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Phone className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Phone>
                                    </InputAdornment>
                                  )
                                }}
                              />
                                                                                        <CustomInput
                                labelText="Quaestor"
                                id="quaestor"
                                onChange={e => handleDKCchange(e, "dkcquaestor")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Face className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Face>
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Quaestor email"
                                id="dkcquaestoremail"
                                onChange={e => handleDKCchange(e, "dkcquaestoremail")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Email className={classes.inputIconsColor} />
                                    </InputAdornment>
                                  )
                                }}
                              />
                              <CustomInput
                                labelText="Quaestor nummer"
                                id="dkcquaestornummer"
                                onChange={e => handleDKCchange(e, "dkcquaestornummer")}
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  type: "text",
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Phone className={classes.inputIconsColor}>
                                        lock_outline
                                                  </Phone>
                                    </InputAdornment>
                                  )
                                }}
                              />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                              <Button simple color="primary" size="lg" onClick={updateDKC}>
                                Zend nieuw DKC.
                              </Button>
                            </CardFooter>
                          </GridItem>
                      },
                      {
                        tabButton: "Verander jaar",
                        tabIcon: PublishRounded,
                        tabContent:
                        <div>
                          <CustomInput id="year" onChange={e => handleInputChange(e, "year", e.target.value)}></CustomInput>
                          <Button onClick={getYear}>
                            Haal jaar op.
                          </Button>
                          {jaarleden.members != undefined ? 
                          jaarleden.members.map((x, i) => 
                            <CustomInput id={i} labelText={x} onChange={e => handleJaarchange(e, i)}></CustomInput>
                          )
                          : null}
                          <Button onClick={updateYear}>Update jaar</Button>
                        </div>
                      },
                      
                      {
                        tabButton: "Update gala",
                        tabIcon: Grade,
                        tabContent:
                        <div>
                          <CustomInput labelText="jaar" onChange={e => setgalayear(e.target.value)}></CustomInput>
                          <CustomInput labelText="achternaam" onChange={e => setgalaattandee(e.target.value)}></CustomInput>
                          <Button onClick={postGalaAttendee}>Voeg lid toe / Verwijder lid</Button>
                        </div>
                      },
                      {
                        tabButton: "nieuwe DPB winnaar",
                        tabIcon: Theaters,
                        tabContent:
                        <div>
                          <CustomInput labelText="winnaar" onChange={e => setdpbwinner(e.target.value)}></CustomInput>
                          <Button onClick={postwinner}>Voeg nieuwe winnaar toe</Button>
                        </div>
                      }
                    ]}
                  />
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
