import { AxiosInstance } from 'axios';
import {PrintFieldGetResponse, PrintFieldPostResponse } from './print-field.module';

class PrintFieldService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<PrintFieldGetResponse> {
    const {data} = await this.api.get('/print-fields/');
    return data;
  }

  async create(name: string): Promise<PrintFieldPostResponse> {
    const {data} = await this.api.post('/print-fields/', {name});
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/print-fields/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/print-fields/${id}/`, {name});
  }
}

export default PrintFieldService;