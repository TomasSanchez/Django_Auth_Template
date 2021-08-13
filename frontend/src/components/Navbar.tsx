import { useContext } from "react";
import { ContextAuth } from "../context/AuthContext";

const Navbar = () => {
	const { isLogedIn, logoutCurrentUser } = useContext(ContextAuth);

	const handleLogout = () => {
		logoutCurrentUser();
	};

	return (
		<div className='border-b border-gray-500 shadow md:h-7/100 h-20/100 flex w-full'>
			<header className='text-black bg-gray-200 body-font w-full h-full'>
				<div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
					<a href='/' className='flex title-font font-medium items-center text-black mb-4 md:mb-0'>
						<span className='ml-3 text-xl'>Home</span>
					</a>
					<nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center'>
						{isLogedIn && (
							<a href='/chat' className='mr-5 hover:text-black text-gray-700'>
								MyChats
							</a>
						)}
						<a href='/about' className='mr-5 hover:text-black text-gray-700'>
							About
						</a>
					</nav>

					{!isLogedIn ? (
						<div>
							<a
								href='/login'
								className='inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0'>
								Login
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</a>
							<a
								href='/signup'
								className='inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0'>
								SignUp
								<svg
									fill='none'
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									className='w-4 h-4 ml-1'
									viewBox='0 0 24 24'>
									<path d='M5 12h14M12 5l7 7-7 7' />
								</svg>
							</a>
						</div>
					) : (
						<div className='inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-400 rounded text-base mt-4 md:mt-0'>
							<button onClick={handleLogout}>Log Out</button>
						</div>
					)}
				</div>
			</header>
		</div>
	);
};

export default Navbar;
