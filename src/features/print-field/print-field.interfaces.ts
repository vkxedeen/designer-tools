export interface PrintFieldGetResponse {
  print_fields: PrintFieldItem[];
}

export interface PrintFieldPostResponse {
  print_field: PrintFieldItem;
}

export interface PrintFieldItem {
  id: string,
  name: string,
}
