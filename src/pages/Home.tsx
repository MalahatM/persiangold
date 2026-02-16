
import CartDrawer from "../components/cart/CartDrawer";
import ringImage from "../assets/ring.jpg";
import cheetahImage from "../assets/cheetah.avif";
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

         
        </section>
      </div>

      
      <CartDrawer />
    </main>
  );
}
