import { useState } from "react";
import ChangePassword from "../components/account/ChangePassword";
import MyInfo from "../components/account/MyInfo";

const Account = () => {
	const [tab, setTab] = useState(1);

	return (
		<div className='container mt-8 rounded-lg h-80/100 mx-auto'>
			<div className=' rounded-lg bg-gray-100 border border-gray-200 pt-2 rounded-b-none '>
				<div className=''>
					<nav className='flex flex-col sm:flex-row'>
						<button
							onClick={() => setTab(1)}
							className={`text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none ${
								tab === 1 ? " border-b-2 font-medium border-purple-500" : "hover:border-purple-300 "
							} `}>
							My Info
						</button>
						<button
							onClick={() => setTab(2)}
							className={`text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none ${
								tab === 2 ? " border-b-2 font-medium border-purple-500" : "hover:border-purple-300 "
							} `}>
							Change Password
						</button>
						<button
							onClick={() => setTab(3)}
							className={`text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none ${
								tab === 3 ? " border-b-2 font-medium border-purple-500" : "hover:border-purple-300 "
							} `}>
							Other info
						</button>
						<button
							onClick={() => setTab(4)}
							className={`text-gray-600 py-4 px-6 block hover:text-purple-500 focus:outline-none ${
								tab === 4 ? " border-b-2 font-medium border-purple-500" : "hover:border-purple-300 "
							} `}>
							More info
						</button>
					</nav>
				</div>
			</div>
			<div className='rounded-lg bg-gray-100 border border-gray-200 p-3 border-t-0 rounded-t-none'>
				{tab === 1 && (
					<div>
						{" "}
						<MyInfo />{" "}
					</div>
				)}
				{tab === 2 && (
					<div>
						{" "}
						<ChangePassword />{" "}
					</div>
				)}
				{tab === 3 && <div> Other info </div>}
				{tab === 4 && <div> More info </div>}
			</div>
		</div>
	);
};

export default Account;
