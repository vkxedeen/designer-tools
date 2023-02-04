import React from 'react';
import { Stage, Layer } from 'react-konva';

interface Props {
  children: JSX.Element | JSX.Element[];
  stageRef: any;
}

const STAGE_WIDTH = 850;
const STAGE_HEIGHT = 850;

function DrawingStage({ children, stageRef }: Props) {
  return (
    <div style={{ position: 'absolute' }}>
      <Stage
        ref={stageRef}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
      >
        <Layer>
          {children}
        </Layer>
      </Stage>
    </div>
  );
}

export default DrawingStage;
