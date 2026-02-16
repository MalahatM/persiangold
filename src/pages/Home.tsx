import ringImage from "../assets/ring.jpg";
import cheetahImage from "../assets/cheetah.avif";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section
        className={styles.header}
        style={{ backgroundImage: `url(${cheetahImage})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.fade} />
      </section>

      <div className={styles.content}>
        <section className={styles.section}>
          <h1 className={styles.title}>Persian Gold</h1>

          <div className={styles.ringCard}>
            <img src={ringImage} alt="Gold Ring" className={styles.ringImg} />
          </div>
        </section>
      </div>
    </main>
  );
}
