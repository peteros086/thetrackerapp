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

  function nextPage(){
    if(varSet.activityPage == 'personalValues'){
      varSet.textPageTitle = 'What can your team do to help?'
      varSet.textValue = 'My team can:'

    }else if (varSet.activityPage == 'teamContribution'){
      varSet.textPageTitle = 'Specifically, what will this let your team do?'
      varSet.textValue = 'I can:'

    }else if (varSet.activityPage == 'personalEnergizers'){
      varSet.textPageTitle = 'What can your team do to help?'
      varSet.textValue = 'My team can:'

    }
    
    props.history.push('/actionableSteps')
  }

  var cTime = 30

  function countdown(){
    if (varSet.currentTime == 30){
        varSet.timerbuttonText = 'Start Timer'
        console.log(varSet.timerButtonText)
    }
    if(varSet.currentTime == 30 || varSet.currentTime ==0){
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
        if(varSet.currentTime != 0){
          varSet.timerButtonText = 'Reset Timer'
          console.log(varSet.timerButtonText)
        }
        console.log(props.history.location.pathname)
        if(props.history.location.pathname != '/activity'){
          clearInterval(timer)
        }
        if(tempTime == 0){
          clearInterval(timer)
        }
      }, 1000);
    }
  }

  

    return (

      <div>
        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{varSet.activityTimerTitle}</h1>
                <h4>{varSet.descriptionForTimer}</h4>

              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem justify = 'center'>
                <h1 className={classes.title}>{varSet.currentTime}</h1>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
              <br/>
                {varSet.currentTime == 30 || varSet.currentTime == 0?
                  <Button color="primary" size="lg" onClick = {() => countdown()} simple>
                    {varSet.timerButtonText}
                  </Button>
                  :
                  <Button color="primary" size="lg" onClick = {() => countdown()} simple>
                    {varSet.timerButtonText}
                  </Button>                  
                }

                <Button color="primary" size="lg" onClick = {() => backToLast()} simple>
                  go back
                </Button>
                {varSet.currentTime <= 25?
                  <Button color="primary" size="lg" onClick = {() => nextPage()} simple>
                    continue
                  </Button>
                  :
                  <Button color="primary" size="lg" onClick = {() => nextPage()} simple disabled>
                    continue
                  </Button>
                }

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
