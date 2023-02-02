import { makeAutoObservable } from 'mobx';
import { ProductResponseItem, ProductStore, ProductService } from './product.module';

class ProductEntity {
  api: ProductService;
  id: string;

  printFieldSize: number;

  name: string;

  constructor(private rootStore: ProductStore, productData: ProductResponseItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = productData.id;
    this.name = productData.name;
    this.printFieldSize = productData.print_field_size;
  }
}

export default ProductEntity;
