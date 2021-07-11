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
import { Apps, ChangeHistory, CloudDownload, Face, Grade, PartyMode, PhotoAlbum, SupervisorAccount, Theaters } from "@material-ui/icons";

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
        <Button
          href="/dpb"
          color="transparent"
          className={classes.navLink}
        >
          <Theaters className={classes.icons} /> Delta Playback Show
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
      <Button
          href="/vap"
          color="transparent"
          className={classes.navLink}
        >
          <PartyMode className={classes.icons} /> VAP
          </Button>
      </ListItem>
      {new Date().getFullYear() % 5 == 0 ? <ListItem className={classes.listItem}>
        <Button
          href="/gala"
          color="transparent"
          className={classes.navLink}
        >
          <Grade className={classes.icons} /> Lustrumgala
        </Button>
      </ListItem> : null}
      <ListItem className={classes.listItem}>
        <Button
          href="/fotos"
          color="transparent"
          className={classes.navLink}
        >
          <PhotoAlbum className={classes.icons} /> Foto's
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
