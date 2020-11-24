import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import './App.css';

/* Components */
import ChildConfigPage from "./pages/child-config/child-config.component";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ChildConfigPage}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
