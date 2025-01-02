import React, { useState } from "react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProjectById, updateProjectById } from "../../lib/project";

interface IProjectBlockProps {
	project_id: number;
  title: string;
	onDeleteProject: () => void;
	onUpdateProject: () => void;
}

const ProjectBlock: FC<IProjectBlockProps> = ({ project_id, title, onDeleteProject, onUpdateProject }) => {
	const navigate = useNavigate();
	const [editingTitle, setEditingTitle] = useState(false);
	const [newTitle, setNewTitle] = useState(title);

	const handleBlockClick = (e) => {
		e.preventDefault();
		navigate(`/editPage/${project_id}`);
	}

	const handleChangeTitle = () => {
		setEditingTitle(true);
	};

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value);
	};

	const handleTitleSubmit = async (event) => {
		event.preventDefault();
		try {
      const token = localStorage.getItem("token")!;
      const userId = +localStorage.getItem("userId")!;
      const payload = { title: newTitle, userId };
      console.log(payload)
			const data = await updateProjectById(payload, token, project_id);
			if(data === `A project with this title already exists.`) {
				alert("Під час зміни назви виникла помилка");
				setEditingTitle(false);
				return;
			} else {
				alert("Назва була змінена успішно");
				setEditingTitle(false);
				onUpdateProject();
				return;
			} 
		} catch(e) {
      alert("Під час зміни назви виникла помилка")
		}
	};


	const handleDeleteProject = async (event) => {
		event.preventDefault();
    if(confirm(`Ви впевнені, що хочете видалити проект?`)) {
      const token = localStorage.getItem('token')!;
			const response = await deleteProjectById(project_id, token);
			console.log(response);
			onDeleteProject();
    } else {
      return;
    }
	}

  return (
    <div 
			className="outline max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-5 lg:m-1 p-4 lg:p-6"
		>
			{editingTitle ? (
				<input
					type="text"
					value={newTitle}
					onChange={handleTitleChange}
					onBlur={handleTitleSubmit}
					className="text-base lg:text-2xl ring-1 font-bold mb-2 text-gray-800 bg-white text-center hover:bg-gray-300 rounded-lg outline-none inline-block w-auto"
					style={{ minWidth: `${title.length}ch` }}
				/>
			) : (
      <h1 
				onClick={handleBlockClick}
				className="cursor-pointer text-base lg:text-2xl font-bold mb-2 text-gray-800 text-center hover:bg-gray-300 rounded-lg"
			>
				{title}
			</h1>
			)}
			<table>
				<tr>
					<th className="border-x-orange-700">
						<button 
							onClick={handleChangeTitle}
							className="text-sm lg:text-base bg-transparent text-black p-0 lg:p-1 mx-1 lg:mx-2 mt-1 lg:mt-2 outline"
						>
							Змінити назву
						</button>
					</th>
					<th className="border-x-orange-700">
						<button 
							onClick={handleDeleteProject}
							className="text-sm lg:text-base bg-transparent text-red-500 p-0 lg:p-1 mx-1 lg:mx-2 mt-1 lg:mt-2"
						>
							Видалити
						</button>
					</th>
				</tr>
			</table>
    </div>
  );
};

export default ProjectBlock;
