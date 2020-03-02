import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";
import TimerHeader from "components/Header/TimerHeader.js";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function TimerPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function backToLast(){
    varSet.goToTimerPage = false
    varSet.goToWhoAmIPage = false
    varSet.whoAmIAdjs = []
    varSet.whoAmINames = []
    varSet.whoAmILines = []
    props.history.push('/landing-page')
  }

  function nextPage(){
    if(varSet.activityPage === 'personalValues'){
      varSet.textPageTitle = 'What can your team do to help?'
      varSet.textValue = 'My team can:'
      props.history.push('/actionableSteps')
    }else if (varSet.activityPage === 'teamContribution'){
      varSet.textPageTitle = 'Specifically, what will this let your team do?'
      varSet.textValue = 'I can:'
      props.history.push('/actionableSteps')
    }else if (varSet.activityPage === 'personalEnergizers'){
      varSet.textPageTitle = 'What can your team do to help?'
      varSet.textValue = 'My team can:'
      props.history.push('/actionableSteps')
    }else if (varSet.activityPage === 'myMindSet1'){
      varSet.goToWhoAmIPage = false
      props.history.push('/landing-page')
    }
  }

  var cTime = 30

  function countdown(){
    if(varSet.timerButtonText === 'Reset Timer' && varSet.currentTime !== 30){
      varSet.shouldResetTimer = true
      varSet.timerButtonText = 'Start Timer'
    }
    if (varSet.currentTime === 30){
        varSet.timerButtonText = 'Start Timer'
    }
    if(varSet.currentTime === 30 || varSet.currentTime === 0){
      var tempTime = 31
      cTime = tempTime
      let timer = setInterval(() => { 
        tempTime = tempTime -1
        cTime = tempTime
        varSet.currentTime = cTime
        if(varSet.currentTime !== 0 && varSet.shouldResetTimer !== true){
          varSet.timerButtonText = 'Reset Timer'
        }
        if(props.history.location.pathname !== '/activity'){
          clearInterval(timer)
        }
        if(tempTime === 0){
          clearInterval(timer)
        }
        if(varSet.shouldResetTimer === true){
          clearInterval(timer)
          varSet.currentTime = 30
          varSet.shouldResetTimer = false
        }
      }, 1000);
    }
  }

  

    return (

      <div>
      <TimerHeader
        brand="Go Back"
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
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
                {varSet.currentTime === 30 || varSet.currentTime === 0?
                  <Button color="primary" size="lg" onClick = {() => countdown()} simple>
                    {varSet.timerButtonText}
                  </Button>
                  :
                  <Button color="primary" size="lg" onClick = {() => countdown()} simple>
                    {varSet.timerButtonText}
                  </Button>                  
                }
                {varSet.currentTime === 0?
                  <Button color="primary" size="lg" onClick = {() => nextPage()} simple>
                    Continue
                  </Button>
                  :
                  <Button color="primary" size="lg" onClick = {() => nextPage()} simple disabled>
                    Continue
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
