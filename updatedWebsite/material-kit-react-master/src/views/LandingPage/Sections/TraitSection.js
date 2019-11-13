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

export default function TraitSection() {
  const classes = useStyles();
  const traitArray = varSet.traitList

  var listItems = traitArray.map((trait, index) =>
    { if(varSet.currentTraits.includes({trait}.trait)){
        return(
          <Button size='lg' color='danger' key={index} onClick={() => varSet.addTrait({trait})}>
            {trait}
          </Button>
      )}else{
        return(
          <Button size='lg' color='info' key={index} onClick={() => varSet.addTrait({trait})}>
            {trait}
          </Button>
        )}
    }
  );
  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem>
            {listItems}
            <br/>
          </GridItem>        
          <GridItem>
          <br/>
          
            {varSet.currentTraits.length === 5?
              <Button
                color="success"
                size="lg"
                onClick = {() => varSet.setTraits()}
              >
                Continue
              </Button>
              :
              <Button
                color="success"
                size="lg"
                disabled
                onClick = {() => varSet.setTraits()}
              >
                Continue
              </Button>
            }

          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

TraitSection = observer(TraitSection)
