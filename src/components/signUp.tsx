import { useState } from "react";
import { PopUpBox } from "./ui/popUpBox";
import { Button } from "./ui/Button";
import axios, { type AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const passwordRules = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    { regex: /^.{0,20}$/, message: "Password must be at most 20 characters long" },
    { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
    { regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
    { regex: /[0-9]/, message: "Password must contain at least one number" },
    { regex: /[^a-zA-Z0-9]/, message: "Password must contain at least one special character" },
];

export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ username?: string; password?: string[] }>({});
    const [loadingState, setLoadingState] = useState(false);
    const navigate = useNavigate();

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
    const handleSignup = async () => {
        if (validate()) {
            setLoadingState(true);
            try {
                await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                    username: username,
                    password: password,
                });
                alert("Sign Up Successful! Redirecting...");
                navigate("/login");

                
            } catch (error) {
                const e = error as AxiosError;
                if (e.response && e.response.status === 403) {
                    setErrors((prevErrors) => ({ ...prevErrors, username: "Username already exists" }));
                } else {
                    alert("An error occurred during sign up.");
                }
            }
            setLoadingState(false);
        }
    };
    const handleAlreadyHaveAccount = () => {
        navigate('/login');
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <PopUpBox>
                <form
                    className="flex flex-col gap-4 sm:w-100 w-3xs p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        // handleSignup(); // causing double login alert
                    }}
                >
                    <div className="text-2xl font-bold text-center mb-2">SignUp</div>
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
                        <Button variant="primary" size="md" text="SignUp" onClick={handleSignup} extraClass="text-sm w-[28%] sm:w-24 mx-[0px]" loading={loadingState}/>
                        <Button variant="secondary" size="md" text="Already have Account" onClick={handleAlreadyHaveAccount} extraClass="sm:w-xs w-[70%] sm:w-3xs text-sm mx-[0px] " />
                    </div>
                </form>
            </PopUpBox>
        </div>
    );
}
