import "~/utils/polyfill";

import React from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import ExamplePage from "~/pages/example";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id?" component={ExamplePage} />
      </Switch>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
