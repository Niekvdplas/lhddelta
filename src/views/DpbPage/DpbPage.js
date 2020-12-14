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
import { EmojiEvents, History } from "@material-ui/icons";
import { listPlaybacks } from "graphql/queries";
import Amplify, { API, graphqlOperation } from 'aws-amplify';

const useStyles = makeStyles(styles);

export default function DpbPage(props) {
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
      if(k.link == "" && playbackEntry.link != ""){
        k.link = playbackEntry.link
      }
      if(playbackEntry.cancelled == 'y') playbackEntry.winner = "Afgelast"
      k.pblist.push({year: playbackEntry.year, winner: playbackEntry.winner})
    }
    setData(k);
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
                    url={data.link == "" ? null : data.link}
                    playing={false}
                    volume={0.15}
                  />
                </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
              Elk jaar wordt er bij onze manifestatie, de Playbackshow, een filmpje gemaakt. Dit filmpje is speciaal gemaakt voor de laatste editie van onze show.
              </p>
            </div>
            <GridContainer justify="center">
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
                        In 1980 organiseerde het Leidsch Heerendispuut Delta voor de eerste keer het Delta Playbackfestival, toentertijd nog op de toenmalige sociëteit van de Algemene Leidsche Studentenvereniging Quintus, te weten in het oud Katholiek Militair Tehuis aan de Korte Mare. De Playback was een feit en zou elk jaar garant gaan staan voor een waar spektakel. Terwijl met de jaren de populariteit groeide werd al gauw duidelijk dat de sociëteit van Quintus te klein was voor een evenement zo groots als de Playback, daarom werd al in het derde jaar (1982) uitgeweken naar het Antonius-clubhuis aan de Lange Mare. In 1984 werd daar de beker als bewijs van de overwinning op het Playbackfestival overschaduwd door een bij nader inzien overschatte bonus: deelname aan Hennie Huismans slappe aftreksel van het origineel. De winnaar van dat jaar (Olympus) zag echter in dat hun winnende (kanibalen-doenblanke-in-de-kookpot) act viagra sans ordonnance in alle waarschijnlijkheid niet begrepen zou worden door het K.R.O.- publiek en daarom reisde een Delta-afvaardiging af naar Hilversum om daar Delta’s eerste Dispuutsact (1980: Non, non rien n’a changé – Les Poppies) opnieuw op te voeren. De ondankbaarheid voor het verzinnen van zijn show liet Huisman na afloop blijken door middel van een betekenisloos K.R.O.-vaantje. Toen in 1986 het Antonius-clubhuis voor de inmiddels meer dan 800 toeschouwers ook te klein werd, werd de Playback in 1987 voor het eerst in de Stadsgehoorzaal aan de Breestraat georganiseerd. De Stadsgehoorzaal is sindsdien vrijwel de vaste locatie geworden van het Delta Playbackfestival, maar er zijn ook jaren geweest waarin de Playback is uitgeweken naar het Universitair Sportcentrum en de Leidse Schouwburg. Niet alleen het aantal toeschouwers heeft de geschiedenis van het Delta Playbackfestival bepaald. Ook deelneming aan de Playback is een bepalende factor geweest, omdat dit voor veel mensen al gauw een mogelijkheid werd om door heel Quintus bewonderd te worden. Zodoende werd, tevens in 1987 voor het eerst, vooraf een loting gehouden. Uren tevoren drongen respectabele Quinten in een rij in de hoop een plaatsje in het programma te mogen vullen. Het dobbelspel dat daarna binnenskamers volgde als loting wekte echter om onbegrijpelijke redenen de indruk dat wij, Heeren bekend staand als ideale schoonzonen, ons zouden verlagen tot het beslissen over deelname, van mensen die uren voor ons in de rij hebben gestaan, op volstrekt irrelevante gronden. In 1989 wilde dispuut Tangram om die schijnreden (in alle waarschijnlijkheid wilden ze simpelweg een graantje meepikken met ons succes), een (zo mogelijk nog) eerlijkere loting organiseren voor de DELTA Playback. Hoe het Tangram daarna vergaan is lijkt ons een lichtend voorbeeld voor anderen die zich in Deltaanse zaken willen mengen. In 1991 zag Delta echter toch in dat zelfs de schijn van machtsmisbruik negatief kan zijn voor het imago en daarom besloot Delta om een openbare loting te gaan hanteren waarbij de Voorzitter van Quintus en Praeses van Delta beurtelings een briefje met daarop de naam van een dispuut uit een hoge hoed halen. Vermelding dient plaats te vinden van het dispuut Aquavite, dat in 1998 én 1999 tot winnaar van het Delta Playbackfestival werd uitgeroepen en daarmee het eerste dispuut is dat het Delta Playbackfestival twee jaar op rij won. Dit kunstje is in de jaren 2012 en 2013 herhaald door vrouwen dispuut La Bohémienne. Tevens zijn het deze twee disputen die het vaakst winnaar zijn geworden van het Delta Playbackfestival, te weten 6 keer tot op heden. 
        Over de jaren heen zijn er vele tradities ontstaan rondom de Playback. Zo is er ter verzekering van hoogstaande kwaliteit van de acts van de deelnemers een winnaarsregeling, waarbij het dispuut dat zich de winnaar mag noemen het jaar erop volgend niet deel hoeft te nemen aan de loting. Ook doen er tegenwoordig slechts disputen mee aan de loting (i.p.v. individuele deelnemers), voert het Quintus-bestuur ook elk jaar een act op en wordt op het moment waarop de jury zich terugtrekt voor het beraad een act opgevoerd door de sjaarzen van Delta (vaak om alleen maar na een minuut voortijdig het gordijn te kunnen zien sluiten en weken oefening slechts te doen resulteren in enkele beduusde gezichten). Verder is er elk jaar naast de wisselbokaal een Bertolli-prijs en een spekjesprijs, respectievelijk als aanmoediging om de volgende keer beter-je-best-te-doen en als ‘speciale’ beloning voor iets heel grappigs of iets dat juist heel gênant was. Gezien de animo die er is voor deelname en door de winnaarregeling trekken de deelnemende disputen jaar in jaar uit alles uit de kast (of in het geval van één specifiek dispuut, slechts ‘uit’). Toch is het nooit zeker of dit genoeg is. De acts worden namelijk beoordeeld door een vakkundige jury gevormd door de oud-praesides van het Leidsch Heerendispuut Delta. Deze Heeren, die met de rest van de Deltanen de eerste rijen vullen, worden niet altijd begrepen door het publiek in hun illustere beweegredenen. Echter, wij willen erop wijzen dat het deze Heeren zijn die zowel een voorkeurspositie genieten in de zaal als een voorkeurspositie genieten die komt met het vormen van een Delta-jury die een Delta-prijs uit mag reiken op een Delta-feestje. Het Delta Playbackfestival is over de jaren een begrip geworden in de Leidse studentenwereld en belooft elk jaar weer een avond te worden vol studentikoze ludiciteit. Wij van het Leidsch Heerendispuut Delta hopen ook dit jaar weer een succesvolle Playback neer te zetten. .{" "}
                      </p>
                      )
                    },
                    {
                      tabButton: "Winnaars",
                      tabIcon: EmojiEvents,
                      tabContent:
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20 }}>
                          {data.pblist != undefined ? 
                          data.pblist.map(el => 
                            <div><li>{el.year} {el.winner}</li></div>)
                          : null}
                        </div>
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
