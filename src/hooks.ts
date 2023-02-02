import React from 'react';
import {
  configure,
  makeAutoObservable,
} from 'mobx';
import { PrintFieldStore } from './features/print-field/print-field.module';
import ApiClient from './apiClient';
import { ProductStore } from './features/product/product.module';

configure({ enforceActions: 'observed' });

export class RootStore {
  api!: ApiClient;

  printFieldStore!: PrintFieldStore;

  productStore!: ProductStore;

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init(): void {
    this.api = new ApiClient();
    this.printFieldStore = new PrintFieldStore(this);
    this.productStore = new ProductStore(this);
  }
}

const createStores = (): RootStore => new RootStore();

export const storesContext = React.createContext(createStores());

export const useStores = (): RootStore => React.useContext(storesContext);
