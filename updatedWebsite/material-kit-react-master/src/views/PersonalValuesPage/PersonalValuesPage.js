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
import TimerPage from 'views/TimerPage/TimerPage.js'
import NewHeader from 'components/NewHeader/NewHeader.js';



const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function PersonalValuesPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function showValues(value){
    console.log(varSet.traitsWithDescriptions)
    console.log(varSet.traitsWithDescriptions[0]['hates'])
    varSet.goToTimerPage = true
    varSet.descriptionForTimer = value
    console.log(varSet.descriptionForTimer)
  }

  function createHateButtons(hateValue){
    console.log(hateValue)
    var currentHateValue = hateValue['hates']
    console.log(currentHateValue)
    if(varSet.activityPage == 'personalValues'){
      return(
        <div>
          <Button size='lg' color='info' onClick = {() => showValues(currentHateValue)} >
            {varSet.activityParagraph}{hateValue['hates']}
          </Button>
          <br/>
        </div>
      )
    }else if (varSet.activityPage == 'teamContribution'){
      return(
        <div>
          <Button size='lg' color='info' onClick = {() => showValues(currentHateValue)} >
            {varSet.activityParagraph}{hateValue['brings']}
          </Button>
          <br/>
        </div>
      )
    }else if(varSet.activityPage == 'personalEnergizers'){
      return(
        <div>
          <Button size='lg' color='info' onClick = {() => showValues(currentHateValue)} >
            {varSet.activityParagraph}{hateValue['needs']}
          </Button>
          <br/>
        </div>
      )
    }
  }

  var HateButtons = varSet.traitsWithDescriptions.map(createHateButtons)

  if(!varSet.goToTimerPage){
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
                <h1 className={classes.title}>{varSet.activityTitle}</h1>
                
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classes.section}>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <div className={classes.container}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {HateButtons}
                </GridItem>
              </GridContainer>
              
            </div>
          </div>
        </div>
        <UpdatedFooter history={props.history}/>
      </div>
    );
  }else{
    return(
      <TimerPage history={props.history}/>
    )
  }

}

PersonalValuesPage = observer(PersonalValuesPage)
