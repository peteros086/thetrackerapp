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

export default function SecondMiddleSec(props) {
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
          <Button size='lg' color='info' onClick = {() => getSecondaryButtons(traitName)} >
            {traitName}
          </Button>
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
    <div className={classes.section}>
      <div>
            {nouns}
            <br/>
            <Button color="primary" size="lg" onClick = {() => anotherGoBackFunc()}>
              go back
            </Button>
      </div>
    </div>
  );
}}

SecondMiddleSec = observer(SecondMiddleSec)
