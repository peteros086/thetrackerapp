import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import Button from "components/CustomButtons/Button.js";



const useStyles = makeStyles(styles);

export default function AnotherMiddleSec(props) {
  const classes = useStyles();
  const { ...rest } = props;


  function showValues(value){
    console.log(varSet.traitsWithDescriptions)
    //console.log(varSet.traitsWithDescriptions[0]['hates'])
    if(varSet.activityPage !== 'myMindSet1'){
      varSet.goToTimerPage = true
      varSet.goToWhoAmIPage = false
      varSet.descriptionForTimer = value
    }else{
      varSet.goToWhoAmIPage = true
      varSet.goToTimerPage = false
      varSet.firstTrait = value
      console.log(varSet.firstTrait)
      varSet.secondTraits = []
      for(var i=0; i<varSet.traitsWithDescriptions.length; i++){
        if(varSet.firstTrait === varSet.traitsWithDescriptions[i]['name']){
          varSet.firstTrait = varSet.traitsWithDescriptions[i]
          console.log(varSet.firstTrait)
        }else{
          varSet.secondTraits.push(varSet.traitsWithDescriptions[i])
          console.log(varSet.secondTraits)
        }
      }
    }
  }

  function goBackAgain(){
    varSet.goToWhoAmIPage = false
    props.history.push('/landing-page')
  }

  function createHateButtons(hateValue){
    console.log(hateValue)
    if(varSet.activityPage === 'personalValues'){
      var passValue = hateValue['hates']
      //console.log(passValue)
      return(
          <Button size='lg' color='info' onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['hates']}
          </Button>
      )
    }else if (varSet.activityPage === 'teamContribution'){
      var passValue = hateValue['brings']
      //console.log(passValue)
      return(
          <Button size='lg' color='info' onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['brings']}
          </Button>
      )
    }else if(varSet.activityPage === 'personalEnergizers'){
      var passValue = hateValue['needs']
      //console.log(passValue)
      return(
          <Button size='lg' color='info' onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['needs']}
          </Button>
      )
    }else if(varSet.activityPage === 'myMindSet1'){
      var passValue = hateValue['name']
      //console.log(passValue)
      return(
          <Button size='lg' color='info' onClick = {() => showValues(passValue)} >
            {varSet.activityParagraph}{hateValue['name']}
          </Button>
      )
    }
  }

  var HateButtons = varSet.traitsWithDescriptions.map(createHateButtons)

  return (
    <div className={classes.section}>
      <div>
            {HateButtons}
            <br/>
            <Button color="primary" size="lg" onClick = {() => goBackAgain()}>
              go back
            </Button>
      </div>
    </div>
  );
}

AnotherMiddleSec = observer(AnotherMiddleSec)
