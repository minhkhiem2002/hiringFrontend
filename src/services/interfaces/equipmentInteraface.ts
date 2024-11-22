export interface EquipmentParams {
    Search?: string;
    PageSize?: number;
    PageNumber?: number;
    OrderBy?: string;
    Colors?: string;
    Sizes?: string;
    Sports?: string;
}

export interface ColorEndpoint {
    endPoint: string;
    colorCode: string;
}

export interface Product {
    pictureUrl: string;
    colorEndpoints: ColorEndpoint[];
    price: number;
    name: string;
}