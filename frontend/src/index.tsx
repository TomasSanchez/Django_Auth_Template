import "./styles/index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import PrivateRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import ActivateAccount from "./routes/ActivateAccount";
import PageNotFound from "./routes/PageNotFound";
import ResetPass from "./routes/ResetPass";
import ResetSend from "./routes/ResetSend";

ReactDOM.render(
	<AuthContext>
		<Navbar />
		<Router>
			<Switch>
				<Route exact path='/' component={App} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/signup' component={Signup} />
				<Route exact path='/account/activate' component={ActivateAccount} />
				<PrivateRoute exact path='/account' component={Account} />
				<Route exact path='/reset' component={ResetPass} />
				<Route exact path='/reset/send' component={ResetSend} />
				<Route path='/' component={PageNotFound} />
			</Switch>
		</Router>
	</AuthContext>,
	document.getElementById("root")
);
