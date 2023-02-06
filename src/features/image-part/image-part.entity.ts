import { makeAutoObservable, runInAction } from 'mobx';
import { ImagePartStore, ImagePartService, ImagePartResponseItem, GridEntity } from './image-part.module';
import { AxiosError } from 'axios';
import { DISTORT_METHOD } from 'constants';

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

  saveError: AxiosError | null = null;

  isSaving = false;

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
      scale: imagePartData.scale,
      rotation: imagePartData.degree,
      x: imagePartData.offset_x,
      y: imagePartData.offset_y,
      points: imagePartData.distort?.distort_arguments,
    });

    this.cleanErrors = this.cleanErrors.bind(this);
  }

  cleanErrors() {
    this.saveError = null;
  }

  setCurrentScale(value: number) {
    this.currentScale = value;
    this.grid.setRootScale(value);
  }

  createNewGrid({ colCount, rowCount }: { colCount: number, rowCount: number }) {
    this.grid = new GridEntity({
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
    });

    this.grid.initNodes({ colCount, rowCount });
  }

  async update() {
    this.cleanErrors();
    this.isSaving = true;
    try {
      await this.api.update({
        id: this.id,
        name: this.name,
        print_field_id: this.printFieldId,
        product_image_id: this.productImageId,
        mask_key: this.maskKey,
        order: this.order,
        degree: this.grid.rotation,
        scale: this.grid.scale,
        offset_x: this.grid.offsetX,
        offset_y: this.grid.offsetY,
        distort: {
          distort_method: DISTORT_METHOD,
          distort_arguments: this.grid.getPoints(),
        }
      });
      // runInAction(() => {
      //   this.list = product_image_parts.map((imagePart) => new ImagePartEntity(this, imagePart));
      // });
    } catch (e) {
      runInAction(() => {
        this.saveError = e as AxiosError;
      });
    }

    runInAction(() => {
      this.isSaving = false;
    });
  }
}

export default ImagePartEntity;
