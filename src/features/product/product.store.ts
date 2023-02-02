import { makeAutoObservable } from 'mobx';
import { AxiosError } from 'axios';
import { RootStore } from 'hooks';
import { ProductEntity, ProductService } from './product.module';

class ProductStore {
  api: ProductService;

  products: ProductEntity[] = [];

  fetchError: AxiosError | null = null;

  isFetching = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);

    this.api = rootStore.api.productService;
  }

  cleanErrors() {
    this.fetchError = null;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { products } = await this.api.get();
      this.products = products.map((product) => new ProductEntity(this, product));

    } catch (e) {
      this.fetchError = e as AxiosError;
    }

    this.isFetching = false;
  }
}

export default ProductStore;