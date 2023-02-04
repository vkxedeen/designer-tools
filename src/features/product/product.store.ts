import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { RootStore } from 'hooks';
import { ProductEntity } from './product.module';
import ApiClient from 'apiClient';

class ProductStore {
  api: ApiClient;

  products: ProductEntity[] = [];

  activeProduct?: ProductEntity;

  fetchError: AxiosError | null = null;

  isFetching = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);

    this.api = rootStore.api;

    this.setActive = this.setActive.bind(this);
    this.cleanErrors = this.cleanErrors.bind(this);
  }

  cleanErrors() {
    this.fetchError = null;
  }

  setActive(productId: string | null): void {
    const found = this.products.find(({ id }) => id === productId);
    this.activeProduct = found;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { products } = await this.api.productService.get();
      runInAction(() => {
        this.products = products.map((product) => new ProductEntity(this, product));
      })
    } catch (e) {
      runInAction(() => {
        this.fetchError = e as AxiosError;
      })
    }

    runInAction(() => {
      this.isFetching = false;
    })
  }
}

export default ProductStore;