import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ADMIN_EMAIL } from "../../config/admin";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLoginPage.module.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      const loggedInEmail = cred.user.email?.toLowerCase();
      if (loggedInEmail !== ADMIN_EMAIL.toLowerCase()) {
        await auth.signOut();
        setError("Access denied. This account is not admin.");
        setLoading(false);
        return;
      }

      navigate("/admin", { replace: true });
    }  catch (err: unknown) {
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code?: unknown }).code)
      : undefined;
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setError("Email or password is incorrect.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className={styles.wrap}>
    <form onSubmit={onSubmit} className={styles.card}>
      <h2 className={styles.title}>Admin Login</h2>

      <label className={styles.label}>
        <span>Email</span>
        <input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          type="email"
          required
        />
      </label>

      <label className={styles.label}>
        <span>Password</span>
        <input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          type="password"
          required
        />
      </label>

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" disabled={loading} className={styles.btn}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  </div>
);}