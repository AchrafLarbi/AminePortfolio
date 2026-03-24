import { useState, useCallback, useEffect } from "react";
import img1 from "../assets/galerie/1.jpg";
import img2 from "../assets/galerie/2.jpg";
import img3 from "../assets/galerie/3.jpg";
import img4 from "../assets/galerie/4.jpg";
import img5 from "../assets/galerie/5.jpg";
import img6 from "../assets/galerie/6.jpg";
// import img7 from "../assets/galerie/7.jpg";
import img8 from "../assets/galerie/8.jpg";
import img9 from "../assets/galerie/9.jpg";
import img11 from "../assets/galerie/11.jpg";

const allImages = [img1, img2, img3, img4, img5, img6, img9, img8, img11];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="galerie" className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Galerie - Découvrez Mon Univers Visuel
        </h2>
        <p className="text-lg text-center text-gray-600 mt-2 max-w-3xl mx-auto">
          Plongez dans mon portfolio et découvrez une sélection de mes meilleurs
          clichés. Chaque photo capture une émotion et un instant unique.
          Cliquez sur le bouton ci-dessous pour visiter mon site et en voir
          plus.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-9 gap-1">
        {/* Row 1 */}
        <div className="md:col-span-3 cursor-pointer" onClick={() => openLightbox(0)}>
          <img src={img1} alt="Gallery image 1" className="h-full w-full hover:opacity-90 transition-opacity" />
        </div>
        <div className="md:col-span-3 cursor-pointer" onClick={() => openLightbox(1)}>
          <img src={img2} alt="Gallery image 2" className="w-full h-auto hover:opacity-90 transition-opacity" />
        </div>
        <div className="md:col-span-3 cursor-pointer" onClick={() => openLightbox(2)}>
          <img src={img3} alt="Gallery image 3" className="w-full h-full hover:opacity-90 transition-opacity" />
        </div>

        {/* Row 2 */}
        <div className="md:col-span-3 cursor-pointer" onClick={() => openLightbox(3)}>
          <img src={img4} alt="Gallery image 4" className="w-full h-full hover:opacity-90 transition-opacity" />
        </div>
        <div className="md:col-span-6 cursor-pointer" onClick={() => openLightbox(4)}>
          <img
            src={img5}
            alt="Gallery image 5"
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        {/* Row 3 */}
        <div className="md:col-span-4 cursor-pointer" onClick={() => openLightbox(5)}>
          <img src={img6} alt="Gallery image 6" className="w-full h-full hover:opacity-90 transition-opacity" />
        </div>
        <div className="md:col-span-5 cursor-pointer" onClick={() => openLightbox(6)}>
          <img src={img9} alt="Gallery image 7" className="w-full h-full hover:opacity-90 transition-opacity" />
        </div>

        {/* Row 4 */}
        <div className="md:col-span-5 cursor-pointer" onClick={() => openLightbox(7)}>
          <img src={img8} alt="Gallery image 8" className="w-full h-auto hover:opacity-90 transition-opacity" />
        </div>
        <div className="md:col-span-4 cursor-pointer" onClick={() => openLightbox(8)}>
          <img
            src={img11}
            alt="Gallery image 9"
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>
      </div>

      {/* Button */}
      <div className="flex mt-8">
        <button
          className="bg-[#1687A7] hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center"
          onClick={() =>
            window.open(
              "https://drive.google.com/drive/folders/1KJYooY9EQaCZFi4vP3iu_X0VOq6iAKfK",
              "_blank"
            )
          }
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.5559 24.8121H36.6666L25.5559 5.56299H14.4443L25.5559 24.8121Z"
              fill="#D4D4D4"
            />
            <path
              d="M14.4449 5.56348L3.33325 24.8118L8.88992 34.4368L19.9999 15.1885L14.4449 5.56348Z"
              fill="white"
            />
            <path
              d="M14.4449 24.8115L8.88989 34.4365H31.1116L36.6666 24.8115H14.4449Z"
              fill="#C4C4C4"
            />
          </svg>
          Visiter mon drive
        </button>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-2xl transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-5 text-white/70 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>

          {/* Prev */}
          <button
            className="absolute left-3 md:left-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-colors"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <img
            src={allImages[lightboxIndex]}
            alt={`Gallery fullscreen ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            className="absolute right-3 md:right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xl transition-colors"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
