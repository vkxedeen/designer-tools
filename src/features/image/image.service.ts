import { AxiosInstance } from 'axios';
import { ImagePostResponse, ImageGetResponse, ImagePostRequest } from './image.module';
import { ImagePartGetResponse } from '../image-part/image-part.interfaces';

class ImageService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<ImageGetResponse> {
    const {data} = await this.api.get('/product-images/');
    return data;
  }

  async getByProductId(productId: string): Promise<ImageGetResponse> {
    const { data } = await this.api.get(`/product-images/?product_id=${productId}`);
    return data;
  }

  async create(imageData: ImagePostRequest): Promise<ImagePostResponse> {
    const {data} = await this.api.post('/product-images/', imageData);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/product-images/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/product-images/${id}/`, {name});
  }

  async process(id: string, name: string): Promise<void> {
    await this.api.patch(`/product-images/${id}/process`, {name});
  }
}

export default ImageService;