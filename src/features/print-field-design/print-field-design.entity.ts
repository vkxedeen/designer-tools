import { makeAutoObservable } from 'mobx';
import { PrintFieldDesignStore, PrintFieldDesignService, PrintFieldDesignItem } from './print-field-design.module';

class PrintFieldDesignEntity {
  api: PrintFieldDesignService;

  id!: string;

  designId: string;

  printFieldId: string;

  constructor(private rootStore: PrintFieldDesignStore, printFieldDesignData: PrintFieldDesignItem) {
    makeAutoObservable(this);

    this.api = rootStore.api;
    this.id = printFieldDesignData.id;
    this.printFieldId = printFieldDesignData.print_field_id;
    this.designId = printFieldDesignData.design_id;
  }
}

export default PrintFieldDesignEntity;
