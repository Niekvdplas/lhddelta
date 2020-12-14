/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, ChangeHistory, CloudDownload, Face, PartyMode, SupervisorAccount } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          href="/"
          color="transparent"
          className={classes.navLink}
        >
          <ChangeHistory className={classes.icons} /> L.H.D. Delta
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/Leden"
          color="transparent"
          className={classes.navLink}
        >
          <Face className={classes.icons} /> Leden
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/Besturen"
          color="transparent"
          className={classes.navLink}
        >
          <SupervisorAccount className={classes.icons} /> Besturen
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Delta Playback Show"
          buttonProps={{
            href: "/dpb",
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/geschiedenis" className={classes.dropdownLink}>
              Geschiedenis
            </Link>,
            <Link to="/winnaars" className={classes.dropdownLink}>
              Winnaars
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="VAP"
          buttonProps={{
            href: "/vap",
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/dkc" className={classes.dropdownLink}>
              DKC
            </Link>,
            <Link to="/tiroler" className={classes.dropdownLink}>
              Tiroler VAP
            </Link>,
            <Link to="/frat" className={classes.dropdownLink}>
              American Fratpary VAP
            </Link>,
            <Link to="/victoria" className={classes.dropdownLink}>
              Victoria's Secret VAP
            </Link>,            
            <Link to="/bbq" className={classes.dropdownLink}>
              BBQ VAP
            </Link>,
            <Link to="/traditiones" className={classes.dropdownLink}>
              Traditiones VAP
            </Link> 
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="/gala"
          color="transparent"
          className={classes.navLink}
        >
          <PartyMode className={classes.icons} /> Lustrumgala
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Volg ons op instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/lhd_delta/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
