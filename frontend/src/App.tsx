import { FC } from "react";
import React from "react";
import AuthPage from "./components/Auth/AuthPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Project from "./components/Project/Project";
import EditPage from "./components/EditPage/EditPage";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>}/>
        <Route path="/projects" element={<Project/>}/>
        <Route path="/editPage/:projectId" element={<EditPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;