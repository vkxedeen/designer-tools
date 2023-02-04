import { AxiosInstance } from 'axios';
import { ProductGetResponse, ProductPostResponse } from './product.module';

class ProductService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<ProductGetResponse> {
    const { data } = await this.api.get(`/products/`);
    return data;
  }

  async create(name: string): Promise<ProductPostResponse> {
    const { data } = await this.api.post('/products/', { name });
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/products/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/products/${id}/`, { name });
  }
}

export default ProductService;