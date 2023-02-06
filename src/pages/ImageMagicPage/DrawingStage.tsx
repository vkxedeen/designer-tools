import React from 'react';
import { Stage, Layer } from 'react-konva';
import { DRAWING_STAGE_SIZE } from '../../constants';

interface Props {
  children: JSX.Element | JSX.Element[];
  stageRef: any;
}

const STAGE_WIDTH = DRAWING_STAGE_SIZE;
const STAGE_HEIGHT = DRAWING_STAGE_SIZE;

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
