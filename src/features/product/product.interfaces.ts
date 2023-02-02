export interface ProductResponseItem {
  id: string,
  name: string,
  print_field_size: number,
}

export interface ProductGetResponse {
  products: ProductResponseItem[],
}

export interface ProductPostResponse {
  product: ProductResponseItem,
}

export interface ProductData {
  id: string,
  name: string,
  printFieldSize: number,
}
