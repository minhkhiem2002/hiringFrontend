export interface Booking {
    name: string;
    totalPrice: number;
    sportFieldId: string | null;
    customerId: string | null;
    note?: string;
    timeBookedIds: string[];
    bookingDate: string | null;
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
  PageNumber: number
}