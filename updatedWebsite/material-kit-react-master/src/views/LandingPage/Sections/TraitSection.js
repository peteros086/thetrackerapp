import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import Button from "components/CustomButtons/Button.js";
import Camera from "@material-ui/icons/Camera";



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
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Select Your Traits</h2>
          <h5 className={classes.description}>
            Click on the buttons below to select your top 5 clifton traits
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem>
                  {listItems}
            <br/>
          </GridItem>        
          <GridItem>
          <br/>
              <Button
                color="success"
                size="lg"
                onClick = {() => varSet.setTraits()}
              >
                Continue
              </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

TraitSection = observer(TraitSection)
