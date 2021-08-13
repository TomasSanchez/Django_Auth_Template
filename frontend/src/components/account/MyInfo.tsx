import { useContext, useState } from "react";
import { ContextAuth } from "../../context/AuthContext";
import axiosInstance from "../../context/AxiosConfig";

const MyInfo = () => {
	const [succesMessage, setSuccesMessage] = useState("");
	const { csrfToken, get_current_user_or_log_out, current_logged_user } = useContext(ContextAuth);
	const [user, setUser] = useState({
		email: "",
		first_name: "",
		last_name: "",
		user_name: "",
		about: "",
	});

	if (current_logged_user !== undefined) {
		setUser({
			email: current_logged_user.email,
			first_name: current_logged_user.first_name,
			last_name: current_logged_user.last_name,
			user_name: current_logged_user.user_name,
			about: current_logged_user.about,
		});
	}

	const handleSubmit = async () => {
		try {
			const response = await axiosInstance("/api/accounts/update/<int:pk>", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken!,
				},
				method: "POST",
				withCredentials: true,
				data: JSON.stringify(user),
			});
			if (response.status === 200) {
				setSuccesMessage("Account Updated");
				get_current_user_or_log_out();
			}
		} catch (error) {
			console.error(error);
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
									<div className='grid grid-cols-6 gap-6'>
										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='first-name'
												className='block text-sm font-medium text-gray-700'>
												First name
											</label>
											<input
												value={user.first_name}
												type='text'
												name='first-name'
												id='first-name'
												autoComplete='given-name'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='last-name'
												className='block text-sm font-medium text-gray-700'>
												Last name
											</label>
											<input
												value={user.last_name}
												type='text'
												name='last-name'
												id='last-name'
												autoComplete='family-name'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-4'>
											<label
												htmlFor='email-address'
												className='block text-sm font-medium text-gray-700'>
												Email address
											</label>
											<input
												value={user.email}
												type='text'
												name='email-address'
												id='email-address'
												autoComplete='email'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='country'
												className='block text-sm font-medium text-gray-700'>
												Country / Region
											</label>
											<select
												id='country'
												name='country'
												autoComplete='country'
												className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'>
												<option>United States</option>
												<option>Canada</option>
												<option>Mexico</option>
											</select>
										</div>

										<div className='col-span-6'>
											<label
												htmlFor='street-address'
												className='block text-sm font-medium text-gray-700'>
												Street address
											</label>
											<input
												type='text'
												name='street-address'
												id='street-address'
												autoComplete='street-address'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-6 lg:col-span-2'>
											<label htmlFor='city' className='block text-sm font-medium text-gray-700'>
												City
											</label>
											<input
												type='text'
												name='city'
												id='city'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label htmlFor='state' className='block text-sm font-medium text-gray-700'>
												State / Province
											</label>
											<input
												type='text'
												name='state'
												id='state'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
											/>
										</div>

										<div className='col-span-6 sm:col-span-3 lg:col-span-2'>
											<label
												htmlFor='postal-code'
												className='block text-sm font-medium text-gray-700'>
												ZIP / Postal
											</label>
											<input
												type='text'
												name='postal-code'
												id='postal-code'
												autoComplete='postal-code'
												className='bg-cGray-38 border border-cGray-30 mt-1 block w-full sm:text-sm rounded-md px-2 py-1'
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

export default MyInfo;
