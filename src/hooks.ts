import React from 'react';
import {
  configure,
  makeAutoObservable,
} from 'mobx';
import { PrintFieldStore } from './features/print-field/print-field.module';
import ApiClient from './apiClient';
import { ProductStore } from './features/product/product.module';
import { DesignStore } from './features/design/design.module';
import { PrintFieldDesignStore } from './features/print-field-design/print-field-design.module';

configure({ enforceActions: 'observed' });

export class RootStore {
  api!: ApiClient;

  printFieldStore!: PrintFieldStore;

  productStore!: ProductStore;

  designStore!: DesignStore;

  printFieldDesignStore!: PrintFieldDesignStore;

  constructor() {
    this.init();
    makeAutoObservable(this);
  }

  init(): void {
    this.api = new ApiClient();
    this.printFieldStore = new PrintFieldStore(this);
    this.productStore = new ProductStore(this);
    this.designStore = new DesignStore(this);
    this.printFieldDesignStore = new PrintFieldDesignStore(this);
  }
}

const createStores = (): RootStore => new RootStore();

export const storesContext = React.createContext(createStores());

export const useStores = (): RootStore => React.useContext(storesContext);
