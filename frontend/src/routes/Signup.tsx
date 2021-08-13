import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SyntheticEvent } from "react";
import { ContextAuth } from "../context/AuthContext";
import axiosInstance from "../context/AxiosConfig";
import Footer from "../components/Footer";

const Signup = () => {
	document.title = "SignUp";
	const history = useHistory();
	const [emailError, setEmailError] = useState("");
	const [generalError, setGeneralError] = useState("");
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { isLogedIn, csrfToken } = useContext(ContextAuth);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		const response = await axiosInstance("/api/users/create", {
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": csrfToken!,
			},
			method: "POST",
			withCredentials: true,
			data: JSON.stringify(user),
		});
		const jsres = response.data;

		if (response.status === 201) {
			// ADD modal 'acc created succesfully' then redirect
			history.push("/login");
		} else {
			if (jsres.email) {
				setGeneralError("Something went wrong, please try again.");
				setEmailError("User with this Email already exists.");
				setUser({ ...user, email: "" });
				console.log("email in: ", emailError);
			}
		}
	};

	return isLogedIn ? (
		<div className='bg-cGray-27 mt-10 rounded-lg text-gray-900 mx-10 md:mx-20 lg:mx-32 xl:mx-64 px-10'>
			<div className=' container px-5 mx-auto flex flex-wrap items-center py-2 pt-5'>
				{" "}
				You are already logged in! Go to{" "}
				<a href='/' className='text underline ml-1 text-cViolet-30'>
					{" "}
					Home
				</a>
			</div>
			<div className='  container px-5 mx-auto flex flex-wrap items-center py-1 pb-5'>
				If you want to create an account please log out
			</div>
		</div>
	) : (
		<div>
			<div className='flex justify-center lg:mx-40 xl:mx-60 mx-10 my-5'>
				<div className='8 bg-gray-100 shadow-lg border border-gray-200 flex flex-col mx-auto px-5 md:px-20 md:mx-28 md:mt-10  py-8 rounded-lg height: 81.99vh; container m-auto'>
					<form action='' onSubmit={handleSubmit}>
						<div className='flex flex-row '>
							<h2 className='text-black text-lg font-medium title-font mb-5'>Sign Up</h2>
							{generalError && (
								<div className='text-red-500 ml-2 flex-1 text-right text-sm leading-7'>
									{generalError}
								</div>
							)}
						</div>
						<div className='relative mb-4'>
							<div className='flex flex-row '>
								<label htmlFor='email' className='leading-7 text-sm text-gray-700'>
									Email
								</label>
								<div className='text-red-500 ml-2 flex-1 text-right text-sm leading-7'>
									{emailError}
								</div>
							</div>
							<input
								type='email'
								id='email'
								name='email'
								value={user.email}
								onChange={(e) => setUser({ ...user, email: e.target.value })}
								className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>

						<div className='relative mb-4'>
							<label htmlFor='email' className='leading-7 text-sm text-gray-700'>
								Password
							</label>
							<input
								type='password'
								id='password'
								name='password'
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
								className='w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
							/>
						</div>
						<div className='text-red-500'>
							{!(user.password && user.email) && "Please fill all the slots"}
						</div>
						<button
							disabled={!(user.password && user.email)}
							type='submit'
							className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
							Button
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Signup;
