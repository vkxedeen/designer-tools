import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { ImagePartEntity } from './image-part.module';
import ApiClient from 'apiClient';
import { ImageEntity } from 'features/image/image.module';

class ImagePartStore {
  api: ApiClient;

  list: ImagePartEntity[] = [];

  activePart?: ImagePartEntity;

  fetchError: AxiosError | null = null;

  isFetching = false;

  constructor(private rootStore: ImageEntity) {
    makeAutoObservable(this);
    this.api = rootStore.api;

    this.setActive = this.setActive.bind(this);
    this.cleanErrors = this.cleanErrors.bind(this);
    this.fetchByImageId = this.fetchByImageId.bind(this);
  }

  cleanErrors() {
    this.fetchError = null;
  }

  setActive(partId: string | null): void {
    this.activePart = this.list.find(({ id }) => id === partId);
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { product_image_parts } = await this.api.imagePartService.get();
      runInAction(() => {
        this.list = product_image_parts.map((imagePart) => new ImagePartEntity(this, imagePart));
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

  async fetchByImageId(imageId: string) {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { product_image_parts } = await this.api.imagePartService.getByImageId(imageId);
      runInAction(() => {
        this.list = product_image_parts.map((imagePart) => new ImagePartEntity(this, imagePart));

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

export default ImagePartStore;