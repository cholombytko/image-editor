import axios from "axios";

const BACKEND_PROJECT_URL = "http://localhost:3000/project/"

interface ICreateProject {
	userId: number;
	title: string;
	image: string;
}

interface IUpdateProject {
	userId: number;
	title?: string;
	image?: string;
}

export const getAllProjectsByUserId = async (access_token: string, userId: number) => {
	try {
		const response = await axios.get(`${BACKEND_PROJECT_URL}findByUserId/${userId}`, 
			{ headers: { Authorization: `Bearer ${access_token}` }}
		);
		const data = response.data;
		return data; 
	}	catch(e) {
		console.error(e.response.data.message);
		throw new Error(e);
	}
}
 
export const getProjectById = async (access_token: string, project_id: number) => {
	try {
		const response = await axios.get(`${BACKEND_PROJECT_URL}${project_id}`, 
			{ headers: { Authorization: `Bearer ${access_token}` }}
		);
		const data = response.data;
		return data; 
	}	catch(e) {
		console.error(e.response.data.message);
		return e.response.data.message;
	}
}

export const createProject = async (payload: ICreateProject, access_token: string) => {
	try {
		const response = await axios.post(`${BACKEND_PROJECT_URL}`, 
			payload,
			{ headers: { Authorization: `Bearer ${access_token}` }}
		);
		const data = response.data;
		return data; 
	}	catch(e) {
		console.error(e);
		throw new Error(e.response.data.message);
	}
}

export const updateProjectById = async (
	payload: IUpdateProject, 
	access_token: string, 
	project_id: number
) => {
	try {
		const response = await axios.patch(`${BACKEND_PROJECT_URL}${project_id}`, 
			payload,
			{ headers: { Authorization: `Bearer ${access_token}` }}
		)
		const data = response.data;
		console.log(data);
		return data; 
	}	catch(e) {
		console.error(e);
		return e.response.data.message;
	}
}

export const deleteProjectById = async (project_id: number, access_token: string) => {
	try {
		const response = await axios.delete(`${BACKEND_PROJECT_URL}${project_id}`,
			{ headers: { Authorization: `Bearer ${access_token}` }}
		)
		const data = response.data;
		console.log(data);
		return data; 
	}	catch(e) {
		throw new Error(e);
	}
}