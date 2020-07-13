import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Warning from "@material-ui/icons/Warning";

 

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/blackImage.jpg";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";


const useStyles = makeStyles(styles);

export default function ActualLoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function onLogin(){
    varSet.loginFunc(props.history)
  }

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          {varSet.incorrectLogin &&
              <SnackbarContent
                message={
                  <span>
                    <b>Error:</b> Incorrect Login Info
                  </span>
                }
                close
                color="danger"
                icon={Warning}
              />
          }






          <h1>Customer Interviews</h1>
          <br />
          <GridContainer justify="center">
            <GridItem>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Login</h2>
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
                        onChange: (event) => varSet.setUsername(event.currentTarget.value),
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
                        onChange: (event) => varSet.setPassword(event.currentTarget.value),
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
                    {varSet.loadingResponse? 
                      <Button id="submit" color="primary" size="lg" onClick = {() => onLogin()} disabled>
                        Get started
                      </Button>
                      :
                      <Button id="submit" color="primary" size="lg" onClick = {() => onLogin()}>
                        Get started
                      </Button>
                    }
                  </CardFooter>
                  {varSet.loadingResponse?
                    <LinearProgress/>
                    :
                  <LinearProgress variant='determinate' value={100}/>
                  } 
                </form>
              </Card>
            </GridItem>
          </GridContainer>







          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h2>Login</h2>
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
                        onChange: (event) => varSet.setUsername(event.currentTarget.value),
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
                        onChange: (event) => varSet.setPassword(event.currentTarget.value),
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
                    {varSet.loadingResponse? 
                      <Button id="submit" color="primary" size="lg" onClick = {() => onLogin()} disabled>
                        Get started
                      </Button>
                      :
                      <Button id="submit" color="primary" size="lg" onClick = {() => onLogin()}>
                        Get started
                      </Button>
                    }
                  </CardFooter>
                  {varSet.loadingResponse?
                    <LinearProgress/>
                    :
                  <LinearProgress variant='determinate' value={100}/>
                  } 
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <UpdatedFooter whitefont history={props.history}/>
      </div>
    </div>
  );
}

ActualLoginPage = observer(ActualLoginPage)
