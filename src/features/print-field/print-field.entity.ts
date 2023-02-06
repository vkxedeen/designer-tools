import { makeAutoObservable } from 'mobx';
import { PrintFieldItem, PrintFieldStore, PrintFieldService } from './print-field.module';

class PrintFieldEntity {
  api: PrintFieldService;

  id!: string;

  name: string;

  constructor(private rootStore: PrintFieldStore, printFieldData: PrintFieldItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = printFieldData.id;
    this.name = printFieldData.name;
  }
}

export default PrintFieldEntity;
