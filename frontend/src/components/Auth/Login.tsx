import React from "react";
import { FC, useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { signIn } from "../../lib/auth";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleVision = (event) => {
		event.preventDefault();
		setIsVisible(!isVisible);
	}

	const handleEmail = (event) => {
		event.preventDefault();
		setEmail(event.target.value);
		return;
	}

	const handlePassword = (event) => {
		event.preventDefault();
		setPassword(event.target.value);
		return;
	}

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const data = await signIn({ email, password });
			console.log(data);
			if(typeof data === 'string') setError(data);
			else {
				localStorage.setItem("token", data.access_token);
				localStorage.setItem("userId", data.userId);
				setError('');
				navigate('/projects');
			}
		} catch(e) {
		}
	}

	return (
		<div>
			<form onSubmit={handleLogin} className="flex flex-col items-center w-full p-4 lg:p-0">
				<div className="flex h-12 bg-gray-200 m-2 p-2 rounded-lg w-full">
					<MdEmail className="size-8 lg:size-10 self-center p-2" color="black"/>
					<input
						value={email}
						onChange={handleEmail}
						className="w-fit bg-transparent text-black text-sm lg:text-base"
						placeholder="Електронна пошта">
					</input>
				</div>
				<div className="flex h-12 bg-gray-200 m-2 p-2 rounded-lg w-full">
					<MdPassword className="size-8 lg:size-10 self-center p-2" color="black"/>
					<input
						type={isVisible ? "text" : "password"}
						className="w-fit bg-transparent text-black text-sm lg:text-base" 
						placeholder="Пароль"
						value={password}
						onChange={handlePassword}
					>
						</input>
						{isVisible ? 
						<AiFillEyeInvisible 
							className="cursor-pointer self-center 
						hover:fill-gray-500" 
							color="black" 
							onClick={handleVision}
						/> : 
						<AiFillEye 
							className="cursor-pointer self-center
							hover:fill-gray-500"
						 color="black" 
						 onClick={handleVision}
						/>}
				</div>
				<div className="text-red-600 self-center">{error ? error : ''}</div>
				<button type="submit" className="text-sm lg:text-base bg-purple-500 m-1 lg:m-2 p-2 hover:bg-purple-400 w-full">Увійти</button>
			</form>
		</div>
	);
}

export default LoginForm;