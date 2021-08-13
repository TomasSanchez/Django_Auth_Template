import { useContext } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { ContextAuth } from "../context/AuthContext";

const PrivateRoute = (props: any) => {
	const location = useLocation();
	const { isLoggedIn } = useContext(ContextAuth);

	return isLoggedIn === undefined ? (
		<div className='mt-10'>
			<div className=' flex justify-center items-center mb-2'>
				<div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cViolet-39 '></div>
			</div>
		</div>
	) : isLoggedIn ? (
		<Route {...props} />
	) : (
		<Redirect
			to={{
				pathname: "/login",
				state: { from: location },
			}}
		/>
	);
};

export default PrivateRoute;
