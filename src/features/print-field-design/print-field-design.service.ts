import { AxiosInstance } from 'axios';
import { PrintFieldDesignPostResponse, PrintFieldDesignGetResponse, PrintFieldDesignPostRequest } from './print-field-design.module';

class PrintFieldDesignService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<PrintFieldDesignGetResponse> {
    const {data} = await this.api.get('/print-field-designs/');
    return data;
  }

  async create(linkData: PrintFieldDesignPostRequest): Promise<PrintFieldDesignPostResponse> {
    const {data} = await this.api.post('/print-field-designs/', linkData);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/print-field-designs/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/print-field-designs/${id}/`, {name});
  }
}

export default PrintFieldDesignService;