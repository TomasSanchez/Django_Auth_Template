import { SyntheticEvent, useContext, useState } from "react";
import { ContextAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../context/AxiosConfig";

const ChangePassword = () => {
	const { logoutCurrentUser, csrfToken, get_current_user_or_log_out } = useContext(ContextAuth);
	const [error, setError] = useState("");
	const [password, setPassword] = useState({
		old_password: "",
		new_password: "",
		new_password2: "",
	});
	const history = useHistory();

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await axiosInstance("/api/users/change_password", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				method: "PUT",
				data: JSON.stringify(password),
				withCredentials: true,
			});
			if (response.status === 200) {
				// logoutCurrentUser();
				// get_current_user_or_log_out();
				// history.push("/login"); // as we are still loged in login sends us to home page, then logs out
			}
		} catch (error) {
			if (error.response.status === 403) {
				setError("Wrong password");
				setPassword({
					old_password: "",
					new_password: "",
					new_password2: "",
				});
			} else {
				setError("Something went wrong, please refresh and try again.");
			}
		}
	};

	return (
		<>
			<div className='mt-10 sm:mt-0'>
				<div className='md:grid md:grid-cols-3 md:gap-6'>
					<div className='md:col-span-1'>
						<div className='px-4 sm:px-0'>
							<h3 className='text-lg mt-2 font-medium leading-6 text-gray-900'>Personal Information</h3>
						</div>
					</div>
					<div className='mt-5 md:mt-0 md:col-span-2'>
						<form onSubmit={handleSubmit}>
							<div className='shadow overflow-hidden sm:rounded-md'>
								<div className='px-4 py-5 bg-white sm:p-6'>
									<div className='flex flex-col gap-6 w-70/100'>
										<div className=''>
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700'>
												Current Password
											</label>
											<input
												value={password.old_password}
												onChange={(e) =>
													setPassword({ ...password, old_password: e.target.value })
												}
												type='password'
												name='old_password'
												id='old_password'
												autoComplete='given-name'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className=''>
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700'>
												New Password
											</label>
											<input
												value={password.new_password}
												onChange={(e) =>
													setPassword({ ...password, new_password: e.target.value })
												}
												type='password'
												name='password'
												id='pasword'
												autoComplete='family-name'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className=''>
											<label
												htmlFor='password'
												className='block text-sm font-medium text-gray-700'>
												Confirm new Password
											</label>
											<input
												value={password.new_password2}
												onChange={(e) =>
													setPassword({ ...password, new_password2: e.target.value })
												}
												type='password'
												name='password2'
												id='pasword2'
												autoComplete='email'
												className={`bg-cGray-38 border border-cGray-30 block w-full sm:text-sm rounded-md px-2 py-1 focus:ring-2 outline-none ${
													password.new_password === password.new_password2 &&
													password.new_password2.length > 0
														? " focus:ring-green-600 focus:border-green-500 border-green-400 "
														: " focus:ring-red-600 focus:border-red-500 border-gray-600"
												}`}
											/>
										</div>
									</div>
								</div>
								<div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
									<button
										type='submit'
										className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className='hidden sm:block' aria-hidden='true'>
				<div className='py-5'>
					<div className='border-t border-gray-200' />
				</div>
			</div>
		</>
	);
};

export default ChangePassword;
