import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { PrintFieldService } from './features/print-field/print-field.module';
import { ProductService } from './features/product/product.module';

class ApiClient {
  api: AxiosInstance;

  printFieldService: PrintFieldService;

  productService: ProductService;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://84.252.138.33:8000/',
      timeout: 10000,
    } as AxiosRequestConfig);

    this.printFieldService = new PrintFieldService(this.api);

    this.productService = new ProductService(this.api);
  }
}

export default ApiClient;
