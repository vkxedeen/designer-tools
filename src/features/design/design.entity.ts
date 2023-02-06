import { makeAutoObservable } from 'mobx';
import { DesignItem, DesignStore } from './design.module';

class DesignEntity {
  id!: string;

  name: string;

  uploadKey: string;

  constructor(private rootStore: DesignStore, designData: DesignItem) {
    makeAutoObservable(this);

    this.id = designData.id;

    this.name = designData.name;
    this.uploadKey = designData.upload_key;
  }
}

export default DesignEntity;
