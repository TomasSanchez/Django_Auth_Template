import { useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "./AxiosConfig";
import { AuthProps } from "../types/authTypes";

export const ContextAuth = createContext<AuthProps>({
	isLogedIn: undefined,
	setIsLogedIn: (value: boolean) => undefined,
	csrfToken: "",
	setCsrfToken: (value: string) => undefined,
	current_logged_user: undefined,
	get_current_user_or_log_out: () => undefined,
	logoutCurrentUser: () => undefined,
	get_csrf: () => undefined,
});

const AuthContext = ({ children }: any) => {
	const [isLogedIn, setIsLogedIn] = useState<boolean | undefined>(undefined);
	const [csrfToken, setCsrfToken] = useState<string | undefined>("");
	const [current_logged_user, setUser] = useState();

	const get_current_user_or_log_out = async () => {
		try {
			const response = await axiosInstance("/api/users/me", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken,
				},
				withCredentials: true,
			});
			if (response.status === 200) {
				if (response.data.detail === "LoggedIn") {
					setIsLogedIn(true);
					setCsrfToken(Cookies.get("csrftoken"));
					setUser(response.data.user);
				} else if (response.data.detail === "AnonymousUser") {
					setIsLogedIn(false);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const logoutCurrentUser = async () => {
		try {
			const response = await axiosInstance("/api/users/logout", {
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": csrfToken!,
				},
				method: "POST",
				withCredentials: true,
			});
			if (response.status === 200) {
				setIsLogedIn(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const get_csrf = async () => {
		try {
			await axiosInstance.get("/api/users/get_csrf", {
				withCredentials: true,
			});
			setCsrfToken(Cookies.get("csrftoken")!);
		} catch (error) {
			console.error(error);
		}
	};

	const AuthContextValues = {
		isLogedIn,
		setIsLogedIn,
		csrfToken,
		setCsrfToken,
		current_logged_user,
		get_current_user_or_log_out,
		logoutCurrentUser,
		get_csrf,
	};

	useEffect(() => {
		get_current_user_or_log_out();
		// eslint-disable-next-line
	}, []);
	return <ContextAuth.Provider value={AuthContextValues}>{children}</ContextAuth.Provider>;
};

export default AuthContext;