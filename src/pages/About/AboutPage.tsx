import styles from "./AboutPage.module.css";
import elegantImg from "../../assets/elegant.webp";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>About us</h1>

        <section className={styles.card}>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={elegantImg} alt="Elegant jewelry" />
          </div>

          <p className={styles.text}>
            Our jewelry boutique first opened in the autumn of 1970 in Niavaran, on Sarv Street 3. From the very beginning, our principles and vision were centered on creating luxurious and distinctive pieces that reflect the artistry and craftsmanship behind every creation.

After a decade of dedication and the use of rare, carefully cut gemstones in our designs, we are now proud to welcome you to our branch at Iran Mall. It is our honor to host you and provide the opportunity for our valued customers to experience the warm hospitality of Persian Gold at our Iran Mall location.
          </p>
        </section>
      </div>
    </div>
  );
}
