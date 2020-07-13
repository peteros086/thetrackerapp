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

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import People from "@material-ui/icons/People";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles(styles);

export default function TraitSection() {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem>

                <div>
                  <CustomInput
                      labelText='To'
                      id="To"
                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        defaultValue: varSet.emailRecipient,
                        onChange: (event) => varSet.setEmailRecipient(event.currentTarget.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowForwardIosIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                  />
                  <CustomInput
                      labelText='Subject'
                      id="Subject"
                      
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        defaultValue: varSet.emailSubject,
                        onChange: (event) => varSet.setEmailSubject(event.currentTarget.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowForwardIosIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                    <CustomInput
                      id="Body"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        color: 'primary',
                        multiline: true,
                        defaultValue: varSet.emailBody,
                        onChange: (event) => varSet.setEmailBody(event.currentTarget.value),
                        startAdornment: (
                          <InputAdornment position="start">
                            <ArrowForwardIosIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                </div>

              <Card>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Enter your email info</h2>
                  </CardHeader>
                  <p className={classes.divider}>     </p>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="user"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        onChange: (event) => varSet.setEmailUser(event.currentTarget.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        onChange: (event) => varSet.setEmailPass(event.currentTarget.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                      <Button id="submit" color="primary" size="lg" onClick = {() => varSet.sendEmail()}>
                        Send Emails
                      </Button>

                  </CardFooter>
                </form>
              </Card>
                <Button id="submit" color="primary" size="lg" onClick = {() => varSet.switchPage('/draft')}>
                  Upload email document for others to send
                </Button>
            <br/>
          </GridItem>        
          <GridItem>
          <br/>

          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

TraitSection = observer(TraitSection)
