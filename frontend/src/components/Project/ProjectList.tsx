import { FC } from "react";
import React from "react";
import ProjectBlock from "./ProjectBlock";

interface IProject {
	id: number;
	title: string;
	user: object;
	image: object;
}

interface IProjectListProps {
	project_list: Array<IProject>;
	onDeleteProject: () => void;
	onUpdateProject: () => void;
};

const ProjectList: FC<IProjectListProps> = (props) => {
	return (
		<div className="mx-10 flex flex-row justify-between lg:justify-start flex-wrap">
			{props.project_list.map((project) => (
				<ProjectBlock
					project_id={project.id}
					key={project.id}
					title={project.title}
					onDeleteProject={props.onDeleteProject}
					onUpdateProject={props.onUpdateProject}
				/>
			))}
		</div>
	);
}

export default ProjectList;