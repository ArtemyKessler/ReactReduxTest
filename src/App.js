import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Table from "./Table/Table";
import Bulletin from "./Bulletin/Bulletin";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <h1>Административный интерфейс</h1>
        <Switch>
          <Route exact path="/" component={Table} />
          <Route path="/bulletin" component={Bulletin} />
        </Switch>
      </div>
    );
  }
}

export default App;
