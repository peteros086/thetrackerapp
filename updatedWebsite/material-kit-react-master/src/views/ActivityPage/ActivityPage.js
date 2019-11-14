import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

//NEW IMPORTS
import {observer} from "mobx-react"
import varSet from 'components/MobxStore/VarStore.js'
import UpdatedFooter from "components/Footer/UpdatedFooter.js";



const useStyles = makeStyles(styles);

export default function ActivityPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  function onLogout(){
    varSet.logoutFunc()
    setTimeout(function(){
      console.log(varSet.loggedIn);
      props.history.replace('/')
    }, 200);
  }

  function goToPersonalValuePage(){
    varSet.activityPage = 'personalValues'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToTeamContributionPage(){
    varSet.activityPage = 'teamContribution'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToPersonalEnergizersPage(){
    varSet.activityPage = 'personalEnergizers'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }

  function goToWhoAmIPage(){
    console.log(classes)
    varSet.activityPage = 'myMindSet1'
    varSet.updateActivityInfo()
    props.history.push('/activity')
  }
  
  function createTabs(arrayElement){
        var placeHolder = {
              tabButton: arrayElement['name'],
              tabIcon: Camera,
              tabContent: (
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                    <h3 className={classes.title}>DESCRIPTION:</h3>
                      <h6>
                        {arrayElement['description']}
                      </h6>
                    <h3 className={classes.title}>NEEDS:</h3>
                      <h6>
                        {arrayElement['needs']}
                      </h6>
                    <h3 className={classes.title}>BRINGS:</h3>
                      <h6>
                        {arrayElement['brings']}
                      </h6>
                    <h3 className={classes.title}>HATES:</h3>
                      <h6>
                        {arrayElement['hates']}
                      </h6>
                  </GridItem>
                </GridContainer>
              )
          }
        console.log(placeHolder)
    return placeHolder
  }

  var asdf = varSet.traitsWithDescriptions.map(createTabs)

  return (
    <div>
        <Parallax small filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
          <h1 className={classes.title}>
          Effective Team Dynamics
          </h1>
          </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
{/*
            <div className={classes.description}>
              <Button size='lg' color='info' onClick={() => goToPersonalValuePage()}>
              Personal Values (I Hate section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToTeamContributionPage()}>
                Team Contribution (I Bring section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToPersonalEnergizersPage()}>
                Personal Energizers (I Need section)
              </Button>
              <Button size='lg' color='info' onClick={() => goToWhoAmIPage()}>
                WHO AM I ACTIVITY
              </Button>
              <br />
            </div>
*/}
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
              
              {/*
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={
                    asdf
                  }
                />
              */}


            <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "My Mindset",
                    tabIcon: Camera,
                    tabContent: (
                      <span>
                        <p>
                          Discover which strength you should use to best accomplish your next task!
                        </p>
                        <br />
                        <Button size='lg' color='info' onClick={() => goToWhoAmIPage()}>
                          START
                        </Button>
                      </span>
                    )
                  },
                  {
                    tabButton: "Personal Values",
                    tabIcon: Camera,
                    tabContent: (
                      <span>
                        <p>
                          Uncover what you value when working with groups!
                        </p>
                        <br />
                        <Button size='lg' color='info' onClick={() => goToPersonalValuePage()}>
                          START
                        </Button>
                      </span>
                    )
                  },
                  {
                    tabButton: "Team Contribution",
                    tabIcon: Camera,
                    tabContent: (
                      <span>
                        <p>
                          Establish how you can contribute to your teams!
                        </p>
                        <br />
                        <Button size='lg' color='info' onClick={() => goToTeamContributionPage()}>
                          START
                        </Button>
                      </span>
                    )
                  },
                  {
                    tabButton: "Personal Energizers",
                    tabIcon: Camera,
                    tabContent: (
                      <span>
                        <p>
                          Identify what energizes you when working in teams, and share with your teammates!
                        </p>
                        <br />
                        <Button size='lg' color='info' onClick={() => goToPersonalEnergizersPage()}>
                          START
                        </Button>
                      </span>
                    )
                  }
                ]}
              />

              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <UpdatedFooter history={props.history}/>
    </div>
  );
}

ActivityPage = observer(ActivityPage)
