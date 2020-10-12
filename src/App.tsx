import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Vacancy from "./components/Vacancy";

function App() {
  return (
    <Switch>
      <Route path="/vacancy" render={props => <Vacancy {...props} />} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
