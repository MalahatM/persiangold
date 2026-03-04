import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminBookingsPage.module.css";
import { getAllBookings, deleteBooking } from "../../services/adminBookingsService";
import type { BookingDoc } from "../../types/booking";

function formatHumanDate(dateISO: string): string {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}/${y}`;
}

export default function AdminBookingsPage() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<BookingDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (e) {
        console.error(e);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  // DELETE BOOKING
  const handleDelete = async (date: string) => {
    const ok = window.confirm("Delete this booking?");
    if (!ok) return;

    try {
      await deleteBooking(date);
      setBookings((prev) => prev.filter((b) => b.date !== date));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  const list = bookings.filter((b) => {
    const hay = `${b.date} ${b.name} ${b.email} ${b.phone} ${b.message || ""}`.toLowerCase();
    return q === "" || hay.includes(q);
  });

  // sort by date (closest first)
  list.sort((a, b) => a.date.localeCompare(b.date));

  return list;
}, [bookings, query]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Bookings</h1>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryBtn}
            onClick={() => navigate("/admin")}
          >
            Back to Products
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search by date, name, email, phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <div className={styles.loading}>Loading bookings...</div>}
      {error && <div className={styles.error}>{error}</div>}

      {!loading && !error && (
        <>
          <div className={styles.count}>
            {filtered.length} booking{filtered.length === 1 ? "" : "s"}
          </div>

          <div className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>No bookings found.</div>
            ) : (
              filtered.map((b) => (
                <div key={b.date} className={styles.card}>
                  <div className={styles.row}>
                    <div className={styles.date}>
                      {formatHumanDate(b.date)}
                    </div>
                   
                  </div>

                  <div className={styles.meta}>
                    <div>
                      <span>Name:</span> {b.name}
                    </div>

                    <div>
                      <span>Email:</span> {b.email}
                    </div>

                    <div>
                      <span>Phone:</span> {b.phone}
                    </div>

                    {b.message && (
                      <div>
                        <span>Message:</span> {b.message}
                      </div>
                    )}
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      className={styles.dangerBtn}
                      onClick={() => handleDelete(b.date)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}