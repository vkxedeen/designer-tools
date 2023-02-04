import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import ProductEntity from 'features/product/product.entity';
import { ImageEntity } from './image.module';
import ApiClient from '../../apiClient';

class ImageStore {
  api: ApiClient;

  list: ImageEntity[] = [];

  activeImage?: ImageEntity;

  fetchError: AxiosError | null = null;

  isFetching = false;

  constructor(private rootStore: ProductEntity) {
    makeAutoObservable(this);

    this.api = rootStore.api;

    this.setActive = this.setActive.bind(this);
    this.cleanErrors = this.cleanErrors.bind(this);
  }

  cleanErrors() {
    this.fetchError = null;
  }

  setActive(imageId: string | null): void {
    const found = this.list.find(({id}) => id === imageId);
    this.activeImage = found;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { product_images } = await this.api.imageService.get();
      runInAction(() => {
        this.list = product_images.map((image) => new ImageEntity(this, image));
      });
    } catch (e) {
      runInAction(() => {
        this.fetchError = e as AxiosError;
      });
    }
    runInAction(() => {
      this.isFetching = false;

    });
  }

  async fetchByProduct(productId: string) {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { product_images } = await this.api.imageService.getByProductId(productId);
      runInAction(() => {
        this.list = product_images.map((image) => new ImageEntity(this, image));
      });
    } catch (e) {
      runInAction(() => {
        this.fetchError = e as AxiosError;
      });
    }
    runInAction(() => {
      this.isFetching = false;

    });
  }
}

export default ImageStore;