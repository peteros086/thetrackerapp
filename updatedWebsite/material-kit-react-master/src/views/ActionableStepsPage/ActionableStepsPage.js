import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";


//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";


const useStyles = makeStyles(styles);

export default function ActionableStepsPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  function goBack(text){
    varSet.goToWhoAmIPage = false
    varSet.goToTimerPage = false
    props.history.push('/landing-page')
  }

  return (
    <div>
        <Parallax filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                <h1 className={classes.title}>{varSet.textPageTitle}</h1>
                
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <div className={classes.description}>
            <GridContainer>
            <GridItem >
              <CustomInput
                id="regular"
                inputProps={{
                  placeholder: varSet.textValue,
                  onChange: (event) => varSet.textValue = event.currentTarget.value,
                }}
                formControlProps={{
                  fullWidth: true
                }}
              />
            </GridItem>
              <GridItem >
                <Button color="primary" size="lg" onClick = {() => goBack(varSet.textValue)}>
                  Share
                </Button>
              </GridItem>
            </GridContainer>
            </div>
          </div>
        </div>
      </div>
      <UpdatedFooter />
    </div>
  );
}

ActionableStepsPage = observer(ActionableStepsPage)