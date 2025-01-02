import React, { FC, useState } from "react";
import { createProject } from "../../lib/project";
import { useNavigate } from "react-router-dom";

const ProjectCreate: FC = () => {
	const [title, setTitle] = useState("");
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [bgColor, setBgColor] = useState("#ffffff");
	const [image, setImage] = useState<File | null>(null);
	const [imageError, setImageError] = useState<string | null>(null);
	const [projectCreateError, setProjectCreateError] = useState('');

	const navigate = useNavigate();

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const validImageTypes = ['image/jpeg', 'image/png'];
			const maxSize = 5 * 1024 * 1024; // 5MB

			if (!validImageTypes.includes(file.type)) {
				setImageError('Invalid file type. Please upload an image file (jpeg, png).');
				setImage(null);
				return;
			}

			if (file.size > maxSize) {
				setImageError('File size is too large. Please upload an image less than 5MB.');
				setImage(null);
				return;
			}

			setImageError(null);
			setImage(file);
		}
	};

	const generateBase64ImageFromParameters = (): string => {
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.fillStyle = bgColor;
			ctx.fillRect(0, 0, width, height);
		}
		return canvas.toDataURL('image/png');
	};

	const convertImageToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (reader.result) {
					resolve(reader.result as string);
				} else {
					reject('Could not convert file to base64');
				}
			};
			reader.readAsDataURL(file);
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			let imageBase64:string | null = null;
			if (image) {
				imageBase64 = await convertImageToBase64(image);
			} else if(width && height) {
				imageBase64 = generateBase64ImageFromParameters();
			}
			if (!imageBase64) {
				return;
			}
			console.log({
				title,
				width,
				height,
				bgColor,
				image: imageBase64,
			});
			const token = localStorage.getItem('token')!;
			const userId = +localStorage.getItem('userId')!;
			const response = await createProject({ userId, title, image: imageBase64 }, token);
			if(response.id) navigate(`/editPage/${response.id}`);
		} catch (e) {
			alert(`Під час створення виникла помилка, Помилка${e}`);
			console.error(e);
		}
	};

	return (
		<div className="max-w-lg mx-auto p-3 lg:p-5">
			<h2 className="text-black text-sm lg:text-3xl p-0 mt-0 text-center">СТВОРІТЬ НОВИЙ ПРОЕКТ!</h2>
			<hr className="border-t-2 border-gray-300 w-full my-1 lg:my-4" />
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex flex-col"> 
					<div>
						<label className="block text-xs lg:text-sm text-black font-bold">
							Назва проекту (обовʼязково)
						</label>
						<div className="p-0 lg:p-2 border-black border-2 rounded-lg bg-white my-2">
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
								className="bg-transparent w-full text-black focus:none"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<div>
							<label className="block text-sm text-center text-black">
								Ви можете використати існуюче зображення!
							</label>
							<input
								type="file"
								onChange={handleImageUpload}
								className={`mt-1 block w-full text-xs lg:text-sm text-gray-500
								 file:mr-4 file:py-0 lg:file:py-2 file:px-4 file:border-black file:text-black 
								 file:rounded-md file:text-sm file:font-bold file:bg-white
								  hover:file:bg-gray-100`}
							/>
							{imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
						</div>
						<div>
							<div className="flex flex-row justify-around items-center">
								<hr className="border-t-2 border-gray-300 w-full my-2 lg:my-4" />
								<h2 className="text-black text-sm lg:text-xl p-0 mx-2 text-center">АБО</h2>
								<hr className="border-t-2 border-gray-300 w-full my-2 lg:my-4" />
							</div>
							<h2 className="text-black text-xs lg:text-sm p-0 mx-2 my-3 mt-0 text-center">
								Створити зображення, використовуючи параметри
							</h2>
						</div>
						<div className="flex flex-row justify-between items-center">
							<div className="w-2/5 mt-0 lg:mt-1">
								<label className="block text-xs lg:text-sm font-medium text-gray-700">
									Ширина(у пікселях)
								</label>
								<input
									type="number"
									value={width}
									onChange={(e) => setWidth(Number(e.target.value))}
									className="w-full p-0 text-sm lg:text-base lg:p-1 border-black border-2 rounded-lg bg-white my-0 lg:my-2 text-black"
								/>
							</div>
							<div className="w-1/3 mt-0 lg:mt-1">
								<label className="block text-xs lg:text-sm font-medium text-gray-700">
									Висота(у пікселях)
								</label>
								<input
									type="number"
									value={height}
									onChange={(e) => setHeight(Number(e.target.value))}
									className="w-full p-0 lg:p-1 text-sm lg:text-base border-black border-2 rounded-lg bg-white my-0 lg:my-2 text-black"
								/>
							</div>
							<div className="w-1/4">
								<label className="block text-xs lg:text-sm font-medium text-gray-700">
									Колір фону
								</label>
								<input
									type="color"
									value={bgColor}
									onChange={(e) => setBgColor(e.target.value)}
									className="mt-0 lg:mt-1 block w-full h-7 lg:h-10 border border-gray-300 rounded-md shadow-sm"
								/>
							</div>
						</div>
					</div>
				</div>
					<button
						type="submit"
						className={
							`w-full py-1 lg:py-2 px-2 lg:px-4 text-sm border-black border-2 font-medium rounded-md text-black bg-white hover:bg-gray-100`
						}
					>
						Створити проект!
					</button>
					{projectCreateError && <p className="text-red-500 text-sm mt-1">{projectCreateError}</p>}
			</form>
		</div>
	);
};

export default ProjectCreate;
