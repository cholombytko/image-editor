import React, { FC, useState } from 'react';

interface SidebarProps {
  tool: string;
  onFillColorChange: (color: string) => void;
  onStrokeColorChange: (color: string) => void;
  onStrokeWidthChange: (width: number) => void;
  onStrokeToggle: (enabled: boolean) => void;
  onTextChange: (text: string) => void;
  onFontSizeChange: (fontSize: number) => void;
  onFontFamilyChange: (fontFamily: string) => void;
  currentStrokeWidth;
  mainColor;
  strokeColor;
  isStrokeSelected;
  text;
  fontSize;
  fontFamily;
}

const Sidebar: FC<SidebarProps> = ({ 
  tool, 
  onFillColorChange,
  onStrokeColorChange, 
  onStrokeWidthChange,
  onStrokeToggle,
  onTextChange,
  onFontSizeChange,
  onFontFamilyChange,
  currentStrokeWidth,
  mainColor,
  strokeColor,
  isStrokeSelected,
  text,
  fontSize,
  fontFamily,
}) => {
  // const [currentStrokeWidth, setCurrentStrokeWidth] = useState(1);
  // const [mainColor, setMainColor] = useState('#000000');
  // const [strokeColor, setStrokeColor] = useState('#000000');
  // const [isStrokeSelected, setStrokeSelected] = useState(false);
  // const [text, setText] = useState('');
  // const [fontSize, setFontSize] = useState(12);
  // const [fontFamily, setFontFamily] = useState('Arial');

  return (
    <div className="sidebar p-4 bg-transparent flex flex-col items-center">
      <div className='text-black font-bold'>
        Налаштування
      </div>
      {tool === 'text' && (
        <div>
          <div className="mb-4">
            <label className='text-black font-bold'>Текст</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => {
                //setText(e.target.value)
                onTextChange(e.target.value)
              }} 
              className="ml-2 w-1/2 p-0 lg:p-1 text-sm lg:text-base border-black border-2 rounded-lg bg-white my-0 lg:my-2 text-black" 
            />
          </div>
          <div className="mb-4">
            <label className='text-black font-bold'>Колір тексту</label>
            <input 
              type="color" 
              onChange={(e) => {
                onFillColorChange(e.target.value)
                //setMainColor(e.target.value)
              }}
              className="ml-2" />
          </div>
          <div className="mb-4">
            <label className='text-black font-bold'>Розмір шрифту</label>
            <input 
              type="number" 
              value={fontSize} 
              onChange={(e) => {
                //setFontSize(+e.target.value)
                onFontSizeChange(Number(e.target.value))
              }} 
              className="ml-2 w-1/2 p-0 lg:p-1 text-sm lg:text-base border-black border-2 rounded-lg bg-white my-0 lg:my-2 text-black" 
            />
          </div>
          <div className="mb-4">
            <label className='text-black font-bold'>Шрифт</label>
            <select
              value={fontFamily}
              onChange={(e) => {
                //setFontFamily(e.target.value)
                onFontFamilyChange(e.target.value)
              }}
              className="ml-2 w-1/2 p-0 lg:p-1 text-sm lg:text-base border-black border-2 rounded-lg bg-white my-0 lg:my-2 text-black"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Montserrat">Montserrat</option>
            </select>
          </div>
          <div className="mb-4">
            <label className='text-black font-bold'>Додати обводку</label>
            <input 
              type="checkbox" 
              onChange={(e) => {
                //setStrokeSelected(e.target.checked);
                onStrokeToggle(e.target.checked);
              }} 
              className="ml-2" 
              />
          </div>
          {isStrokeSelected && (
            <div>
              <div className="mb-4">
                <label className='text-black font-bold'>Колір обводки</label>
                <input 
                  type="color" 
                  value={strokeColor} 
                  onChange={(e) => {
                    //setStrokeColor(e.target.value)
                    onStrokeColorChange(e.target.value)
                  }} 
                  className="ml-2" />
              </div>
              <div className="mb-4 flex flex-col items-center">
                <label className='text-black font-bold'>Ширина обводки</label>
                <input 
                  type="range"
                  min='1'
                  max='15'
                  step='1'
                  value={currentStrokeWidth}
                  onChange={(e) => {
                    //setCurrentStrokeWidth(+e.target.value)
                    onStrokeWidthChange(Number(e.target.value))
                  }} 
                  className="ml-2 accent-black" 
                />
                <div className='text-black font-bold ml-2'>{currentStrokeWidth}</div>
              </div>
            </div>
          )}
        </div>
        )}
        {tool === 'line' && (
          <div>
            <div className="mb-4">
              <label className='text-black font-bold'>Колір лінії</label>
              <input 
                type="color" 
                value={strokeColor} 
                onChange={(e) => {
                  //setStrokeColor(e.target.value)
                  onStrokeColorChange(e.target.value)
                }} 
                className="ml-2" />
            </div>
            <div className="mb-4 flex flex-col items-center">
              <label className='text-black font-bold'>Товщина лінії</label>
              <input 
                type="range"
                min='1'
                max='15'
                step='1'
                value={currentStrokeWidth}
                onChange={(e) => {
                  //setCurrentStrokeWidth(+e.target.value)
                  onStrokeWidthChange(Number(e.target.value))
                }} 
                className="ml-2 accent-black" 
              />
              <div className='text-black font-bold ml-2'>{currentStrokeWidth}</div>
            </div>
        </div>
      )}
      {(tool === 'arrow' || tool === 'straight') && (
        <div>
          <div className="mb-4">
            <label className='text-black font-bold'>Колір фігури</label>
            <input 
              type="color" 
              value={strokeColor} 
              onChange={(e) => {
                //setStrokeColor(e.target.value)
                onStrokeColorChange(e.target.value)
              }} 
              className="ml-2" />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <label className='text-black font-bold'>Ширина фігури</label>
            <input 
              type="range"
              min='1'
              max='15'
              step='1'
              value={currentStrokeWidth}
              onChange={(e) => {
                //setCurrentStrokeWidth(+e.target.value)
                onStrokeWidthChange(Number(e.target.value))
              }} 
              className="ml-2 accent-black" 
            />
            <div className='text-black font-bold ml-2'>{currentStrokeWidth}</div>
          </div>
        </div>
      )}
      {(tool === 'rectangle' || tool === 'ellipse') && (
        <div>
          <div className="mb-4">
            <label className='text-black font-bold'>Колір заливки</label>
            <input type="color" 
                value={mainColor}
                onChange={(e) => {
                onFillColorChange(e.target.value)
                //setMainColor(e.target.value)
              }} className="ml-2" />
          </div>
          <div className="mb-4">
            <label className='text-black font-bold'>Додати обводку</label>
            <input 
              type="checkbox" 
              onChange={(e) => {
                //setStrokeSelected(e.target.checked);
                onStrokeToggle(e.target.checked);
              }} 
              className="ml-2" 
              />
          </div>
          {isStrokeSelected && (
            <div>
              <div className="mb-4">
                <label className='text-black font-bold'>Колір обводки</label>
                <input 
                  type="color" 
                  value={strokeColor} 
                  onChange={(e) => {
                    //setStrokeColor(e.target.value)
                    onStrokeColorChange(e.target.value)
                  }} 
                  className="ml-2" />
              </div>
              <div className="mb-4 flex flex-col items-center">
                <label className='text-black font-bold'>Ширина обводки</label>
                <input 
                  type="range"
                  min='1'
                  max='15'
                  step='1'
                  value={currentStrokeWidth}
                  onChange={(e) => {
                    //setCurrentStrokeWidth(+e.target.value)
                    onStrokeWidthChange(Number(e.target.value))
                  }} 
                  className="ml-2 accent-black" 
                />
                <div className='text-black font-bold ml-2'>{currentStrokeWidth}</div>
              </div>
            </div>
          )}
          
        </div>)}
    </div>
  );
};

export default Sidebar;
