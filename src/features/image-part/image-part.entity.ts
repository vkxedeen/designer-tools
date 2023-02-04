import { makeAutoObservable } from 'mobx';
import { ImagePartStore, ImagePartService, ImagePartResponseItem, ImagePartPointEntity, GridEntity } from './image-part.module';
import { arrayToChunks } from '../../helpers/common';

class ImagePartEntity {
  api: ImagePartService;

  id: string;

  name: string;

  printFieldId: string;

  productImageId: string;

  order: number;

  grid: GridEntity;

  maskKey: string;

  x: number;

  y: number;

  rotation: number;

  scale: number;

  currentScale: number;

  constructor(private rootStore: ImagePartStore, imagePartData: ImagePartResponseItem) {
    makeAutoObservable(this);
    this.api = rootStore.api.imagePartService;
    this.id = imagePartData.id;
    this.productImageId = imagePartData.product_image_id;
    this.printFieldId = imagePartData.print_field_id;
    this.order = imagePartData.order;
    this.maskKey = imagePartData.mask_key;
    this.name = imagePartData.name;
    this.x = imagePartData.offset_x;
    this.y = imagePartData.offset_y;
    this.rotation = imagePartData.degree;
    this.scale = imagePartData.scale;
    this.currentScale = imagePartData.scale;

    this.grid = new GridEntity({
      id: imagePartData.print_field_id,
      scale: imagePartData.scale,
      rotation: imagePartData.degree,
      x: imagePartData.offset_x,
      y: imagePartData.offset_y,
      points: imagePartData.distort?.distort_arguments,
    })
  }

  setCurrentScale(value: number) {
    this.currentScale = value;
  }
}

export default ImagePartEntity;
