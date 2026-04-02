import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import img1 from "../assets/galerie/1.jpg";
import img2 from "../assets/galerie/2.jpg";
import img3 from "../assets/galerie/3.jpg";
import img4 from "../assets/galerie/4.jpg";
import img5 from "../assets/galerie/5.jpg";
import img6 from "../assets/galerie/6.jpg";
import img7 from "../assets/galerie/7.jpg";
import img8 from "../assets/galerie/8.jpg";
import img11 from "../assets/galerie/11.jpg";
import img12 from "../assets/galerie/12.jpg";
import imgZ from "../assets/galerie/z.jpg";
import imgZZ from "../assets/galerie/zz.jpg";
import imgZZZ from "../assets/galerie/zzz.jpg";
import imgZZZZ from "../assets/galerie/zzzz.jpg";

const allImages = [
  img1, img2, img3, img4, img5, img6, img7,
  img8, img11, img12, imgZ, imgZZ, imgZZZ, imgZZZZ,
];

/* ───── Single gallery image with lazy fade-in ───── */
const GalleryImage = ({ src, index, onOpen }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="gallery-item mb-4 break-inside-avoid cursor-pointer group relative overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => onOpen(index)}
    >
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg" />
      )}

      <img
        src={isVisible ? src : undefined}
        alt={`Portfolio photograph ${index + 1}`}
        className={`
          w-full h-auto block rounded-lg
          transition-all duration-500 ease-out
          group-hover:scale-[1.03] group-hover:brightness-[1.05]
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ willChange: "transform" }}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
      />

      {/* Subtle dark vignette on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Elegant shadow lift on hover */}
      <div className="absolute inset-0 rounded-lg shadow-none group-hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] transition-shadow duration-500 pointer-events-none" />
    </motion.div>
  );
};

/* ───── Lightbox ───── */
const Lightbox = ({ images, index, onClose, onNext, onPrev }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

        {/* Close */}
        <button
          className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white text-lg transition-all duration-300 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-6 z-10 text-white/50 text-sm font-light tracking-widest">
          {index + 1} <span className="mx-1">/</span> {images.length}
        </div>

        {/* Prev */}
        <button
          className="absolute left-2 sm:left-4 md:left-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Précédente"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Photo ${index + 1}`}
            className="relative z-[1] max-w-[90vw] sm:max-w-[92vw] max-h-[80vh] sm:max-h-[88vh] object-contain select-none"
            style={{ filter: "drop-shadow(0 25px 60px rgba(0,0,0,0.5))" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </AnimatePresence>

        {/* Next */}
        <button
          className="absolute right-2 sm:right-4 md:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Suivante"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

/* ───── Main Gallery ───── */
const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => setLightboxIndex((i) => (i + 1) % allImages.length), []);
  const goPrev = useCallback(() => setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length), []);

  return (
    <section id="galerie" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
      {/* Header */}
      <motion.div
        className="text-center mb-14 md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight">
          Galerie
        </h2>
        <div className="w-12 h-[2px] bg-[#1687A7] mx-auto mt-4 mb-6" />
        <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light"> Chaque photo capture
          une émotion et un instant unique
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="gallery-masonry">
        {allImages.map((src, i) => (
          <GalleryImage key={i} src={src} index={i} onOpen={openLightbox} />
        ))}
      </div>

      {/* CTA Button */}
      <motion.div
        className="flex justify-center mt-14"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <a
          href="https://drive.google.com/drive/folders/1KJYooY9EQaCZFi4vP3iu_X0VOq6iAKfK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#1687A7] hover:bg-[#126e8a] text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#1687A7]/20 hover:-translate-y-0.5"
        >
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5559 24.8121H36.6666L25.5559 5.56299H14.4443L25.5559 24.8121Z" fill="rgba(255,255,255,0.85)" />
            <path d="M14.4449 5.56348L3.33325 24.8118L8.88992 34.4368L19.9999 15.1885L14.4449 5.56348Z" fill="white" />
            <path d="M14.4449 24.8115L8.88989 34.4365H31.1116L36.6666 24.8115H14.4449Z" fill="rgba(255,255,255,0.7)" />
          </svg>
          Voir plus de photos
        </a>
      </motion.div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
};

export default Gallery;
