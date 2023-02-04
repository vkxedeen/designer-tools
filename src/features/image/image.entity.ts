import { makeAutoObservable } from 'mobx';
import { ImageStore, ImageResponseItem } from './image.module';
import { ImagePartStore } from '../image-part/image-part.module';
import ApiClient from 'apiClient';

class ImageEntity {
  api: ApiClient;

  id: string;

  productId: string;

  printFieldSide: number;

  overlayKey: string;

  uploadKey: string;

  name: string;

  imagePartStore: ImagePartStore;

  constructor(private rootStore: ImageStore, imageData: ImageResponseItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = imageData.id;
    this.productId = imageData.product_id;
    this.printFieldSide = imageData.print_field_side;
    this.overlayKey = imageData.overlay_key;
    this.uploadKey = imageData.upload_key;
    this.name = imageData.name;

    this.imagePartStore = new ImagePartStore(this);
  }

  fetchParts() {
    this.imagePartStore.fetchByImageId(this.id);
  }
}

export default ImageEntity;
