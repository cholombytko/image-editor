import React, { FC, useState } from 'react';
import { FaRegSave } from "react-icons/fa";
import { LuMousePointer2, LuPencilLine, LuUndo, LuRedo } from "react-icons/lu";
import { RiRectangleLine } from "react-icons/ri";
import { TbOvalVertical } from "react-icons/tb";
import { GoArrowUpRight, GoHorizontalRule } from "react-icons/go";
import { IoTextOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

interface ToolbarProps {
  onSelectTool: (tool: string) => void;
  handleSave: () => Promise<void>;
  handleUndo: () => void;
  handleRedo: () => void;
}

const Toolbar: FC<ToolbarProps> = ({ onSelectTool, handleSave, handleUndo, handleRedo }) => {
  const [currentTool, setCurrentTool] = useState('drag');
  const navigate = useNavigate();

  const handleSelectTool = (tool: string) => {
    setCurrentTool(tool);
    onSelectTool(tool);
  };

  const handleExit = (event) => {
    event.preventDefault();
    if(confirm(`Ви впевнені, що хочете вийти?\nВсі незбережені зміни зникнуть`)) {
      navigate('/projects')
    } else {
      return;
    }
  }

  return (
    <div className="toolbar flex flex-row justify-between p-4 bg-transparent mx-0 lg:mx-5">
      <div className='flex flex-row mr-2 lg:mr-0'>
        <div 
          onClick={handleSave}
          className='bg-white p-1 lg:p-2 cursor-pointer outline outline-black rounded-lg hover:bg-gray-300'
        >
          <FaRegSave className='w-4 h-4 lg:w-10 lg:h-10' color='black'></FaRegSave>
        </div>
        <button 
          className='bg-white outline outline-black text-black text-xs lg:text-lg ml-2 lg:ml-3 p-1 lg:p-2 hover:bg-gray-300'
          onClick={handleExit}  
        >
          Вийти
        </button>
      </div>
      <div className='flex flex-row outline outline-black rounded-lg'>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'drag' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('drag')}
        >
          <LuMousePointer2 className='w-4 h-4 lg:w-10 lg:h-10' color='black'></LuMousePointer2>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'line' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('line')}
        >
          <LuPencilLine className='w-4 h-4 lg:w-10 lg:h-10' color='black'></LuPencilLine>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'straight' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('straight')}
        >
          <GoHorizontalRule className='w-4 h-4 lg:w-10 lg:h-10' color='black'></GoHorizontalRule>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'rectangle' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('rectangle')}
        >
          <RiRectangleLine className='w-4 h-4 lg:w-10 lg:h-10' color='black'></RiRectangleLine>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'ellipse' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('ellipse')}
        >
          <TbOvalVertical className='w-4 h-4 lg:w-10 lg:h-10' color='black'></TbOvalVertical>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'arrow' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('arrow')}
        >
          <GoArrowUpRight className='w-4 h-4 lg:w-10 lg:h-10' color='black'></GoArrowUpRight>
        </div>
        <div
          className={`p-1 lg:p-2 cursor-pointer ${currentTool === 'text' ? 'bg-gray-300' : 'hover:bg-gray-300 bg-white'}`}
          onClick={() => handleSelectTool('text')}
        >
          <IoTextOutline className='w-4 h-4 lg:w-10 lg:h-10' color='black'></IoTextOutline>
        </div>
      </div>
      <div className='flex flex-row ml-2 lg:ml-0'>
        <div
          onClick={handleUndo}
          className='bg-white p-1 lg:p-2 cursor-pointer hover:bg-gray-300 outline outline-black rounded-lg mr-2 lg:mr-3'
        >
          <LuUndo className='w-4 h-4 lg:w-10 lg:h-10' color='black'></LuUndo>
        </div>
        <div
          onClick={handleRedo}
          className='bg-white p-1 lg:p-2 cursor-pointer hover:bg-gray-300 outline outline-black rounded-lg'
        >
          <LuRedo className='w-4 h-4 lg:w-10 lg:h-10' color='black'></LuRedo>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
