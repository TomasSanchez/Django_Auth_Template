import { SyntheticEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axiosInstance from "../context/AxiosConfig";

document.title = "Reset password";

const passwordCheck: (pass1: string, pass2: string) => boolean = (password1: string, password2: string) => {
	return password1 === password2 && password2.length > 8;
};

const ResetPass = () => {
	const [isValidToken, setIsValidToken] = useState<boolean | undefined>(undefined);
	const [password, setPassword] = useState({ password1: "", password2: "" });
	const [error, setError] = useState("");
	const history = useHistory();
	const search = useLocation().search;
	const token = new URLSearchParams(search).get("verification_token");
	const user_id = new URLSearchParams(search).get("user_id");

	console.log("token: ", token);
	console.log("user_id: ", user_id);

	const checkToken = async () => {
		try {
			const response = await axiosInstance("/api/users/reset_password_verify_token", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				data: JSON.stringify({
					token: token,
					user_id,
				}),
			});
			if (response.status === 200) {
				setIsValidToken(true);
			}
		} catch (error) {
			setIsValidToken(false);
			setError("Something went wrong.");
		}
	};

	useEffect(() => {
		checkToken();
		// eslint-disable-next-line
	}, []);

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("this rand");

		if (passwordCheck(password.password1, password.password2)) {
			console.log("this didnt!");
			try {
				const response = await axiosInstance("/api/users/reset_password", {
					headers: {
						"Content-Type": "application/json",
					},
					method: "PUT",
					data: JSON.stringify({
						token: token,
						new_password: password.password1,
						new_password2: password.password2,
						user_id,
					}),
				});
				if (response.status === 204) {
					// history.push("/");
					// Modal with reset password succes
				} else if (response.data.detail === "Invalid Token.") {
					setIsValidToken(false);
				} else {
					setError("Something went wrong.");
				}
			} catch (error) {}
		}
	};

	return isValidToken === undefined ? (
		<div>Checking Token</div>
	) : !isValidToken ? (
		<div>Invalid Token! Please request again.</div>
	) : (
		<div className=' mt-10'>
			<div className='mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col border border-gray-200 shadow-lg w-full mt-10 md:mt-0'>
				<h2 className='text-Black text-lg  font-medium title-font mb-5'>Reset Password</h2>
				{error && (
					<h2 className='lg:w-2/6 md:w-1/2 text-red-400 w-auto' style={{ width: "auto" }}>
						{error}
					</h2>
				)}
				<form onSubmit={handleSubmit}>
					<div className='relative mb-4'>
						<label htmlFor='password' className='leading-7 text-sm text-gray-700'>
							Password
						</label>
						<input
							type='password'
							id='password1'
							name='password1'
							value={password.password1}
							onChange={(e) =>
								setPassword({
									...password,
									password1: e.target.value,
								})
							}
							className='w-full bg-gray-500 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>
					<div className='relative mb-4'>
						<label htmlFor='password' className='leading-7 text-sm text-gray-700'>
							Confirm Password
						</label>
						<input
							type='password'
							id='password2'
							name='password2'
							value={password.password2}
							onChange={(e) =>
								setPassword({
									...password,
									password2: e.target.value,
								})
							}
							className={`w-full bg-gray-500 bg-opacity-20 focus:bg-transparent focus:ring-2 rounded border ${
								password.password1 === password.password2 && password.password2.length > 0
									? " focus:ring-green-600 focus:border-green-500 border-green-400 "
									: " focus:ring-red-600 focus:border-red-500 border-gray-600"
							} text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
						/>
					</div>

					<div className='flex flex-row justify-end mx-auto'>
						<button
							type='submit'
							className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPass;
