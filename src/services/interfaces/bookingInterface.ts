export interface Booking {
    name: string;
    totalPrice: number;
    sportFieldId: string | null;
    customerId: string | null;
    note?: string;
    timeBookedIds: string[];
    bookingDate: string | null;
    fullName: string | null;
    email: string | null;
    phoneNumber: string | null;
  }

export interface GetBookingByCustomer {
  id: string;
  name: string;
  sportFieldName: string;
  address: string;
  timeSlotBooked: string[];
  bookingDate: string;
  totalPrice: number;
  status: string;
}

export interface GetBookingByCustomerParams {
  CustomerId: string;
  PageSize: number;
  PageNumber: number;
  Status: string;
}

export interface GetOrderByCustomerParams {
  Email: string;
  Status: string;
  PageSize: number;
  PageNumber: number;
}

export interface ItemOrder {
  pictureUrl: string;
  name: string;
  colorName: string;
  sizeName: string;
  quantity: number;
  endPoint: string;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine: string;
}

export interface GetOrderByCustomer {
  orderStatus: string;
  subTotal: number;
  deliveryFee: number;
  orderDate: string;
  shippingAddress: ShippingAddress;
  items: ItemOrder[];
}