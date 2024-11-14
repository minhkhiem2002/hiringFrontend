export interface Booking {
    name: string;
    totalPrice: number;
    sportFieldId: string | null;
    customerId: string | null;
    note?: string;
    timeBookedIds: string[];
    bookingDate: string | null;
  }