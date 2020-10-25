import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Drinkpage from "./pages/Drinkpage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/drink/:id">
          <Drinkpage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
