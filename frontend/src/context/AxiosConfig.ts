import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axiosInstance.defaults.xsrfCookieName = "csrftoken";

export default axiosInstance;
