export interface SportProductGetParams {
    Search: string;
    PageSize: number;
    PageNumber: number;
    OrderBy: string;
}

export interface ColorProduct {
    endPoint: string;
    colorCode: string;
}

export interface SportProduct {
    pictureUrl: string;
    colorEndpoints: ColorProduct[];
    price: number;
    
}