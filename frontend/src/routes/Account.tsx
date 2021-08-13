import { useState } from "react";

const Account = () => {
	const [tab, setTab] = useState(1);

	return (
		<div className='container mt-8 m-5 rounded-lg'>
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
			<div className='rounded-lg bg-gray-100 border border-gray-200 py-2 border-t-0 rounded-t-none h-96'></div>
		</div>
	);
};

export default Account;
