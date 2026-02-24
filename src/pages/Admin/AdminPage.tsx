import { useEffect, useMemo, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import {
  getProducts,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../../services/productsService";
import styles from "./AdminPage.module.css";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  description?: string;
};

const CATEGORY_OPTIONS = ["rings", "earrings", "bracelets", "necklaces"] as const;
type Category = (typeof CATEGORY_OPTIONS)[number];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  //  Add Product form state
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("rings");
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as Product[]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of products) set.add(p.category);
    return ["all", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchQuery = q === "" || p.name.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [products, selectedCategory, query]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleChange = (
    id: string,
    field: "price" | "imageUrl",
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (field === "price") return { ...p, price: Number(value) };
        return { ...p, imageUrl: value };
      })
    );
  };

  const handleSave = async (product: Product) => {
    setSavingId(product.id);
    setSavedId(null);
    setErrorId(null);

    try {
      await updateProduct(product.id, {
        price: product.price,
        imageUrl: product.imageUrl,
      });

      setSavedId(product.id);
      window.setTimeout(() => setSavedId(null), 1500);
    } catch {
      setErrorId(product.id);
    } finally {
      setSavingId(null);
    }
  };

  //  Hard delete
  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this product permanently?");
    if (!ok) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed. Are you logged in as admin?");
    }
  };

  // Add product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!newName.trim()) return setAddError("Name is required.");
    if (!newImageUrl.trim()) return setAddError("Image URL is required.");
    if (!newDescription.trim()) return setAddError("Description is required.");
    if (!Number.isFinite(newPrice) || newPrice <= 0)
      return setAddError("Price must be a positive number.");

    setAdding(true);
    try {
      const id = await addProduct({
        name: newName.trim(),
        category: newCategory,
        price: Number(newPrice),
        imageUrl: newImageUrl.trim(),
        description: newDescription.trim(),
      });

      setProducts((prev) => [
        {
          id,
          name: newName.trim(),
          category: newCategory,
          price: Number(newPrice),
          imageUrl: newImageUrl.trim(),
          description: newDescription.trim(),
        },
        ...prev,
      ]);

      setNewName("");
      setNewCategory("rings");
      setNewPrice(0);
      setNewImageUrl("");
      setNewDescription("");
      setShowAdd(false);
    } catch {
      setAddError("Add failed. Check admin login / rules.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Admin Panel</h1>

        <div className={styles.headerActions}>
          <button
            className={styles.secondaryBtn}
            onClick={() => setShowAdd((v) => !v)}
          >
            {showAdd ? "Close" : "+ Add Product"}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {showAdd && (
        <form className={styles.addCard} onSubmit={handleAddProduct}>
          <div className={styles.addGrid}>
            <div className={styles.addField}>
              <label>Name</label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Diamond Ring"
              />
            </div>

            <div className={styles.addField}>
              <label>Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Category)}
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.addField}>
              <label>Price</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                placeholder="e.g. 52000"
              />
            </div>

            <div className={styles.addFieldFull}>
              <label>Image URL</label>
              <input
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className={styles.addFieldFull}>
              <label>Description (one line)</label>
              <input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="e.g. 18k gold handmade ring"
              />
            </div>
          </div>

          {addError && <div className={styles.inlineError}>{addError}</div>}

          <button className={styles.primaryBtn} type="submit" disabled={adding}>
            {adding ? "Adding..." : "Add Product"}
          </button>
        </form>
      )}

      <div className={styles.controls}>
        <input
          className={styles.search}
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>

            <label>Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => handleChange(product.id, "price", e.target.value)}
            />

            <label>Image URL</label>
            <input
              type="text"
              value={product.imageUrl}
              onChange={(e) =>
                handleChange(product.id, "imageUrl", e.target.value)
              }
            />

            <div className={styles.cardActions}>
              <button
                onClick={() => handleSave(product)}
                disabled={savingId === product.id}
              >
                {savingId === product.id ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                className={styles.dangerBtn}
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>

            {savedId === product.id && <div className={styles.saved}>Saved ✓</div>}
            {errorId === product.id && (
              <div className={styles.inlineError}>Save failed</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}