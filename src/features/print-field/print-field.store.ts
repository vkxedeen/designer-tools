import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { RootStore } from 'hooks';
import { PrintFieldEntity, PrintFieldService } from './print-field.module';

class PrintFieldStore {
  api: PrintFieldService;

  printFields: PrintFieldEntity[] = [];

  fetchError: AxiosError | null = null;

  isFetching = false;

  createError: AxiosError | null = null;

  isCreation = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.api = rootStore.api.printFieldService;
  }

  cleanErrors() {
    this.fetchError = null;
    this.createError = null;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { print_fields } = await this.api.get();
      runInAction(() => {
        this.printFields = print_fields.map((printField) => new PrintFieldEntity(this, printField));
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

  async create() {
    this.cleanErrors();
    this.isCreation = true;
    try {
      const { print_field } = await this.api.create('new print_field');
      runInAction(() => {
        this.printFields = [...this.printFields, new PrintFieldEntity(this, {
          id: print_field.id,
          name: print_field.name,
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

export default PrintFieldStore;
