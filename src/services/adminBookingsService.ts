import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import type { BookingDoc } from "../types/booking";

export async function getAllBookings(): Promise<BookingDoc[]> {
  const snap = await getDocs(collection(db, "bookings"));
  return snap.docs.map((d) => d.data() as BookingDoc);
}

export async function deleteBooking(date: string): Promise<void> {
  const ref = doc(db, "bookings", date);
  await deleteDoc(ref);
}