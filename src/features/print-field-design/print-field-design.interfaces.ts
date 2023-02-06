export interface PrintFieldDesignGetResponse {
  print_field_designs: PrintFieldDesignItem[];
}

export interface PrintFieldDesignPostResponse {
  print_field_design: PrintFieldDesignItem;
}

export interface PrintFieldDesignPostRequest {
  print_field_id: string,
  design_id: string,
}

export interface PrintFieldDesignItem {
  id: string,
  print_field_id: string,
  design_id: string,
}
