import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";

import SortDropdown from "../../components/sort/SortDropdown";
import type { SortKey } from "../../components/sort/sort.types";

import styles from "./NecklacePage.module.css";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function NecklacesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sort = (searchParams.get("sort") as SortKey) || null;

  useEffect(() => {
    const fetchNecklaces = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", "necklaces")
        );

        const snap = await getDocs(q);

        const data: Product[] = snap.docs.map((doc) => {
          const d = doc.data() as Omit<Product, "id">;
          return { id: doc.id, ...d };
        });

        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch necklaces:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNecklaces();
  }, []);

  const visibleProducts = useMemo(() => {
    if (!sort) return products;

    const sorted = [...products];

    switch (sort) {
      case "title_asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;

      default:
        break;
    }

    return sorted;
  }, [products, sort]);

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Necklaces</h1>

        <div className={styles.sortWrap}>
          <SortDropdown />
        </div>
      </div>

      {loading ? (
        <p className={styles.debug}>Loading...</p>
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
