import React, {Suspense,lazy} from "react";
import { BrowserRouter as Router, Route, Switch,Redirect, Link } from "react-router-dom";
import "./reset.css";
import "./App.css";
import Loader from "../components/Loader";

const NotFound = lazy(() => import("../components/NotFound"));
const Branches = lazy(() => import("../components/Branches"));
const Login = lazy(() => import("../components/Login"));
const BranchPage = lazy(() => import("../components/BranchPage"));
const Profile = lazy(() => import("../components/profile/Profile"));

const App = (props) =>
{
	const [user,setUser] = React.useState(localStorage.getItem('user'));
	const handleClick = (e) => {
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		localStorage.removeItem('screens');
	};
	return (
		<Router>
			<div className="app">
				{
					user ? (
						<Link to={"/login"}>
							<button onClick={handleClick} className="logout">Logout</button>
						</Link>
					) : null
				}
				<Suspense fallback={<Loader/>}>
					<Switch>
						{
							user ? (
								<>
									<Route exact path={["/", "/branches"]} render={(props) => <Branches {...props} setUser={setUser}/>}/>
									<Route path={"/branches/:id"} render={(props) => <BranchPage {...props} setUser={setUser}/>}/>
									<Route path={"/profile"} component={Profile}/>
								</>
							) : <Route exact path={["/", "/login"]} render={(props) => <Login {...props} setUser={setUser}/>}/>
						}
						<Route path={"/login"} render={(props) => <Login {...props} setUser={setUser}/>}/>
						<Route component={NotFound}/>
						<Redirect to="/"/>
					</Switch>
				</Suspense>
			</div>
		</Router>
	);
};

export default App;
