import React, { useEffect, useState } from 'react';
import { Rect, Transformer } from 'react-konva/lib/ReactKonvaCore';
import Konva from 'konva';
import { observer } from 'mobx-react-lite';
import { KonvaEventObject } from 'konva/lib/Node';
import { PrintFieldEntity, UpdatePrintFieldProps } from 'features/print-field/print-field.module';
import { getRotated, getScaled, getSquareCenter } from 'helpers/geometry';
import Point, { POINT_CLASSNAME } from './Point';

interface Props {
  printField: PrintFieldEntity,
  onChange: (props: UpdatePrintFieldProps) => void,
}

type Position = {
  x: number,
  y: number,
  angle: number,
}

function PrintField({ printField, onChange }: Props) {
  const { points } = printField;

  const shapeRef = React.useRef<Konva.Rect>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  const shape = shapeRef.current;
  const stage = shape?.getStage();
  const layer = shape?.getLayer();
  const divContainer = stage?.container();

  const [selectedId, setSelectedShape] = useState<string | null>(null);
  const [startPosition, setStartPosition] = useState<Position>({
    x: 0,
    y: 0,
    angle: 0,
  });

  function updateStartPosition(): void {
    const { x, y } = getShapeCenter();
    setStartPosition({ x, y, angle: shape?.rotation() || 0 });
  }

  function getMoveDistance() {
    const { x, y } = getShapeCenter();

    return ({
      diffX: x - startPosition.x,
      diffY: y - startPosition.y,
    });
  }

  function checkDeselect(e: KonvaEventObject<MouseEvent>) {
    const clickedOnRect = e.target instanceof Konva.Rect;

    if (!clickedOnRect) {
      setSelectedShape(null);

      if (stage) {
        stage.off('mousedown', checkDeselect);
      }
    }
  }

  function onSelect(e: KonvaEventObject<MouseEvent>) {
    setSelectedShape(e.target.id());

    if (stage) {
      stage.on('mousedown', checkDeselect);
    }
  }

  function rotatePoint(
    x: number,
    y: number,
    angle: number,
  ): { x: number, y: number } {
    const { x: shapeCenterX, y: shapeCenterY } = getShapeCenter();

    return getRotated(x, y, shapeCenterX, shapeCenterY, angle - startPosition.angle);
  }

  function scalePoint(pointX: number, pointY: number, scale: number) {
    const shapeX = shape?.x() || 0;
    const shapeY = shape?.y() || 0;

    return getScaled(pointX, pointY, shapeX, shapeY, scale);
  }

  function getShapeCenter() {
    const shapeX = shapeRef.current?.x() || 0;
    const shapeY = shapeRef.current?.y() || 0;
    const shapeSize = shapeRef.current?.width() || 0;
    const rotation = shapeRef.current?.rotation() || 0;

    return getSquareCenter(shapeX, shapeY, shapeSize, rotation);
  }

  function getPointElements(): Konva.Node[] {
    return layer?.getChildren((children) => {
      const { className } = children.getAttrs();
      return className === POINT_CLASSNAME;
    }) || [];
  }

  function mapPointsData(points: Konva.Node[]) {
    return points.map(p => ({ x: p.x(), y: p.y(), id: p.getAttrs().id }));
  }

  function setCursorType(type: string) {
    divContainer && (divContainer.style.cursor = type);
  }

  useEffect(() => {
    if (selectedId && shapeRef?.current) {
      trRef.current?.nodes([shapeRef?.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  return (
    <>
      <Rect
        ref={shapeRef}
        id={printField.id}
        x={printField.x}
        y={printField.y}
        rotation={printField.rotation}
        width={printField.size}
        height={printField.size}
        draggable
        stroke="lightgrey"
        strokeWidth={0.5}
        onClick={onSelect}
        onMouseEnter={() => setCursorType('move')}
        onMouseLeave={() => setCursorType('default')}

        onDragStart={updateStartPosition}

        onDragMove={() => {
          const points = getPointElements();

          points.forEach((point) => {
            const { relativeX, relativeY } = point.getAttrs();
            const { diffX, diffY } = getMoveDistance();

            point.x(diffX + relativeX);
            point.y(diffY + relativeY);
          });
        }}

        onDragEnd={() => {
          const points = getPointElements();

          onChange({
            x: shape?.x(),
            y: shape?.y(),
            points: mapPointsData(points),
          });
        }}

        onTransformStart={updateStartPosition}

        onTransformEnd={() => {
          const scale = shape?.scaleY() || 1;
          shape?.scaleX(1);
          shape?.scaleY(1);

          const points = getPointElements();

          onChange({
            rotation: shape?.rotation(),
            size: shape && shape?.height() * scale || shape?.height(),
            points: mapPointsData(points),
          });
        }}

        onTransform={() => {
          const points = getPointElements();

          const scale = shape?.scaleY() || 1;
          const rotation = shape?.rotation() || 0;

          const isScaling = Number((scale).toFixed(6)) !== 1;

          points?.forEach((gridNodeElem) => {
            const { relativeX, relativeY } = gridNodeElem.getAttrs();

            const { x: pointX, y: pointY } = isScaling
              ? scalePoint(relativeX, relativeY, scale)
              : rotatePoint(relativeX, relativeY, rotation);

            gridNodeElem.x(pointX);
            gridNodeElem.y(pointY);
          });
        }}
      />

      {points && points.map((point) => (
        <Point
          key={point.id}
          pointEntity={point}
        />
      ))}

      {selectedId && (
        <Transformer
          borderEnabled={false}
          anchorStroke="lightgrey"
          enabledAnchors={['bottom-right']}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
}

export default observer(PrintField);
