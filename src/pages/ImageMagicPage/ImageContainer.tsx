import React, { useRef } from 'react';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';
import DrawingStage from './DrawingStage';
import Konva from 'konva';
import PrintField from './PrintField';

function ImageContainer() {
  const { productStore } = useStores();
  const imageEntity = productStore.activeProduct?.imageStore.activeImage?.imagePartStore.activePart;
  const stageRef = useRef<Konva.Stage>(null);

  if(!imageEntity) {
    return null;
  }

  return (
    <DrawingStage stageRef={stageRef}>
      <PrintField
        grid={imageEntity.grid}
        onChange={(newAttrs) => {
          imageEntity.grid.moveTo(newAttrs);
        }}
      />
    </DrawingStage>
  );
}

export default observer(ImageContainer);
