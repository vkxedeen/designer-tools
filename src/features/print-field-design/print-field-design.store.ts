import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { RootStore } from 'hooks';
import {
  PrintFieldDesignEntity,
  PrintFieldDesignService,
} from './print-field-design.module';

class PrintFieldDesignStore {
  api: PrintFieldDesignService;

  printFieldDesigns: PrintFieldDesignEntity[] = [];

  fetchError: AxiosError | null = null;

  isFetching = false;

  createError: AxiosError | null = null;

  isCreation = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.api = rootStore.api.printFieldDesignService;
  }

  cleanErrors() {
    this.fetchError = null;
    this.createError = null;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { print_field_designs } = await this.api.get();
      runInAction(() => {
        this.printFieldDesigns = print_field_designs.map((printFieldDesign) => new PrintFieldDesignEntity(this, printFieldDesign));
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

  async postLink({ designId, printFieldId }: { designId: string, printFieldId: string }) {
    this.cleanErrors();
    this.isCreation = true;
    try {
      const { print_field_design } = await this.api.create({
        design_id: designId,
        print_field_id: printFieldId,
      });

      runInAction(() => {
        this.printFieldDesigns = [...this.printFieldDesigns, new PrintFieldDesignEntity(this, {
          id: print_field_design.id,
          design_id: print_field_design.design_id,
          print_field_id: print_field_design.print_field_id,
        })];
      });
    } catch (e) {
      runInAction(() => {
        this.createError = e as AxiosError;
      });
    }

    runInAction(() => {
      this.isCreation = false;
    });
  }
}

export default PrintFieldDesignStore;
