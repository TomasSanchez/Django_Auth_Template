import { useState } from "react";
import axiosInstance from "../context/AxiosConfig";

document.title = "Reset password";

const ResetSend = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState("");
	const [succes, setSucces] = useState("");

	const handleSubmit = async () => {
		try {
			const response = await axiosInstance("/api/users/reset_password_token", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				data: JSON.stringify(email),
			});
			if (response.status === 204) {
				setSucces("Email Sent!");
			}
		} catch (error) {
			setError("Something went wrong, please try again.");
			console.error(error);
		}
	};

	return (
		<div className=' mt-10'>
			<div className='mx-auto lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto border border-gray-200 shadow-lg w-full mt-10 md:mt-0'>
				<h2 className='text-Black text-lg  font-medium title-font mb-5'>Reset Password</h2>
				{error && <h2 className='lg:w-2/6 md:w-1/2 text-red-400 w-auto'>{error}</h2>}
				{succes && <h2 className='lg:w-2/6 md:w-1/2 text-cGreen-31 w-auto'>{succes}</h2>}
				<form onSubmit={handleSubmit}>
					<div className='relative mb-4'>
						<label htmlFor='email' className='leading-7 text-sm text-gray-700'>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='w-full bg-gray-500 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
						/>
					</div>

					<div className='flex flex-row justify-between'>
						<button
							type='submit'
							className='text-white bg-indigo-700 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
							Send reset Link
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetSend;
