import { useState } from "react";

const ChangePassword = () => {
	const [password, setPassword] = useState({
		old_password: "",
		new_password: "",
		new_password2: "",
	});

	const handleSubmit = async () => {};

	return <div>Change password view</div>;
};

export default ChangePassword;
