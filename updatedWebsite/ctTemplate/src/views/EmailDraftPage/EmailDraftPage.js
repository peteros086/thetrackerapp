import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";
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
import Button from "components/CustomButtons/Button.js";


const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function EmailDraftPage(props) {
  const classes = useStyles();
  const { ...rest } = props;


  return (
    <div>

      <Parallax filter image={require("assets/img/blackImage.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Create and Email For Someone Else to Send</h1>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
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
              <Button id="submit" color="primary" size="lg" onClick = {() => varSet.switchPage('/landing-page')}>
                Back to send email page
              </Button>
          <br/>
        </GridItem>        
        <GridItem>
        <br/>

        </GridItem>
      </GridContainer>
    </div>
  </div>
        </div> 
      </div>
      <UpdatedFooter history={props.history}/>
    </div>
  );

}

EmailDraftPage = observer(EmailDraftPage)
