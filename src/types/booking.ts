export type BookingStatus = "active" | "canceled";

export interface BookingDoc {
  date: string; // YYYY-MM-DD
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: BookingStatus; // default: "active"
  createdAt: unknown; // Firestore serverTimestamp()
}

export interface CreateBookingInput {
  date: string; // YYYY-MM-DD
  name: string;
  email: string;
  phone: string;
  message?: string;
}