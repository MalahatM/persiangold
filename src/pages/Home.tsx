import CartButton from "../components/cart/CartButton";
import CartDrawer from "../components/cart/CartDrawer";
import ringImage from "../assets/ring.jpg";
import cheetahImage from "../assets/cheetah.avif";
import iranFlag from "../assets/iran-flag.png";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Cheetah Header */}
      <section
        className={styles.header}
        style={{ backgroundImage: `url(${cheetahImage})` }}
      >
        {/* Dark overlay */}
        <div className={styles.overlay} />

        {/* Fade to black */}
        <div className={styles.fade} />

        <div className={styles.cartWrap}>
          <CartButton className={styles.cartBtn} />
        </div>
      </section>

      {/* Content */}
      <div className={styles.content}>
        <section className={styles.section}>
          <h1 className={styles.title}>Persian Gold</h1>

          <div className={styles.ringCard}>
            <img
              src={ringImage}
              alt="Gold Ring"
              className={styles.ringImg}
            />
          </div>

          <div className={styles.addressRow}>
            {/* Flag */}
            <div className={styles.flagWrap}>
              <img
                src={iranFlag}
                alt="Iran flag (Lion and Sun)"
                className={styles.flagImg}
              />
            </div>

            {/* Address text */}
            <p className={styles.addressText}>
              Address: Iran mall 2e floor number 396
            </p>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#8c6b1f" />
            </linearGradient>
          </defs>

          <path
            d="M6 10V8a6 6 0 1112 0v2"
            stroke="url(#goldGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect
            x="5"
            y="10"
            width="14"
            height="10"
            rx="3"
            stroke="url(#goldGradient)"
            strokeWidth="2"
          />
        </svg>
      </footer>

      <CartDrawer />
    </main>
  );
}
