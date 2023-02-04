import { AxiosInstance } from 'axios';
import { DesignGetResponse, DesignPostResponse } from './design.module';

class DesignService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<DesignGetResponse> {
    const {data} = await this.api.get('/designs/');
    return data;
  }

  async create(name: string): Promise<DesignPostResponse> {
    const {data} = await this.api.post('/designs/', {name});
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/designs/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/designs/${id}/`, {name});
  }
}

export default DesignService;