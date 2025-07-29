import { useState } from "react";
import { PopUpBox } from "./ui/popUpBox";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios, { AxiosError } from "axios";
import { useNotification } from "../hooks/useNotification";
import { NotificationContainer } from "./ui/NotificationContainer";

const passwordRules = [
	{ regex: /.{8,}/, message: "Password must be at least 8 characters long" },
	{ regex: /^.{0,20}$/, message: "Password must be at most 20 characters long" },
	{ regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
	{ regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
	{ regex: /[0-9]/, message: "Password must contain at least one number" },
	{ regex: /[^a-zA-Z0-9]/, message: "Password must contain at least one special character" },
];

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loadingState, setLoadingState] = useState(false);
	const [errors, setErrors] = useState<{ username?: string; password?: string[] }>({});
	const navigate = useNavigate();
	const { showNotification, removeNotification, notifications } = useNotification();

	const validate = () => {
		let valid = true;
		const newErrors: { username?: string; password?: string[] } = {};
		if (username.length < 3 || username.length > 10) {
			newErrors.username = "Username must be between 3 and 10 characters";
			valid = false;
		}
		const passwordErrs = passwordRules
			.filter((rule) => !rule.regex.test(password))
			.map((rule) => rule.message);
		if (passwordErrs.length > 0) {
			newErrors.password = passwordErrs;
			valid = false;
		}
		setErrors(newErrors);
		return valid;
	};

	const handleLogin = async () => {
		if (validate()) {
			// handle login logic here
			setLoadingState(true);
            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                    username: username,
                    password: password,
                });
                
                // Store the token in localStorage
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    console.log('Token stored in localStorage');
                }
                
                showNotification("LogIn Successful! Redirecting...", "success", 2000, () => {
                    navigate("/dashboard");
                });

                
            } catch (error) {
                const e = error as AxiosError;
                if (e.response && e.response.status === 403) {
                    setErrors((prevErrors) => ({ ...prevErrors, username: "Username Not Found" }));
				}
				else if(e.response && e.response.status === 404){
					setErrors((prevErrors) => ({ ...prevErrors, username: "InValid Password" }));
				}
				 else {
                    showNotification("An error occurred during sign in.", "error");
                }
            }
            setLoadingState(false);
		}
	};

	const handleCreateAccount = () => {
			navigate('/signup');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-300">
			<PopUpBox>
				<form
					className="flex flex-col gap-4 sm:w-100 w-3xs p-4"
					onSubmit={(e) => {
						e.preventDefault();
						// handleLogin(); // causing double login alert
					}}
				>
					<div className="text-2xl font-bold text-center mb-2">Login</div>
					<div>
						<label className="block text-sm font-medium mb-1">Username</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-3 py-2 border rounded outline-none border-gray-400"
							placeholder="Enter username"
						/>
						{errors.username && (
							<div className="text-xs text-red-500 mt-1">{errors.username}</div>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-400 rounded outline-none"
							placeholder="Enter password"
						/>
						{errors.password && (
							<ul className="text-xs text-red-500 mt-1 list-disc pl-4">
								{errors.password.map((err, i) => (
									<li key={i}>{err}</li>
								))}
							</ul>
						)}
					</div>
					<div className="flex sm:gap-2 mt-2 justify-between w-full">
						<Button variant="primary" size="md" text="Login" onClick={handleLogin} extraClass="text-sm w-[28%] sm:w-24 mx-[0px]" loading={loadingState}/>
						<Button variant="secondary" size="md" text="Create New Account" onClick={handleCreateAccount} extraClass="sm:w-xs w-[70%] sm:w-3xs text-sm mx-[0px] " />
					</div>
				</form>
			</PopUpBox>
			
			{/* Notification Container */}
			<NotificationContainer 
				notifications={notifications}
				onNotificationComplete={removeNotification}
				onNotificationClose={removeNotification}
			/>
		</div>
	);
}
