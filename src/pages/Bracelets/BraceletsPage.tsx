import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";

import SortDropdown from "../../components/sort/SortDropdown";
import type { SortKey } from "../../components/sort/sort.types";

import styles from "./BraceletsPage.module.css";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function BraceletsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sort = (searchParams.get("sort") as SortKey) || null;

  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", "bracelets")
        );

        const snap = await getDocs(q);

        const data: Product[] = snap.docs.map((doc) => {
          const d = doc.data() as Omit<Product, "id">;
          return { id: doc.id, ...d };
        });

        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch bracelets:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBracelets();
  }, []);

  const visibleProducts = useMemo(() => {
    if (!sort) return products;
    return products; // اگر sort logic دارید مثل Rings اینجا کپی کن
  }, [products, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Bracelets</h1>

        <div className={styles.sortWrap}>
          <span>Sort by</span>
          <SortDropdown />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {visibleProducts.map((p) => (
            <div key={p.id} className={styles.card}>
              <img className={styles.image} src={p.imageUrl} alt={p.name} />

              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{p.name}</h3>
                <p className={styles.price}>{p.price} £</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
