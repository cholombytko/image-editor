import React, { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import Sidebar from "./Sidebar";
import { getProjectById, updateProjectById } from "../../lib/project";

const EditPage: FC = () => {
  const { projectId } = useParams();

  const [projectImageUrl, setProjectImageUrl] = useState("");
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeEnabled, setStrokeEnabled] = useState(false);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [tool, setTool] = useState('drag');
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("token")!;
        const data = await getProjectById(token, projectId);
        console.log(data);
        setProjectImageUrl(data.image.image);
      } catch (error) {
        console.error("Error fetching project image:", error);
      }
    };

    if (projectId) {
      fetchImage();
    }
  }, [projectId]);

  useEffect(() => {
    if (tool === 'line' || tool === 'arrow' || tool === 'straight') {
      setStrokeEnabled(true);
    } else {
      setStrokeEnabled(false);
    }
  }, [tool]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")!;
      const userId = +localStorage.getItem("userId")!;
      const image = stageRef.current.toDataURL();
      const payload = { image, userId };
      console.log(payload)
			const data = await updateProjectById(payload, token, projectId);
      alert("Проект було збережено успішно")
			console.dir(data);
		} catch(e) {
      alert("Під час збереження виникла помилка")
		}
  }

  const handleUndo = () => {
    canvasRef.current.handleUndo();
  }

  const handleRedo = () => {
    canvasRef.current.handleRedo();
  }

  return (
    <div className="edit-page flex flex-col justify-between lg:justify-start max-lg:items-center h-screen w-screen">
      <Toolbar onSelectTool={setTool} handleSave={handleSave} handleUndo={handleUndo} handleRedo={handleRedo}/>
      <div className="main-content flex flex-col lg:flex-row lg:justify-between items-center justify-center w-full">
        <div className="lg:ml-5 lg:mr-5 outline outline-black outline-2 rounded-lg w-fit h-auto p-1">
          <Canvas 
            imageUrl={projectImageUrl}
            fillColor={fillColor}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
            strokeEnabled={strokeEnabled}
            fontFamily={fontFamily}
            fontSize={fontSize}
            text={text}
            tool={tool}
            stageRef={stageRef}
            ref={canvasRef}
          />
        </div>
        <div className="w-11/12 lg:w-1/4 lg:mr-10 mt-10 outline outline-black h-auto rounded-lg bg-white">
          <Sidebar
            tool={tool}
            onFillColorChange={setFillColor}
            onStrokeColorChange={setStrokeColor}
            onStrokeWidthChange={setStrokeWidth}
            onStrokeToggle={setStrokeEnabled}
            onTextChange={setText}
            onFontFamilyChange={setFontFamily}
            onFontSizeChange={setFontSize}
            currentStrokeWidth={strokeWidth}
            mainColor={fillColor}
            strokeColor={strokeColor}
            isStrokeSelected={strokeEnabled}
            text={text}
            fontSize={fontSize}
            fontFamily={fontFamily}
          />
        </div>
      </div>  
    </div>
  );
};

export default EditPage;
