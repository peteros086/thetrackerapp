import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

//import styles from "assets/jss/material-kit-react/views/profilePage.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";

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
    return placeHolder
  }

  var asdf = varSet.traitsWithDescriptions.map(createTabs)

  return (
    <div>
        <Parallax small filter image={require("assets/img/blackImage.jpg")}>
          <div className={classes.container}>
          <h1 className={classes.title}>
          ETD Activites
          </h1>
          </div>
        </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
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
                color="primary"
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
                        <h3 className={classes.boxTitle}>
                          Discover which strength you should use to best accomplish your next task!
                        </h3>
                        <br />
                        <Button size='lg' color='rose' id="start1" onClick={() => goToWhoAmIPage()}>
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
                        <h3 className={classes.boxTitle}>
                          Uncover what you value when working with groups!
                        </h3>
                        <br />
                        <Button size='lg' color='rose' id="start2" onClick={() => goToPersonalValuePage()}>
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
                        <h3 className={classes.boxTitle}>
                          Establish how you can contribute to your teams!
                        </h3>
                        <br />
                        <Button size='lg' color='rose' id="start3" onClick={() => goToTeamContributionPage()}>
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
                        <h3 className={classes.boxTitle}>
                          Identify what energizes you when working in teams, and share with your teammates!
                        </h3>
                        <br />
                        <Button size='lg' color='rose' id="start4" onClick={() => goToPersonalEnergizersPage()}>
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
