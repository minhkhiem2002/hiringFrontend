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
  