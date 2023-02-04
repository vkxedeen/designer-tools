export interface DesignGetResponse {
  designs: DesignItem[];
}

export interface DesignPostResponse {
  design: DesignItem;
}

export interface DesignItem {
  id: string,
  name: string,
  upload_key: string,
}
