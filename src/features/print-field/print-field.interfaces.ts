export interface PointData {
  id: string,
  x: number,
  y: number,
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

export interface PrintFieldGetResponse {
  print_fields: PrintFieldItem[];
}

export interface PrintFieldPostResponse {
  print_field: PrintFieldItem;
}

export interface PrintFieldItem {
  id: string,
  name: string,
  x?: number,
  y?: number,
  size?: number,
  rotation?: number,
  src?: string,
}
