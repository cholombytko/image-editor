import React, { FC, useEffect, useState } from "react";
import { getAllProjectsByUserId } from "../../lib/project";
import ProjectList from "./ProjectList";
import ProjectCreate from "./ProjectCreate";
import { useNavigate } from 'react-router-dom';

const Project: FC = () => {
  const [projects, setProjects] = useState([]);
  const [currentView, setCurrentView] = useState("create");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const userId = localStorage.getItem("userId")!;
      const token = localStorage.getItem("token")!;
      const response = await getAllProjectsByUserId(token, +userId);
      setProjects(response);
      console.log(projects);
    } catch (e) {
      navigate('/');
      alert('Під час реєстрації/логіну виникла помилка!')
      console.error(e);
    }
  };

  const handleDeleteProject = () => {
    fetchProjects();
  }

  const handleUpdateProject = () => {
    fetchProjects();
  }

  const handleLogOut = async () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen text-black">
      <div className="bg-gray-100 w-screen h-20 flex flex-col items-center">
        <div className="flex justify-center my-4">
          <button
            className={
              `relative focus:outline-none focus:ring-0 focus:border-none
              hover:outline-none hover:ring-0 hover:border-none
              outline-none ring-0 border-none
              px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-lg bg-transparent group`
            }
            onClick={() => setCurrentView("create")}
          >
            СТВОРИТИ ПРОЕКТ
            <span className={
              `absolute bottom-0 left-0 w-full h-0.5 bg-black 
              transform scale-x-0 transition-transform duration-300
              ease-in-out group-hover:scale-x-100`
            }></span>
          </button>
          <button
            className={
              `relative focus:outline-none focus:ring-0 focus:border-none
              hover:outline-none hover:ring-0 hover:border-none
              outline-none ring-0 border-none
              px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-lg bg-transparent group`
            }
            title={projects.length === 0 ? "У вас немає наразі існуючих проектів" : ""}
            onClick={() => setCurrentView("list")}
            disabled={projects.length === 0}
          >
            ВАШІ ПРОЕКТИ
            <span className={
              `absolute bottom-0 left-0 w-full h-0.5 bg-black 
              transform scale-x-0 transition-transform duration-300
              ease-in-out group-hover:scale-x-100`
            }>
            </span>
          </button>
          <button
            className={
              `relative focus:outline-none focus:ring-0 focus:border-none
              hover:outline-none hover:ring-0 hover:border-none
              outline-none ring-0 border-none
              px-2 lg:px-4 py-1 lg:py-2 text-black text-xs lg:text-lg bg-transparent group`
            }
            onClick={handleLogOut}
          >
            ВИЙТИ
            <span className={
              `absolute bottom-0 left-0 w-full h-0.5 bg-black 
              transform scale-x-0 transition-transform duration-300
              ease-in-out group-hover:scale-x-100`
            }>
            </span>
          </button>
        </div>
        <hr className="border-t-2 border-gray-300 w-11/12"/>
      </div>
      <div className={
        `relative w-11/12 bg-white rounded-3xl overflow-hidden h-[calc(100vmin)]
        lg:h-[calc(100vmin_-_300px)] border border-solid border-black p-5
        flex flex-row justify-center`
       }>
        <div
          className={`absolute w-full transition-transform duration-500 transform ${
            currentView === "create" ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ProjectCreate />
        </div>
        <div
          className={`absolute w-full overflow-y-autotransition-transform duration-500 transform ${
            currentView === "list" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className='h-80 lg:h-[450px] overflow-y-auto'>
            <ProjectList 
              project_list={projects} 
              onDeleteProject={handleDeleteProject}
              onUpdateProject={handleUpdateProject}
            />
          </div> 
        </div>
      </div>
      <div className="w-screen flex flex-col items-center">
        <hr className="border-t-2 border-gray-300 w-11/12"/>
        <div className="bg-gray-100 w-screen h-12 lg:h-20 text-center flex items-center justify-center">
          <h2 className="text-sm lg:text-xl text-black">ДИПЛОМНИЙ ПРОЕКТ СТУДЕНТА ГРУПИ ІП-04 - ЧОЛОМБИТЬКА КИРИЛА</h2>
        </div>
      </div>
    </div>
  );
}

export default Project;
