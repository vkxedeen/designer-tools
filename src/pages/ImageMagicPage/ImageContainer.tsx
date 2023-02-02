import React, { Fragment, useRef } from 'react';
import { useStores } from 'hooks';
import URLImage from './URLImage';
import { observer } from 'mobx-react-lite';
import DrawingStage from './DrawingStage';
import Konva from 'konva';
import PrintField from './PrintField';

function ImageContainer() {
  const { printFieldStore } = useStores();
  const { printFields } = printFieldStore;

  const temporaryPrintFields = printFields.length ? [printFields[0]] : []
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <DrawingStage stageRef={stageRef}>
      {
        temporaryPrintFields.map((printField) => {
          return (
            <Fragment key={printField.id}>
              <URLImage
                src={printField.src}
                // x={stageRef.current && img ? (stageRef?.current.width() - img?.width) / 2 : 0}
                // y={stageRef.current && img ? (stageRef?.current.height() - img?.height) / 2 : 0}
              />

              <PrintField
                printField={printField}
                onChange={(newAttrs) => {
                  printField.moveTo(newAttrs);
                }}
              />
            </Fragment>
          )
        })
      }
    </DrawingStage>
  );
}

export default observer(ImageContainer);
