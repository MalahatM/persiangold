import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";
import { ADMIN_EMAIL } from "../config/admin";

export default function ProtectedAdminRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) return null;

  const email = user?.email?.toLowerCase();
  const isAdmin = !!email && email === ADMIN_EMAIL.toLowerCase();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}