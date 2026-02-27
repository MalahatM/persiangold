import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import { db } from "../../firebase";
import SortDropdown from "../../components/sort/SortDropdown";
import type { SortKey } from "../../components/sort/sort.types";
import styles from "./EarringsPage.module.css";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export default function EarringsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const sort = (searchParams.get("sort") as SortKey) || null;

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEarrings = async () => {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", "earrings")
        );

        const snapshot = await getDocs(q);

        const data: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        // فقط 4 تا آیتم
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching earrings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarrings();
  }, []);

  const sortedProducts = useMemo(() => {
    const arr = [...products];

    if (sort === "title_asc") {
      arr.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "price_asc") {
      arr.sort((a, b) => a.price - b.price);
    }

    return arr;
  }, [products, sort]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <h1>Earrings</h1>
        <SortDropdown />
      </div>

      <div className={styles.grid}>
        {sortedProducts.map((p) => (
          <article
            key={p.id}
            className={styles.card}
            onClick={() => navigate(`/product/${p.id}`)} 
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                navigate(`/product/${p.id}`);
              }
            }}
          >
            <img src={p.imageUrl} alt={p.name} className={styles.image} />
            <div className={styles.cardBody}>
              <h3>{p.name}</h3>
              <p>{p.price} £</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
