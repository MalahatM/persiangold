import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import styles from "./ProductDetailPage.module.css";


import { db } from "../../firebase";


import { useCartStore } from "../../store/cartStore";

type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;

 
  material?: string;
  shortSpecs?: string[];
  story?: string;
  description?: string;
};

function formatPrice(value: number) {
 
  try {
    return new Intl.NumberFormat("de-DE").format(value);
  } catch {
    return String(value);
  }
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      if (!id) {
        setErrorMsg("Product id is missing.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setErrorMsg("");

      try {
        const ref = doc(db, "products", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          if (!mounted) return;
          setProduct(null);
          setErrorMsg("Product not found.");
          setLoading(false);
          return;
        }

        const data = snap.data() as Omit<Product, "id">;

        if (!mounted) return;
        setProduct({ id: snap.id, ...data });
        setLoading(false);
      } catch (e) {
        if (!mounted) return;
        setErrorMsg("Failed to load product.");
        setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  const bulletSpecs = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.shortSpecs) && product.shortSpecs.length > 0) {
      return product.shortSpecs;
    }

    
    const fallback: string[] = [];
    if (product.material) fallback.push(product.material);
    if (product.category) fallback.push(product.category);
    return fallback;
  }, [product]);

  const storyText = useMemo(() => {
    if (!product) return "";
    return product.story || product.description || "";
  }, [product]);

  const handleAddToBag = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name, // ✅ CartItem expects name
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.skeletonHero} />
          <div className={styles.skeletonBox} />
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <p className={styles.errorTitle}>Oops</p>
            <p className={styles.errorText}>{errorMsg}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.errorCard}>
            <p className={styles.errorTitle}>Not found</p>
            <p className={styles.errorText}>This product does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroMedia}>
            <img className={styles.image} src={product.imageUrl} alt={product.name} />
          </div>

          <div className={styles.heroInfo}>
            <div className={styles.topText}>
              <p className={styles.kicker}>
                {product.material || "18k rose gold with round brilliant diamonds"}
              </p>
              <h1 className={styles.title}>{product.name}</h1>
            </div>

            {bulletSpecs.length > 0 && (
              <ul className={styles.bullets}>
                {bulletSpecs.slice(0, 4).map((x, idx) => (
                  <li key={`${x}-${idx}`} className={styles.bulletItem}>
                    <span className={styles.dot} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.priceRow}>
              <span className={styles.priceLabel}>Price</span>
              <span className={styles.priceValue}>€ {formatPrice(product.price)}</span>
            </div>

            <button className={styles.addButton} onClick={handleAddToBag}>
              Add to bag
            </button>
          </div>
        </section>

        {/* STORY BOX */}
        <section className={styles.storyBox}>
          <h2 className={styles.storyTitle}>About this piece</h2>

          {storyText ? (
            <p className={styles.storyText}>{storyText}</p>
          ) : (
            <p className={styles.storyTextMuted}>
             
              <code>story</code> یا <code>description</code> 
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
