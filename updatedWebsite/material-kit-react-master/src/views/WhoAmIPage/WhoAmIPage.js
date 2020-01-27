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
import MiddleSection from './MiddleSection/MiddleSection.js'

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function WhoAmIPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  function anotherGoBackFunc(){
    varSet.goToWhoAmIPage = false
    props.history.push('/landing-page')
  }

  function selectNoun(noun){
    varSet.firstNoun = noun
    //console.log(varSet.firstNoun)
    varSet.whoAmIAdjs = []
    varSet.whoAmINames = []
    props.history.push('/secondCardActivity')
  }

  function makeDescriptiveButtons(traitName){
    //var traitNoun = traitName['whoAmI']
    return(
        <div>
          <Button size='lg' color='info' id={traitName} onClick = {() => selectNoun(traitName)} >
            {traitName}
          </Button>
          <br/>
        </div>
      )
  }

  var nouns = varSet.firstTrait['whoAmI'].map(makeDescriptiveButtons)

    return (
     <div>

        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>What do you need to be for your next task?</h1>
                <br />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <MiddleSection history={props.history}/>
              </GridItem>
            </GridContainer>
          </div>
        </div>
        <UpdatedFooter history={props.history}/>
      </div>
    );
}

WhoAmIPage = observer(WhoAmIPage)