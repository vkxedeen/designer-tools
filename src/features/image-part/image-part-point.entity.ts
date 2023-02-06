import { makeAutoObservable } from 'mobx';
import { PointData } from './image-part.interfaces';
import GridEntity from './grid.entity';

class ImagePartPointEntity {
  id = '';

  _x = 0;

  _y = 0;

  grid: GridEntity;

  constructor(grid: GridEntity, { id, x, y }: PointData) {
    makeAutoObservable(this);
    this.grid = grid;

    this.id = id;
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x * this.grid.rootScale + this.grid.x;
  }

  set x(value: number) {
    this._x = (value - this.grid.x) / this.grid.rootScale;
  }

  get y(): number {
    return this._y * this.grid.rootScale + this.grid.y;
  }

  set y(value: number) {
    this._y = (value - this.grid.y) / this.grid.rootScale;
  }

  get offsetX() {
    return Math.round(this._x);
  }

  get offsetY() {
    return Math.round(this._y);
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default ImagePartPointEntity;