import { makeAutoObservable } from 'mobx';
import { arrayToChunks } from 'helpers/common';
import { GridData, ImagePartPointEntity, UpdatePrintFieldProps } from './image-part.module';
import { DRAWING_STAGE_SIZE, IMAGE_MAX_SIZE } from 'constants';

const offset = (DRAWING_STAGE_SIZE - IMAGE_MAX_SIZE) / 2;

class GridEntity {
  points: ImagePartPointEntity[] = [];

  _x = 0;

  _y = 0;

  size = 400;

  rotation = 0;

  scale = 1;

  rootScale = 1;

  constructor(gridData: GridData) {
    makeAutoObservable(this);
    this._x = gridData.x || 0;
    this._y = gridData.y || 0;
    this.rotation = gridData.rotation || 0;
    this.scale = gridData.scale || 1;
    this.rootScale = this.scale;


    if (gridData.points) {
      this.setPoints(gridData.points);
    }
  }

  get x(): number {
    return this._x * this.rootScale + offset;
  }

  set x(value: number) {
    this._x = (value - offset) / this.rootScale;
  }

  get y(): number {
    return this._y * this.rootScale + offset;
  }

  set y(value: number) {
    this._y = (value - offset) / this.rootScale;
  }

  get offsetX() {
    return Math.round(this._x);
  }

  get offsetY() {
    return Math.round(this._y);
  }

  setPoints(array: number[]) {
    const chunks = arrayToChunks(array, 2) as number[][];
    this.points = chunks.map(([x, y], i) => new ImagePartPointEntity(this,{
      x,
      y,
      id: String(i),
    }));
  }

  getPoints() {
    return this.points.flatMap(({offsetX, offsetY}) => [offsetX, offsetY]);
  }

  setRootScale(scale: number) {
    this.rootScale = scale;
  }

  moveTo(newAttrs: UpdatePrintFieldProps) {
    if (newAttrs.x) {
      this.x = newAttrs.x;
    }

    if (newAttrs.y) {
      this.y = newAttrs.y;
    }

    if (newAttrs.size) {
      this.size = newAttrs.size;
    }

    if (newAttrs.rotation) {
      this.rotation = newAttrs.rotation;
    }

    if (newAttrs.scale) {
      this.scale = newAttrs.scale;
    }

    this.points.forEach((point) => {
      const newPosition = newAttrs.points.find(({ id }) => id === point.id);
      if (newPosition) {
        point.updatePosition(newPosition.x, newPosition.y);
      }
    });
  }

  initNodes({ colCount, rowCount }: { colCount: number, rowCount: number }) {
    const res = [];

    const cellWidth = IMAGE_MAX_SIZE / colCount;
    const rowWidth = IMAGE_MAX_SIZE / rowCount;

    for (let horizontalPosition = 0; horizontalPosition <= colCount; horizontalPosition++) {
      for (let verticalPosition = 0; verticalPosition <= rowCount; verticalPosition++) {
        res.push({
          x: horizontalPosition * cellWidth + this._x,
          y: verticalPosition * rowWidth + this._y,
          id: `${verticalPosition}${horizontalPosition}`,
        });
      }
    }

    this.points = res.map((pointData) => new ImagePartPointEntity(this, pointData));
  }
}

export default GridEntity;
