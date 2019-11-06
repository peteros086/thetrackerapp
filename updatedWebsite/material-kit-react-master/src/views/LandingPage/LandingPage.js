import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import TraitSection from './Sections/TraitSection.js'
import ActivityPage from '../ActivityPage/ActivityPage.js'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  if(!varSet.loggedIn){
    setTimeout(function(){
      console.log(varSet.loggedIn);
      console.log('BACK TO LOGIN')
      props.history.replace('/')
      
    }, 200);
  }else if(!varSet.hasChosenTraits){
    return (
      <div>
        <Header
          color="transparent"
          //routes={dashboardRoutes}
          brand="Effective Team Dynamics"
          //rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>Welcome {varSet.visibleName}!</h1>
                <h4>
                  Every landing page needs a small description after the big bold
                  title, that{"'"}s why we added this text here. Add here all the
                  information that can make you or your product create the first
                  impression. 
                </h4>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>

          <TraitSection />

          {/*
            <ProductSection />
            <TeamSection />
            <WorkSection />
          */}

          </div>
        </div>
        <Footer />
      </div>
    );
  }else{
    return(
      <ActivityPage history={props.history}/>
    ) 
  }

}

LandingPage = observer(LandingPage)
