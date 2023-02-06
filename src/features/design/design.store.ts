import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { RootStore } from 'hooks';
import { DesignService, DesignEntity } from './design.module';

class DesignStore {
  api: DesignService;

  designs: DesignEntity[] = [];

  fetchError: AxiosError | null = null;

  isFetching = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    this.api = rootStore.api.designService;
  }

  cleanErrors() {
    this.fetchError = null;
  }

  async fetch() {
    this.cleanErrors();
    this.isFetching = true;
    try {
      const { designs } = await this.api.get();
      runInAction(() => {
        this.designs = designs.map((design) => new DesignEntity(this, design));
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

export default DesignStore;
