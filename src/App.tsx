import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Vacancy from './components/Vacancy';

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/vacancy/:id" render={Vacancy} />
      <Route component={Home} />
    </Switch>
  );
}

export default App;
