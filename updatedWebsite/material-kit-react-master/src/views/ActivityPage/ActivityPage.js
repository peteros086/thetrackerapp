import React from "react";
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

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";



const useStyles = makeStyles(styles);

export default function ActivityPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  function onLogout(){
    varSet.logoutFunc()
    setTimeout(function(){
      console.log(varSet.loggedIn);
      props.history.replace('/')
    }, 200);
  }

  function goToPersonalValuePage(){
    varSet.activityPage = 'personalValues'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToTeamContributionPage(){
    varSet.activityPage = 'teamContribution'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToPersonalEnergizersPage(){
    varSet.activityPage = 'personalEnergizers'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToWhoAmIPage(){
    varSet.activityPage = 'myMindSet1'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }
  
  function createTabs(arrayElement){
        var placeHolder = {
              tabButton: arrayElement['name'],
              tabIcon: Camera,
              tabContent: (
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <h3 className={classes.title}>DESCRIPTION:</h3>
                      <h6>
                        {arrayElement['description']}
                      </h6>
                    <h3 className={classes.title}>NEEDS:</h3>
                      <h6>
                        {arrayElement['needs']}
                      </h6>
                    <h3 className={classes.title}>BRINGS:</h3>
                      <h6>
                        {arrayElement['brings']}
                      </h6>
                    <h3 className={classes.title}>HATES:</h3>
                      <h6>
                        {arrayElement['hates']}
                      </h6>
                  </GridItem>
                </GridContainer>
              )
          }
        console.log(placeHolder)
    return placeHolder
  }

  var asdf = varSet.traitsWithDescriptions.map(createTabs)

  return (
    <div>
        <Parallax small filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
          </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <div className={classes.description}>

              <Button size='lg' color='info' onClick={() => goToPersonalValuePage()}>
              Personal Values (I Hate section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToTeamContributionPage()}>
                Team Contribution (I Bring section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToPersonalEnergizersPage()}>
                Personal Energizers (I Need section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToWhoAmIPage()}>
                WHO AM I ACTIVITY
              </Button>
              <br />

          {/*
              <Button size='lg' color='info' onClick={() => varSet.resetTraits()}>
                Reset Traits
              </Button>
              <Button size='lg' color='info' onClick={() => onLogout()}>
                Logout
              </Button>
          */}
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={
                    asdf
                  }
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <UpdatedFooter history={props.history}/>
    </div>
  );
}

ActivityPage = observer(ActivityPage)
