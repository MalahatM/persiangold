import "./GalleryPage.css";
import { useNavigate } from "react-router-dom";

import braceletImg from "../../assets/gallery/bracelet.jpeg";
import earringImg from "../../assets/gallery/earring.jpeg";
import necklaceImg from "../../assets/gallery/necklace.jpeg";
import ringImg from "../../assets/gallery/ring.jpeg";

type Category = {
  title: string;
  image: string;
  path: string;
};

const categories: Category[] = [
  { title: "Necklaces", image: necklaceImg, path: "/necklaces" },
  { title: "Earrings", image: earringImg, path: "/earrings" },
  { title: "Bracelets", image: braceletImg, path: "/bracelets" },
  { title: "Rings", image: ringImg, path: "/rings" },
];

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <section className="galleryPage">
      <h1 className="galleryPage__title">Gallery</h1>

      <div className="galleryGrid">
        {categories.map((c) => (
          <button
            key={c.title}
            className="galleryCard"
            type="button"
            onClick={() => navigate(c.path)}
          >
            <img className="galleryCard__img" src={c.image} alt={c.title} />
            <div className="galleryCard__overlay" />
            <div className="galleryCard__label">{c.title}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
