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