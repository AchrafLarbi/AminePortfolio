import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImageModules = import.meta.glob("../assets/galerie/*.webp", {
  eager: true,
  import: "default",
});

const shuffleImages = (images) => {
  const shuffled = [...images];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

const allImages = shuffleImages(Object.values(galleryImageModules));

const galleryUpdating = false;

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
      { threshold: 0.08, rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="gallery-item group relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: (index % 6) * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={() => onOpen(index)}
    >
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
      )}

      <img
        src={isVisible ? src : undefined}
        alt={`Portfolio photograph ${index + 1}`}
        className={`
          block h-auto w-full rounded-lg
          transition-all duration-500 ease-out
          group-hover:scale-[1.03] group-hover:brightness-[1.05]
          ${isLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ willChange: "transform" }}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
      />

      <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-lg shadow-none transition-shadow duration-500 pointer-events-none group-hover:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)]" />
    </motion.div>
  );
};

const Lightbox = ({ images, index, onClose, onNext, onPrev }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10 md:p-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />

        <button
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/70 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:text-white sm:right-6 sm:top-6"
          onClick={onClose}
          aria-label="Fermer"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="absolute left-5 top-5 z-10 text-xs font-light tracking-[0.2em] text-white/40 sm:left-6 sm:top-6">
          {index + 1} / {images.length}
        </div>

        <button
          className="absolute left-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:text-white active:bg-white/20 sm:left-4 sm:h-11 sm:w-11 md:left-10"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Précédente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="relative z-[1] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[index]}
              alt={`Photo ${index + 1}`}
              className="max-h-[65vh] max-w-[75vw] select-none rounded-xl object-contain sm:max-h-[72vh] sm:max-w-[70vw] md:max-w-[60vw]"
              style={{
                filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.35))",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/60 backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:text-white active:bg-white/20 sm:right-4 sm:h-11 sm:w-11 md:right-10"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Suivante"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showUpdating, setShowUpdating] = useState(false);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % allImages.length),
    [],
  );
  const goPrev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length),
    [],
  );

  const handleDriveClick = (e) => {
    if (galleryUpdating) {
      e.preventDefault();
      setShowUpdating(true);
    }
  };

  return (
    <section id="galerie" className="mx-auto max-w-7xl px-3 py-12 sm:px-6 sm:py-16 lg:px-8 md:py-24">
      <motion.div
        className="mb-14 text-center md:mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl md:text-5xl">
          Galerie
        </h2>
        <div className="mx-auto mt-4 mb-6 h-[2px] w-12 bg-[#1687A7]" />
        <p className="mx-auto max-w-2xl text-center text-base font-light leading-relaxed text-gray-500 md:text-lg">
          Chaque photo capture une émotion et un instant unique.
        </p>
      </motion.div>

      <div className="gallery-masonry">
        {allImages.map((src, i) => (
          <GalleryImage key={i} src={src} index={i} onOpen={openLightbox} />
        ))}
      </div>

      <motion.div
        className="mt-14 flex justify-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <a
          href="https://drive.google.com/drive/u/0/folders/1s8xQVs_B70Jaro60UVLhCYb7lkRM5xaZ"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDriveClick}
          className="inline-flex items-center gap-3 rounded-full bg-[#1687A7] px-8 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#126e8a] hover:shadow-lg hover:shadow-[#1687A7]/20"
        >
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5559 24.8121H36.6666L25.5559 5.56299H14.4443L25.5559 24.8121Z" fill="rgba(255,255,255,0.85)" />
            <path d="M14.4449 5.56348L3.33325 24.8118L8.88992 34.4368L19.9999 15.1885L14.4449 5.56348Z" fill="white" />
            <path d="M14.4449 24.8115L8.88989 34.4365H31.1116L36.6666 24.8115H14.4449Z" fill="rgba(255,255,255,0.7)" />
          </svg>
          Voir plus de photos
        </a>
      </motion.div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}

      <AnimatePresence>
        {showUpdating && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowUpdating(false)}
          >
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] sm:p-10"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1687A7]/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1687A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                </svg>
              </div>

              <h3 className="mb-3 text-lg font-semibold text-slate-800 sm:text-xl">
                Galerie en mise à jour
              </h3>
              <p className="text-sm font-light leading-relaxed text-gray-500 sm:text-base">
                La galerie est en cours de mise à jour. Merci de revenir plus tard.
              </p>

              <button
                onClick={() => setShowUpdating(false)}
                className="mt-7 rounded-full bg-[#1687A7] px-8 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#126e8a] hover:shadow-lg hover:shadow-[#1687A7]/20 active:translate-y-0"
              >
                Compris
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
