import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

ReactDOM.render(
	<Router>
		<Switch>
			<Route exact path='/' component={App} />
		</Switch>
	</Router>,
	document.getElementById("root")
);