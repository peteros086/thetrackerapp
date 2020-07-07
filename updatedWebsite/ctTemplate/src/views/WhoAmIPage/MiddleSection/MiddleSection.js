import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import Button from "components/CustomButtons/Button.js";



const useStyles = makeStyles(styles);

export default function MiddleSection(props) {
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
          <Button size='lg' color='info' id={traitName} onClick = {() => selectNoun(traitName)} >
            {traitName}
          </Button>
      )
  }

  var nouns = varSet.firstTrait['whoAmI'].map(makeDescriptiveButtons)

  return (
    <div className={classes.section}>
      <div>
            {nouns}
            <br/>
            <Button color="primary" size="lg" id='backButton' onClick = {() => anotherGoBackFunc()}>
              go back
            </Button>
      </div>
    </div>
  );
}

MiddleSection = observer(MiddleSection)
