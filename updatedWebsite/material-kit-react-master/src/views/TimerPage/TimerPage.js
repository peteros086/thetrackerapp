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



//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";
import NewHeader from 'components/NewHeader/NewHeader.js';


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function TimerPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function backToLast(){
    varSet.goToTimerPage = false
  }

  var cTime = 30

  function countdown(){
    var tempTime = 31
    cTime = tempTime
    let timer = setInterval(() => { 
      tempTime = tempTime -1
      console.log('*********')
      console.log(tempTime)
      cTime = tempTime
      console.log(cTime)
      varSet.currentTime = cTime
      console.log(varSet.currentTime)
      if(tempTime == 0){
        clearInterval(timer)
      }
    }, 1000);

  }

  

    return (

      <div>
        <NewHeader
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{varSet.activityTimerTitle}</h1>
                <h4>{varSet.descriptionForTimer}</h4>
                <h4>{varSet.currentTime}</h4>
                <Button color="primary" size="lg" onClick = {() => countdown()} simple>
                  Start Timer
                </Button>
                <Button color="primary" size="lg" onClick = {() => backToLast()} simple>
                  go back
                </Button>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <UpdatedFooter history={props.history}/>
      </div>
    );
}

TimerPage = observer(TimerPage)
