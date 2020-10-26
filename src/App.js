import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/coin/:coinId">
          <Coinpage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
