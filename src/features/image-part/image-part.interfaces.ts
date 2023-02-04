export interface ImagePartGetResponse {
  product_image_parts: ImagePartResponseItem[];
}

export interface ImagePartPostResponse {
  product_image: ImagePartResponseItem;
}

export interface ImagePartResponseItem {
  id: string,
  name: string,
  print_field_id: string,
  product_image_id: string,
  order: number,
  distort: {
    distort_method: string,
    distort_arguments: number[],
  } | null,
  mask_key: string,
  offset_x: number,
  offset_y: number,
  degree: number,
  scale: number,
}

export interface GridData {
  id: string,
  points?:  number[],
  x: number,
  y: number,
  rotation: number,
  scale: number,
}

export interface PointData {
  x: number,
  y: number,
  id: string,
}

export interface UpdatePrintFieldProps {
  x?: number,
  y?: number,
  size?: number,
  rotation?: number,
  points: {
    id: string,
    x: number,
    y: number,
  }[]
}
