import "./GalleryPage.css";

import braceletImg from "../../assets/gallery/bracelet.jpeg";
import earringImg from "../../assets/gallery/earring.jpeg";
import necklaceImg from "../../assets/gallery/necklace.jpeg";
import ringImg from "../../assets/gallery/ring.jpeg";

type Category = {
  title: string;
  image: string;
};

const categories: Category[] = [
  { title: "Necklaces", image: necklaceImg },
  { title: "Earrings", image: earringImg },
  { title: "Bracelets", image: braceletImg },
  { title: "Rings", image: ringImg },
];

export default function GalleryPage() {
  return (
    <section className="galleryPage">
      <h1 className="galleryPage__title">Gallery</h1>

      <div className="galleryGrid">
        {categories.map((c) => (
          <button key={c.title} className="galleryCard" type="button">
            <img className="galleryCard__img" src={c.image} alt={c.title} />
            <div className="galleryCard__overlay" />
            <div className="galleryCard__label">{c.title}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
