import { Photo } from "./photo";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imagePath: string;
    quantity: number;
    categoryId: number;
    subCategoryId: number;
    photos: Photo[];
  }