import { FC } from "react";
import Auth from "./Auth";
import React from "react";
import image from "../../assets/auth-img.jpg";

const AuthPage: FC = () => {
	return (
		<div className="w-full flex flex-col lg:flex-row">
			<img className="ml-0 lg:ml-5 size-0 lg:size-1/2 lg:w-1/2 rounded-lg" src={image}></img>
			<div className="w-full lg:w-1/2 mx-4 lg:mx-0">
				<Auth/>
			</div>
		</div>
	);
}

export default AuthPage;