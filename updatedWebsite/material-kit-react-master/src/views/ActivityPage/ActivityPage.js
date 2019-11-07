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
  
  function createTabs(arrayElement){
        var placeHolder = {
              tabButton: arrayElement['name'],
              tabIcon: Camera,
              tabContent: (
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <h3>DESCRIPTION:</h3>
                      <p>
                        {arrayElement['description']}
                      </p>
                    <h3>NEEDS:</h3>
                      <p>
                        {arrayElement['needs']}
                      </p>
                    <h3>BRINGS:</h3>
                      <p>
                        {arrayElement['brings']}
                      </p>
                    <h3>HATES:</h3>
                      <p>
                        {arrayElement['hates']}
                      </p>
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
      <Header
        color="transparent"
        brand="Effective Team Dynamics"
        //rightLinks={<HeaderLinks />}
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
            <div className={classes.description}>
              <Button size='lg' color='info' onClick={() => varSet.resetTraits()}>
                Reset Traits
              </Button>
              <Button size='lg' color='info' onClick={() => onLogout()}>
                Logout
              </Button>
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
      <Footer />
    </div>
  );
}

ActivityPage = observer(ActivityPage)
