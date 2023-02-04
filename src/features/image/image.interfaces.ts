export interface ImageGetResponse {
  product_images: ImageResponseItem[];
}

export interface ImagePostResponse {
  product_image: ImageResponseItem;
}

export interface ImageResponseItem {
  id: string,
  product_id: string,
  print_field_side: number,
  overlay_key: string,
  upload_key: string,
  name: string,
}

export interface ImagePostRequest {
  product_id: string,
  name: string,
  order: number,
  print_field_side: number,
}