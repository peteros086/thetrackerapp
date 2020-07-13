import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ActualLoginPage from 'views/ActualLoginPage/ActualLoginPage.js';
import EmailDraftPage from 'views/EmailDraftPage/EmailDraftPage.js'


var hist = createBrowserHistory();

ReactDOM.render(
  <Router onUpdate={() => window.scrollTo(0, 0)} history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/draft" component={EmailDraftPage} />
      <Route path="/components" component={Components} />

      <Route path="/" component={ActualLoginPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
