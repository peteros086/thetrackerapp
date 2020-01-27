import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import TraitSection from './Sections/TraitSection.js'
import ActivityPage from '../ActivityPage/ActivityPage.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;


  if(!varSet.loggedIn){
    setTimeout(function(){
      props.history.replace('/')
    }, 200);
  }else if(!varSet.hasChosenTraits){
    return (
      <div>

        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Select Your 5 Traits </h1>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <TraitSection />
          </div>
        </div>
        <UpdatedFooter history={props.history}/>
      </div>
    );
  }else{
    return(
      <ActivityPage history={props.history}/>
    ) 
  }
}

LandingPage = observer(LandingPage)
