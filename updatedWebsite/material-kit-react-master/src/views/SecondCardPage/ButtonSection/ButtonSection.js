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

export default function ButtonSection() {
  const classes = useStyles();

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
  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem>
            {thirdButtons}
            <br/>
          </GridItem>        
        </GridContainer>
      </div>
    </div>
  );
}

ButtonSection = observer(ButtonSection)
