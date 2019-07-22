import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Link, Switch,Redirect } from "react-router-dom";
import { getAllBranches } from "../../api/branches";
import "./reset.css";
import "./App.css";
import Branches from "../components/Branches";
import BranchPage from "../components/BranchPage";
import NotFound from "../components/NotFound";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={Branches}/>
          <Route exact path="/branches" component={Branches}/>
          <Route path="/branches/:id" component={BranchPage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
