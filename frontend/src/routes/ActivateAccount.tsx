import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../context/AxiosConfig";

document.title = "Activate Account";

const ActivateAccount = () => {
	const [isValidToken, setIsValidToken] = useState<boolean | undefined>(undefined);
	const [error, setError] = useState("");
	const search = useLocation().search;
	const token = new URLSearchParams(search).get("verification_token");
	const user_id = new URLSearchParams(search).get("user_id");

	const checkToken = async () => {
		try {
			const response = await axiosInstance("/api/users/verify", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				data: JSON.stringify({
					token: token,
					id: user_id,
				}),
			});
			if (response.status === 204) {
				setIsValidToken(true);
			} else {
				setIsValidToken(false);
			}
		} catch (error) {
			setError("Something went wrong.");
		}
	};

	useEffect(() => {
		checkToken();
		// eslint-disable-next-line
	}, []);

	return isValidToken === undefined ? (
		<div>
			{error.length > 0 ? (
				<div className='mx-auto lg:w-96 w-48 text-red-400 mt-10 rounded-lg shadow-md px-3 py-2 bg-gray-100 border-gray-200'>
					{error}
				</div>
			) : (
				<div className='flex flex-col mt-10 rounded-lg shadow-lg border border-gray-100 px-10 py-3 mx-auto w-56'>
					<div className='mx-auto my-4'>Checking Token</div>
					<div className=' flex justify-center items-center mb-2'>
						<div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cViolet-39 '></div>
					</div>
				</div>
			)}
		</div>
	) : !isValidToken ? (
		<div className='mx-auto lg:w-96 w-48 mt-10 py-2 px-5 bg-red-200 rounded-lg shadow-lg border-cViolet-40'>
			Invalid Token! Please request again.
		</div>
	) : (
		<>
			<div className='mx-auto lg:w-96 w-48 mt-10 py-2 px-5 bg-green-200 rounded-lg shadow-lg border-cViolet-40'>
				Valid Token, account verified!
			</div>
		</>
	);
};

export default ActivateAccount;
