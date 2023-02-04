import { makeAutoObservable } from 'mobx';
import { arrayToChunks } from 'helpers/common';
import { GridData, ImagePartPointEntity, UpdatePrintFieldProps } from './image-part.module';

class GridEntity {
  id!: string;

  points: ImagePartPointEntity[] = [];

  x = 0;

  y = 0;

  size = 200;

  rotation = 0;

  rowCount = 1;

  colCount = 1;

  constructor(gridData: GridData) {
    makeAutoObservable(this);
    this.id = gridData.id;
    this.x = gridData.x || 0;
    this.y = gridData.y || 0;

    if (gridData.points) {
      this.setPoints(gridData.points);
    }
  }

  setPoints(array: number[]) {
    const chunks = arrayToChunks(array, 2) as number[][];
    this.points = chunks.map(([x, y], i) => new ImagePartPointEntity({
      x,
      y,
      id: String(i),
    }))
  }

  get cellWidth() {
    return this.size / this.colCount;
  }

  get cellHeight() {
    return this.size / this.rowCount;
  }

  setGridSize({ colCount, rowCount }: { colCount: number, rowCount: number }) {
    this.colCount = colCount;
    this.rowCount = rowCount;
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

    this.points.forEach((point) => {
      const newPosition = newAttrs.points.find(({ id }) => id === point.id);
      if (newPosition) {
        point.updatePosition(newPosition.x, newPosition.y);
      }
    })
  }

  getNodeById(nodeId: string): ImagePartPointEntity | undefined {
    return this.points.find(({ id }) => id === nodeId);
  }

  initNodes() {
    const res = [];

    for (let horizontalPosition = 0; horizontalPosition <= this.colCount; horizontalPosition++) {
      for (let verticalPosition = 0; verticalPosition <= this.rowCount; verticalPosition++) {
        res.push({
          x: horizontalPosition * this.cellWidth + this.x,
          y: verticalPosition * this.cellHeight + this.y,
          id: `${verticalPosition}${horizontalPosition}`,
        });
      }
    }

    this.points = res.map((pointData) => new ImagePartPointEntity(pointData));
  }
}

export default GridEntity;
