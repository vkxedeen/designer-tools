import React from 'react';
import { Stage, Layer } from 'react-konva';

interface Props {
  children: JSX.Element | JSX.Element[];
  stageRef: any;
}

const STAGE_WIDTH = 600;
const STAGE_HEIGHT = 800;

function DrawingStage({ children, stageRef }: Props) {
  return (
    <Stage
      ref={stageRef}
      width={STAGE_WIDTH}
      height={STAGE_HEIGHT}
    >
      <Layer>
        {children}
      </Layer>
    </Stage>
  );
}

export default DrawingStage;
