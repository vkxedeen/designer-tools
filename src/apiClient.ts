import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { PrintFieldService } from './features/print-field/print-field.module';
import { ProductService } from './features/product/product.module';
import { DesignService } from './features/design/design.module';
import { ImageService } from './features/image/image.module';
import { ImagePartService } from './features/image-part/image-part.module';

class ApiClient {
  api: AxiosInstance;

  printFieldService: PrintFieldService;

  productService: ProductService;

  designService: DesignService;

  imageService: ImageService;

  imagePartService: ImagePartService;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
      timeout: 10000,
    } as AxiosRequestConfig);

    this.printFieldService = new PrintFieldService(this.api);

    this.productService = new ProductService(this.api);

    this.designService = new DesignService(this.api);

    this.imageService = new ImageService(this.api);

    this.imagePartService = new ImagePartService(this.api);
  }
}

export default ApiClient;
