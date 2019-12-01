import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Branches from "../components/Branches";
import BranchPage from "../components/BranchPage";
import NotFound from "../components/NotFound";

const App = () =>
{
	return (
		<Router>
			<div className="app">
				<Switch>
					<Route exact path={["/", "/branches"]} component={Branches} />
					<Route path="/branches/:id" component={BranchPage} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
