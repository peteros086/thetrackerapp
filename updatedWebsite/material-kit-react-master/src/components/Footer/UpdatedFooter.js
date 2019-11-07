/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import Button from "components/CustomButtons/Button.js";


const useStyles = makeStyles(styles);

export default function UpdatedFooter(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  function anotherOnLogout(){
    varSet.logoutFunc()
    setTimeout(function(){
      console.log(varSet.loggedIn);
      props.history.replace('/')
    }, 200);
  }

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Button size='sm' color='transparent' onClick={() => varSet.resetTraits()}>
                Reset Traits
              </Button>

            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Button size='sm' color='transparent' onClick={() => anotherOnLogout()}>
                Logout
              </Button>
            </ListItem>
          {/*
            <ListItem className={classes.inlineBlock}>
              <a
                onClick={() => varSet.resetTraits()}
                className={classes.block}
                target="_blank"
              >
                Licenses
              </a>
            </ListItem>
          */}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} ,  Effective Team Dynamics
        </div>
      </div>
    </footer>
  );
}

UpdatedFooter.propTypes = {
  whiteFont: PropTypes.bool
};

UpdatedFooter = observer(UpdatedFooter)
