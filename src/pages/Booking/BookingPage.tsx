

import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./BookingPage.module.css";
import { isValidEmail, isValidName, isValidPhone } from "../../utils/validation";

import {
  BookingAlreadyExistsError,
  createBooking,
  fetchBookedDatesForMonth,
  toISODateString,
} from "../../services/bookingService";

type CalendarValue = Date | null;

type TileArgs = {
  date: Date;
  view: "month" | "year" | "decade" | "century";
};

function isPastDay(day: Date): boolean {
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
  return startDay < startToday;
}

function formatHumanDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}/${y}`;
}

export default function BookingPage() {
  const [activeMonth, setActiveMonth] = useState<Date>(() => new Date());
  const [selectedDate, setSelectedDate] = useState<CalendarValue>(null);

  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const bookedSet = useMemo(() => new Set(bookedDates), [bookedDates]);

  const [loadingMonth, setLoadingMonth] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const selectedISO = selectedDate ? toISODateString(selectedDate) : "";

  async function refreshMonth(dateInMonth: Date) {
    setLoadingMonth(true);
    setErrorMessage("");

    try {
      const dates = await fetchBookedDatesForMonth(dateInMonth);
      setBookedDates(dates);
    } catch (err) {
      console.error("fetchBookedDatesForMonth failed:", err);
      setErrorMessage("Could not load bookings for this month.");
    } finally {
      setLoadingMonth(false);
    }
  }

  useEffect(() => {
    void refreshMonth(activeMonth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSelectedBooked = selectedISO ? bookedSet.has(selectedISO) : false;
  const isSelectedPast = selectedDate ? isPastDay(selectedDate) : false;

  const isFormEnabled = Boolean(selectedISO) && !isSelectedBooked && !isSelectedPast;

  function resetAll() {
    setSelectedDate(null);
    setForm({ name: "", email: "", phone: "", message: "" });
  }

  function tileDisabled({ date, view }: TileArgs): boolean {
    if (view !== "month") return false;
    const iso = toISODateString(date);
    return isPastDay(date) || bookedSet.has(iso);
  }

  function tileClassName({ date, view }: TileArgs): string {
    if (view !== "month") return "";
    const iso = toISODateString(date);

    const classes: string[] = [];
    if (bookedSet.has(iso) || isPastDay(date)) classes.push(styles.disabledDay);
    if (selectedISO && iso === selectedISO) classes.push(styles.selectedDay);
    return classes.join(" ");
  }

 
  const handleActiveStartDateChange: React.ComponentProps<typeof Calendar>["onActiveStartDateChange"] =
    ({ activeStartDate }) => {
      if (!activeStartDate) return;
      setActiveMonth(activeStartDate);
      void refreshMonth(activeStartDate);
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isFormEnabled || !selectedISO) {
      setErrorMessage("Please select an available date first.");
      return;
    }

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setErrorMessage("Please fill in name, email, and phone.");
      return;
    }

    if (!isValidName(form.name)) {
      setErrorMessage("Please enter a valid name.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        date: selectedISO,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      await refreshMonth(activeMonth);
      resetAll();

      setSuccessMessage(
        `Booking successful! We will see you on ${formatHumanDate(
          selectedISO
        )} between 09:00–17:00. For canceling, please contact us.`
      );
    } catch (err: unknown) {
      if (err instanceof BookingAlreadyExistsError) {
        setErrorMessage("Sorry, this date was just booked. Please pick another date.");
        await refreshMonth(activeMonth);
      } else {
        console.error("createBooking failed:", err);
        setErrorMessage("Something went wrong while booking. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Booking</h1>
          <p className={styles.subtitle}>Select an available date to book. (Hours: 09:00–17:00)</p>
        </div>

        <div className={styles.calendarWrap}>
          <Calendar
            value={selectedDate}
            onChange={(v) => {
              setSuccessMessage("");
              setErrorMessage("");

              if (v instanceof Date) setSelectedDate(v);
              else setSelectedDate(null);
            }}
            onActiveStartDateChange={handleActiveStartDateChange}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
          />

          <div className={styles.metaRow}>
            {loadingMonth ? (
              <span className={styles.muted}>Loading month availability…</span>
            ) : (
              <span className={styles.muted}>
                {selectedISO ? `Selected: ${formatHumanDate(selectedISO)}` : "Please select a date"}
              </span>
            )}
          </div>
        </div>

        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        {successMessage && <div className={styles.success}>{successMessage}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset} disabled={!isFormEnabled || submitting}>
            <label className={styles.label}>
              Name
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className={styles.label}>
              Email
              <input
                className={styles.input}
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className={styles.label}>
              Phone
              <input
                className={styles.input}
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="+46 …"
                autoComplete="tel"
              />
            </label>

            <label className={styles.label}>
              Message (optional)
              <textarea
                className={styles.textarea}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Any extra details…"
              />
            </label>
          </fieldset>

          <button className={styles.submit} disabled={!isFormEnabled || submitting}>
            {submitting ? "Submitting…" : "Submit booking"}
          </button>

          {!successMessage && !isFormEnabled && (
            <div className={styles.hint}>
              {selectedISO
                ? isSelectedPast
                  ? "Past dates cannot be booked."
                  : isSelectedBooked
                  ? "This date is already booked."
                  : "Please select a date."
                : "Please select a date to enable the form."}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}