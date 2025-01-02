import React from "react";
import { FC, useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const authTypeChange = {
	"Login": "Register",
	"Register": "Login"
}

const Auth: FC = () => {
	const [authType, setAuthType] = useState("Login");

	const handleAuthType = (event) => {
		event.preventDefault();
		setAuthType(authTypeChange[authType]);
	}

	return (
		<div className="bg-white outline outline-black outline-2 rounded-lg shadow-md h-full mx-5 lg:mx-20">
			<div className="h-full w-full flex flex-col items-center justify-center">
				<h1 className="text-black text-3xl lg:text-6xl mt-2 lg:mt-0 mb-5">Вітаємо!</h1>
				{authType === "Login" ? <LoginForm/> : <RegisterForm/>}
				<div className="flex flex-col lg:flex-row items-center lg:items-start mt-2 mb-2 lg:mb-0">
					<div className="text-black text-sm lg:text-base"> 
						{authType === "Login" ? 
							"Ще не маєте аккаунту у системі?" :
							"Вже зареєстровані у системі?"
						}
					</div>
					<div
						className="cursor-pointer text-purple-500 ml-0 lg:ml-1 underline hover:text-purple-300 text-sm lg:text-base"
						onClick={handleAuthType}
					>
						{authType === "Login" ? 
							"Зареєструватися" :
							"Увійти"
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Auth;