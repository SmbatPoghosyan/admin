import React, {Suspense,lazy} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Loader from "../components/Loader";

const NotFound = lazy(() => import("../components/NotFound"));
const Branches = lazy(() => import("../components/Branches"));
const BranchPage = lazy(() => import("../components/BranchPage"));

const App = () =>
{
	return (
		<Router>
			<div className="app">
				<Suspense fallback={<Loader />}>
					<Switch>
						<Route exact path={["/", "/branches"]} component={Branches} />
						<Route path="/branches/:id" component={BranchPage} />
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</div>
		</Router>
	);
};

export default App;
