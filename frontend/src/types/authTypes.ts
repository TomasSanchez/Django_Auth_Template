export type userType = {
	id: number;
	email: string;
};

export type accountType = {
	id: number;
	email: string;
	user_name: string;
	first_name: string;
	last_name: string;
};

export type AuthProps = {
	isLogedIn: boolean | undefined;
	setIsLogedIn: (value: boolean) => void;
	csrfToken: string | undefined;
	setCsrfToken: (value: string) => void;
	current_logged_user: userType | undefined;
	get_current_user_or_log_out: VoidFunction;
	logoutCurrentUser: VoidFunction;
	get_csrf: VoidFunction;
};
