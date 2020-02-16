import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

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
import TimerPage from 'views/TimerPage/TimerPage.js'
import WhoAmIPage from 'views/WhoAmIPage/WhoAmIPage.js'
import AnotherMiddleSec from './AnotherMiddleSec/AnotherMiddleSec.js'


 
const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function PersonalValuesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function showValues(value){
    //console.log(varSet.traitsWithDescriptions)
    //console.log(varSet.traitsWithDescriptions[0]['hates'])
    if(varSet.activityPage !== 'myMindSet1'){
      varSet.goToTimerPage = true
      varSet.goToWhoAmIPage = false
      varSet.descriptionForTimer = value
    }else{
      varSet.goToWhoAmIPage = true
      varSet.goToTimerPage = false
      varSet.firstTrait = value
      varSet.secondTraits = []
      for(var i=0; i<varSet.traitsWithDescriptions.length; i++){
        if(varSet.firstTrait === varSet.traitsWithDescriptions[i]['name']){
          varSet.firstTrait = varSet.traitsWithDescriptions[i]
        }else{
          varSet.secondTraits.push(varSet.traitsWithDescriptions[i])
        }
      }
    }
  }

  function goBackAgain(){
    varSet.goToWhoAmIPage = false
    props.history.push('/landing-page')
  }

  function createHateButtons(hateValue){
    if(varSet.activityPage === 'personalValues'){
      var passValue = hateValue['hates']
      return(
        <div>
          <Button size='lg' color='info' id={passValue} onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['hates']}
          </Button>
          <br/>
        </div>
      )
    }else if (varSet.activityPage === 'teamContribution'){
      var passValue = hateValue['brings']
      return(
        <div>
          <Button size='lg' color='info' id={passValue} onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['brings']}
          </Button>
          <br/>
        </div>
      )
    }else if(varSet.activityPage === 'personalEnergizers'){
      var passValue = hateValue['needs']
      return(
        <div>
          <Button size='lg' fullWidth='true' color='info' id={passValue} onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['needs']}
          </Button>
          <br/>
        </div>
      )
    }else if(varSet.activityPage === 'myMindSet1'){
      var passValue = hateValue['name']
      return(
        <div>
          <Button size='lg' color='info' id={passValue} onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['name']}
          </Button>
          <br/>
        </div>
      )
    }
  }

  var HateButtons = varSet.traitsWithDescriptions.map(createHateButtons)

  if(!varSet.goToTimerPage && !varSet.goToWhoAmIPage){
    return (
      <div>
        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{varSet.activityTitle}</h1>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <div className={classes.section}>
              <div>
                <GridContainer>
                  <GridItem>
                    <AnotherMiddleSec history={props.history}/>
                  </GridItem>
                </GridContainer>
              </div>
            </div>
          </div>
        </div>
        <UpdatedFooter history={props.history}/>
      </div>
    );
  }else if (varSet.goToTimerPage){
    return(
      <TimerPage history={props.history}/>
    )
  }else if (varSet.goToWhoAmIPage){
    return(
      <WhoAmIPage history={props.history}/>
    )
  }

}

PersonalValuesPage = observer(PersonalValuesPage)
