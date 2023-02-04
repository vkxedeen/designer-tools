import { makeAutoObservable } from 'mobx';
import { ImageStore } from 'features/image/image.module';
import { ProductResponseItem, ProductStore } from './product.module';
import ApiClient from 'apiClient';

class ProductEntity {
  api: ApiClient;

  id: string;

  printFieldSize: number;

  name: string;

  imageStore: ImageStore;

  constructor(private rootStore: ProductStore, productData: ProductResponseItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = productData.id;
    this.name = productData.name;
    this.printFieldSize = productData.print_field_size;

    this.imageStore = new ImageStore(this);
  }

  fetchImages() {
    this.imageStore.fetchByProduct(this.id);
  }
}

export default ProductEntity;
