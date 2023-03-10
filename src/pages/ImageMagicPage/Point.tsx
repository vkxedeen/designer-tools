import React from 'react';
import { observer } from 'mobx-react-lite';
import URLImage from './URLImage';
import { Group } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { ImagePartPointEntity } from 'features/image-part/image-part.module';

type Props = {
  pointEntity: ImagePartPointEntity,
}

const POINT_SVG_SIZE = 10;
export const POINT_CLASSNAME = 'grid-node';

function Point({ pointEntity }: Props) {
  return (
    <Group
      id={pointEntity.id}
      className={POINT_CLASSNAME}
      x={pointEntity.x}
      y={pointEntity.y}
      relativeX={pointEntity.x}
      relativeY={pointEntity.y}
      offsetX={POINT_SVG_SIZE / 2}
      offsetY={POINT_SVG_SIZE / 2}
      draggable

      onDragEnd={(e: KonvaEventObject<MouseEvent>) => pointEntity.updatePosition(e.target.x(), e.target.y())}
    >
      <URLImage
        src="/src/assets/node.svg"
        width={POINT_SVG_SIZE}
        height={POINT_SVG_SIZE}
      />
    </Group>
  );
}

export default observer(Point);
