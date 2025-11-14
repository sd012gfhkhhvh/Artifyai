export enum infiniteScrollImageLoadertype {
  ALL = "all",
  USER = "user",
}

export interface getImagesReturnType {
  data: any[];
  totalImages: number;
  totalPages: number;
}
