import { makeAutoObservable } from 'mobx';
import { PointData } from './image-part.interfaces';

class ImagePartPointEntity {
  id = '';

  x = 0;

  y = 0;

  constructor({ id, x, y }: PointData) {
    makeAutoObservable(this);

    this.id = id;
    this.x = x;
    this.y = y;
  }

  updatePosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export default ImagePartPointEntity;