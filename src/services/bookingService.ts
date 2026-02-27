import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";


import { db } from "../firebase";

import type { BookingDoc, CreateBookingInput } from "../types/booking";

const BOOKINGS_COLLECTION = "bookings";

export class BookingAlreadyExistsError extends Error {
  constructor(message = "This date is already booked.") {
    super(message);
    this.name = "BookingAlreadyExistsError";
  }
}

export function toISODateString(date: Date): string {
  // YYYY-MM-DD (local)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getMonthRangeISO(anyDateInMonth: Date): { start: string; end: string } {
  const y = anyDateInMonth.getFullYear();
  const m = anyDateInMonth.getMonth();
  const start = new Date(y, m, 1);
  const end = new Date(y, m + 1, 0); // last day
  return { start: toISODateString(start), end: toISODateString(end) };
}

export async function fetchBookedDatesForMonth(monthDate: Date): Promise<string[]> {
  const { start, end } = getMonthRangeISO(monthDate);

  const colRef = collection(db, BOOKINGS_COLLECTION);
  const q = query(
    colRef,
    where("status", "==", "active"),
    where("date", ">=", start),
    where("date", "<=", end)
  );

  const snap = await getDocs(q);
  const dates: string[] = [];
  snap.forEach((d) => {
    const data = d.data() as Partial<BookingDoc>;
    if (typeof data.date === "string") dates.push(data.date);
  });

  return dates;
}

export async function createBooking(input: CreateBookingInput): Promise<void> {
  const bookingRef = doc(db, BOOKINGS_COLLECTION, input.date);

  await runTransaction(db, async (tx) => {
    const existing = await tx.get(bookingRef);
    if (existing.exists()) {
      throw new BookingAlreadyExistsError();
    }

    const payload: Omit<BookingDoc, "createdAt"> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      date: input.date,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      message: input.message?.trim() || "",
      status: "active",
      createdAt: serverTimestamp(),
    };

    tx.set(bookingRef, payload);
  });
}

export async function isDateBooked(dateISO: string): Promise<boolean> {
  const ref = doc(db, BOOKINGS_COLLECTION, dateISO);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  const data = snap.data() as Partial<BookingDoc>;
  return data.status !== "canceled";
}