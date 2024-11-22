export interface Field {
    name: string;
    address: string;
    minPrice: number;
    maxPrice: number;
    stars: number;
    numberOfReviews: number;
    pictureUrl: string;
  }

export interface Rating {
  sportFieldId: string;
  customerId: string;
  customerName?: string;
  numberOfStar: 0;
  comment: string;
  avatar?: string | undefined;
}

export interface ImageField {
  id: string;
  pictureUrl: string;
  publicId: string;
  sportFieldId: string;
  isDeleted: boolean;
}

export interface CommentData {
  customerName: string;
  comment: string;
  numberOfStar: number;
  avatar: string | null;
}

export interface DetailData {
  id: string;
  name: string;
  sport: string;
  address: string;
  description: string;
  type: string;
  priceRange: string;
  stars: number;
  ratioAccept: number;
  numberOfBooking: number;
  images: ImageField[];
  ratings: CommentData[];
  vouchers: string[];
  sportEquipments: string[];
  numberOfReviews: number;
}
