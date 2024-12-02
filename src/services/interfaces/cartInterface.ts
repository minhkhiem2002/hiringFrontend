export interface CartItem {
    id: string;            
    name: string;          
    price: number;         
    size: string;            
    quantity: number;       
    imageUrl: string;        
  }
  
  export interface CartState {
    sportProductVariantId: string;       
    quantity: number;    
  }
  

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine: string;
}

export interface Order {
  shippingAddress: ShippingAddress;
  buyerId: string;
}