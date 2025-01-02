import React, { useRef, useEffect, useState, FC, createContext, useContext, forwardRef } from 'react';
import { Stage, Layer, Line, Rect, Ellipse, Arrow, Text, Image as KonvaImage } from 'react-konva';

const Canvas: FC<{ 
  imageUrl: string; 
  fillColor: string; 
  strokeColor: string; 
  strokeWidth: number; 
  strokeEnabled: boolean;
  fontFamily: string;
  fontSize: number;
  text: string;
  tool: string;
  stageRef;
}> = forwardRef(({ imageUrl, fillColor, strokeColor, strokeWidth, strokeEnabled, tool, stageRef, fontFamily, fontSize, text }, ref) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [stageDimensions, setStageDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [shapes, setShapes] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);
  //const stageRef = useRef(ref);
  const isDrawing = useRef(false);
  const scale = useRef<number>(1);
  const selectedShapeIndex = useRef<number | null>(null);
  const isDragging = useRef(false);
  const dragStartPos = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    const loadImage = new window.Image();
    loadImage.src = imageUrl;
    loadImage.onload = () => {
      setImage(loadImage);
      updateStageDimensions(loadImage);
    };
  }, [imageUrl]);

  const updateStageDimensions = (img: HTMLImageElement) => {
    const scaleFactor = Math.min(window.innerWidth * 0.8 / img.width, window.innerHeight * 0.8 / img.height);
    scale.current = scaleFactor;
    const newWidth = img.width * scaleFactor;
    const newHeight = img.height * scaleFactor;
    setStageDimensions({ width: newWidth, height: newHeight });
  };

  useEffect(() => {
    const handleResize = () => {
      if (image) {
        updateStageDimensions(image);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [image]);

  const handleTextCreation = (pos) => {
    const newText = {
      tool: 'text',
      text: text,
      points: [ pos.x / scale.current, pos.y / scale.current],
      fontSize: fontSize,
      fontFamily: fontFamily,
      stroke: strokeEnabled ? strokeColor : null,
      strokeWidth,
      fill: fillColor,
    };
    setShapes(prevShapes => [...prevShapes, newText]);
    console.log(shapes, newText);
  };

  const handleMouseDown = () => {
    const pos = stageRef.current.getPointerPosition();
    if (tool === 'text') {
      handleTextCreation(pos);
    } else if (tool === 'drag') {
      const shapeIndex = shapes.findIndex(shape => {
        const scaledPoints = shape.points.map(p => p * scale.current);
        switch (shape.tool) {
          case 'rectangle':
            return (
              pos.x > scaledPoints[0] && pos.x < scaledPoints[0] + shape.width * scale.current &&
              pos.y > scaledPoints[1] && pos.y < scaledPoints[1] + shape.height * scale.current
            );
          case 'ellipse':
            const radiusX = shape.radiusX * scale.current;
            const radiusY = shape.radiusY * scale.current;
            return (
              Math.pow(pos.x - scaledPoints[0], 2) / Math.pow(radiusX, 2) + 
              Math.pow(pos.y - scaledPoints[1], 2) / Math.pow(radiusY, 2) <= 1
            );
          case 'arrow':
          case 'line':
          case 'straight':
            return scaledPoints.some((p, index) => (
              index % 2 === 0 && 
              pos.x > p - shape.strokeWidth * scale.current && 
              pos.x < p + shape.strokeWidth * scale.current &&
              pos.y > scaledPoints[index + 1] - shape.strokeWidth * scale.current &&
              pos.y < scaledPoints[index + 1] + shape.strokeWidth * scale.current
            ));
          default:
            return false;
        }
      });

      if (shapeIndex !== -1) {
        selectedShapeIndex.current = shapeIndex;
        isDragging.current = true;
        dragStartPos.current = { x: pos.x, y: pos.y };
      }
    } else {
      isDrawing.current = true;
      if (tool === 'pen' || tool === 'arrow') {
        strokeEnabled = true;
      }
      const newShape = { tool, points: [pos.x / scale.current, pos.y / scale.current], stroke: strokeEnabled ? strokeColor : null, strokeWidth, fill: fillColor };
      setShapes(prevShapes => [...prevShapes, newShape]);
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing.current && !isDragging.current) return;
    const stage = stageRef.current;
    const point = stage.getPointerPosition();
    const centerX = stage.width() / 2;
    const centerY = stage.height() / 2;
    const relativeX = point.x - centerX;
    const relativeY = point.y - centerY;

    const scaleAdjustmentX = (centerX + relativeX) / scale.current;
    const scaleAdjustmentY = (centerY + relativeY) / scale.current;

    if (isDrawing.current) {
      const lastShape = shapes[shapes.length - 1];
      switch (tool) {
        case 'straight':
          lastShape.points = [lastShape.points[0], lastShape.points[1], scaleAdjustmentX, scaleAdjustmentY];
          break;
        case 'line':
          lastShape.points = lastShape.points.concat([scaleAdjustmentX, scaleAdjustmentY]);
          break;
        case 'rectangle':
          lastShape.width = scaleAdjustmentX - lastShape.points[0];
          lastShape.height = scaleAdjustmentY - lastShape.points[1];
          break;
        case 'ellipse':
          lastShape.radiusX = Math.abs(scaleAdjustmentX - lastShape.points[0]) / 2;
          lastShape.radiusY = Math.abs(scaleAdjustmentY - lastShape.points[1]) / 2;
          break;
        case 'arrow':
          lastShape.points = [lastShape.points[0], lastShape.points[1], scaleAdjustmentX, scaleAdjustmentY];
          break;
        default:
          break;
      }
      shapes.splice(shapes.length - 1, 1, lastShape);
      setShapes(shapes.concat());
    }

    if (isDragging.current && selectedShapeIndex.current !== null) {
      const selectedShape = shapes[selectedShapeIndex.current];
      const dx = (point.x - dragStartPos.current.x) / scale.current;
      const dy = (point.y - dragStartPos.current.y) / scale.current;
      dragStartPos.current = { x: point.x, y: point.y };
      
      selectedShape.points = selectedShape.points.map((p, index) => {
        if (index % 2 === 0) return p + dx;
        return p + dy;
      });

      setShapes(shapes.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    isDragging.current = false;
    selectedShapeIndex.current = null;
    dragStartPos.current = null;
  };

  const handleUndo = () => {
    if(shapes.length <= 0) return;
    const lastShape = shapes.pop();
    setShapes([...shapes]);
    setUndoHistory([...undoHistory, lastShape]);
  }

  const handleRedo = () => {
    if(undoHistory.length <= 0) return;
    const lastShape = undoHistory.pop();
    setShapes([...shapes, lastShape]);
    setUndoHistory([...undoHistory]);
  }

  React.useImperativeHandle(ref, () => ({
    handleUndo,
    handleRedo
  }));

  return (
    <div className="canvas-container" style={{width: stageDimensions.width, height: stageDimensions.height}}>
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        ref={stageRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {image && (
            <KonvaImage 
              image={image}
              width={stageDimensions.width}
              height={stageDimensions.height}
              x={0}
              y={0}
            />
          )}
          {shapes.map((shape, i) => {
            const scaledPoints = shape.points.map(p => p * scale.current);
            switch (shape.tool) {
              case 'straight':
              case 'line':
                return <Line key={i} points={scaledPoints} stroke={shape.stroke} strokeWidth={shape.strokeWidth * scale.current} fill={shape.fill} draggable={tool === 'drag'}/>;
              case 'rectangle':
                return <Rect key={i} x={scaledPoints[0]} y={scaledPoints[1]} width={shape.width * scale.current} height={shape.height * scale.current} stroke={shape.stroke} strokeWidth={shape.strokeWidth * scale.current} fill={shape.fill} />;
              case 'ellipse':
                return <Ellipse key={i} x={scaledPoints[0]} y={scaledPoints[1]} radiusX={shape.radiusX * scale.current} radiusY={shape.radiusY * scale.current} stroke={shape.stroke} strokeWidth={shape.strokeWidth * scale.current} fill={shape.fill} />;
              case 'arrow':
                return <Arrow key={i} points={scaledPoints} stroke={shape.stroke} fill={shape.stroke} strokeWidth={shape.strokeWidth * scale.current} draggable={tool === 'drag'}/>;
              case 'text':
                return <Text key={i} stroke={shape.stroke} strokeWidth={shape.strokeWidth * scale.current} text={shape.text} x={scaledPoints[0]} y={scaledPoints[1]} fontSize={shape.fontSize * scale.current} fontFamily={shape.fontFamily} fill={shape.fill} draggable={tool === 'drag'}/>;
              default:
                return null;
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
});

export default Canvas;
