import axios from "axios";

const BACKEND_AUTH_URL = "http://localhost:3000/auth/"

interface ISignUp {
	name: string;
	email: string;
	password: string;
}

interface ISignUpResponseData {
	userId: number;
	access_token: string;
}

interface ISignIn {
	email: string;
	password: string;
}

export const signUp = async (payload: ISignUp) => {
	try {
		const response = await axios.post(`${BACKEND_AUTH_URL}signUp`, payload)
		const data: ISignUpResponseData = response.data;
		return data; 
	}	catch(e) {
		console.error(e.response.data.message);
		return e.response.data.message;
	}
}

export const signIn = async (payload: ISignIn) => {
	try {
		const response = await axios.post(`${BACKEND_AUTH_URL}signIn`, payload)
		const data = response.data;
		console.log(data);
		return data; 
	}	catch(e) {
		console.error(e.response.data.message);
		return e.response.data.message;
	}
}