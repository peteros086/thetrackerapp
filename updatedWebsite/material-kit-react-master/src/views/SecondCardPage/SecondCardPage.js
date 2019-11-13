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
import ButtonSection from './ButtonSection/ButtonSection.js'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function SecondCardPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function anotherGoBackFunc(){
    varSet.goToWhoAmIPage = false
    varSet.whoAmILines = []
    props.history.push('/landing-page')
  }

  function makeDescriptiveButtons(traitName){
    //var traitNoun = traitName['whoAmI']
    return(
        <div>
          <Button size='lg' color='info' onClick = {() => getSecondaryButtons(traitName)} >
            {traitName}
          </Button>
          <br/>
        </div>
      )
  }

  function getSecondaryButtons(adj){
    var currentSecondary = varSet.secondTraits[0]
    var currentName = currentSecondary['name']
    var currentAdjs = adj
    varSet.whoAmINames.push(currentName)
    varSet.whoAmIAdjs.push(currentAdjs)
    console.log(varSet.secondTraits)
    console.log(varSet.whoAmINames)
    console.log(varSet.whoAmIAdjs)
    varSet.secondTraits.shift()
  }


  if(varSet.whoAmIAdjs.length <4){
    try{
      var nouns = varSet.secondTraits[0]['Adjectives'].map(makeDescriptiveButtons)
    }catch(error){
      console.log(error)
      props.history.push('/landing-page')
    }

    return (
       <div>
          <Parallax filter image={require("assets/img/blackImage.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>I will need to be a _______ {varSet.firstNoun}</h1>
                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem>
                  <br/>
                  {nouns}
                  <br/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                    <Button color="primary" size="lg" onClick = {() => anotherGoBackFunc()}>
                      go back
                    </Button>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <UpdatedFooter history={props.history}/>
        </div>
    );
  }else{


  {/*
    function makeTertiaryButtons(adj){
      var tempLine = adj.concat(' ', varSet.firstNoun)
      console.log(tempLine)
      console.log(varSet.whoAmILines)
      console.log(varSet.whoAmILines.includes(tempLine))
      if(varSet.whoAmILines.includes(tempLine)){
        return(
          <div>
            <Button size='lg' color='danger' onClick = {() => varSet.selectLines(tempLine)} >
              {tempLine}
            </Button>
            <br/>
          </div>
        )
      }else{
        return(
          <div>
            <Button size='lg' color='info' onClick = {() => varSet.selectLines(tempLine)} >
              {tempLine}
            </Button>
            <br/>
          </div>
        )
      }

    }
    var thirdButtons = varSet.whoAmIAdjs.map(makeTertiaryButtons)
  */}


    var thirdButtons = varSet.whoAmIAdjs.map((trait, index) => {
      var tempLine = trait.concat(' ', varSet.firstNoun)
      console.log(tempLine)
      console.log(varSet.whoAmILines)
      console.log(varSet.whoAmILines.includes(tempLine))
      if(varSet.whoAmILines.includes(tempLine)){
        return(
          <div>
            <Button key={index} size='lg' color='danger' onClick = {() => varSet.selectLines(tempLine)} >
              {tempLine}
            </Button>
            <br/>
          </div>
        )
      }else{
        return(
          <div>
            <Button key={index} size='lg' color='info' onClick = {() => varSet.selectLines(tempLine)} >
              {tempLine}
            </Button>
            <br/>
          </div>
        )
      }
    });

    function continueFunc(){
      varSet.descriptionForTimer = linesToText(varSet.whoAmILines)
      varSet.goToTimerPage = true
      console.log(varSet.whoAmILines)
      props.history.push('/activity')
    }

    function linesToText(inputArr){
      var totalLines = ''
      for(var j = 0; j < inputArr.length; j++){
        totalLines.concat(inputArr[j])
        console.log(inputArr[j])
      }
      console.log(totalLines)
      totalLines = inputArr.join('-----')
      return totalLines
    }

    return (
       <div>
          <Parallax filter image={require("assets/img/blackImage.jpg")}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>What will you need to be for your next task? {varSet.whoAmIAdjs[0]}</h1>
                  <br />
                </GridItem>
              </GridContainer>
            </div>
          </Parallax>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <br/>
                  <ButtonSection history={props.history}/>
                  <br/>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Button color="primary" size="lg" onClick = {() => anotherGoBackFunc()}>
                      go back
                    </Button>
                     <Button color="primary" size="lg" onClick = {() => continueFunc()}>
                      Continue
                    </Button>
                </GridItem>
              </GridContainer>
            </div>
          </div>
          <UpdatedFooter history={props.history}/>
        </div>
    );
  }

}

SecondCardPage = observer(SecondCardPage)