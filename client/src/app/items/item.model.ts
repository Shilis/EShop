import { Photo } from "../shared/models/photo";

export interface Item {
  id: number,
  title: string;
  description: string;
  price: number;
  imagePath: string;
  photos: Photo[]
}


