import { AxiosInstance } from 'axios';
import { ImagePartGetResponse, ImagePartPostResponse } from './image-part.module';

class ImagePartService {
  constructor(private api: AxiosInstance) {
  }

  async get(): Promise<ImagePartGetResponse> {
    const { data } = await this.api.get('/product-image-parts/');
    return data;
  }

  async getByImageId(imageId: string): Promise<ImagePartGetResponse> {
    const { data } = await this.api.get(`/product-image-parts/?products_image_id=${imageId}`);
    return data;
  }


  async create(imageData: any): Promise<ImagePartPostResponse> {
    const { data } = await this.api.post('/product-image-parts/', imageData);
    return data;
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`/product-image-parts/${id}/`);
  }

  async update(id: string, name: string): Promise<void> {
    await this.api.patch(`/product-image-parts/${id}/`, { name });
  }
}

export default ImagePartService;