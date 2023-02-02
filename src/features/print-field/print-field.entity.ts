import { makeAutoObservable } from 'mobx';
import { PrintFieldItem, PrintFieldPointEntity, UpdatePrintFieldProps } from './print-field.module';
import PrintFieldStore from './print-field.store';
import PrintFieldService from './print-field.service';
import { AxiosError } from 'axios';

class PrintFieldEntity {
  api: PrintFieldService;

  id!: string;

  points: PrintFieldPointEntity[] = [];

  x = 0;

  y = 0;

  size = 200;

  rotation = 0;

  rowCount = 1;

  colCount = 1;

  src = '';

  deleteError: AxiosError | null = null;

  isDeleting = false;

  constructor(private rootStore: PrintFieldStore, printFieldData: PrintFieldItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = printFieldData.id;

    this.x = printFieldData.x || 0;
    this.y = printFieldData.y || 0;
    this.size = printFieldData.size || 500;
    this.rotation = printFieldData.rotation || 0;
    this.src = printFieldData.src || '/src/assets/pamela.png';
  }

  get cellWidth() {
    return this.size / this.colCount;
  }

  get cellHeight() {
    return this.size / this.rowCount;
  }

  cleanErrors() {
    this.deleteError = null;
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

  getNodeById(nodeId: string): PrintFieldPointEntity | undefined {
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

    this.points = res.map((pointData) => new PrintFieldPointEntity(this, pointData));
  }

  async delete() {
    this.cleanErrors();
    this.isDeleting = true;
    try {
      await this.api.delete(this.id);
    } catch (e) {
      this.deleteError = e as AxiosError;
    }

    this.isDeleting = false;
  }
}

export default PrintFieldEntity;
