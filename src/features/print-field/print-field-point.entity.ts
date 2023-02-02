import { makeAutoObservable } from 'mobx';
import { PointData, PrintFieldEntity } from './print-field.module';

class PrintFieldPointEntity {
  id = '';

  rootSize = 0;

  offsetX = 0;

  offsetY = 0;

  diffX = 0;

  diffY = 0;

  constructor(rootStore: PrintFieldEntity, { id, x, y }: PointData) {
    makeAutoObservable(this);

    this.id = id;
    this.offsetX = x;
    this.offsetY = y;
    this.rootSize = rootStore.size;
  }

  updatePosition(x: number, y: number) {
    this.offsetX = x;
    this.offsetY = y;
  }
}

export default PrintFieldPointEntity;